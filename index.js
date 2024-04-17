
import { config } from "dotenv";
import Fastify from "fastify";
import formbody from "@fastify/formbody"
import view from "@fastify/view"
import ejs from "ejs"
import crypto from "crypto"
import { Client, GatewayIntentBits, messageLink } from "discord.js"
import { createRequire } from 'module';


const require = createRequire(import.meta.url);
const cfg = require('./config.json');
config();

function randomUUID(){
    return crypto.randomUUID().split("-").at(1);
}

const channel_id = process.env.DOC || cfg.doc;
const store_id = process.env.KV || cfg.kv;
const token = process.env.TOKEN || cfg.token;
const port = process.env.PORT || cfg.port;

if(typeof channel_id !== "string"){
    console.log('"doc" field in .env or config.json should have a string value.')
    process.exit(1)
}

if(typeof store_id !== "string"){
    console.log('"kv" field in .env or config.json should have a string value.')
    process.exit(1)
}

if(typeof token !== "string"){
    console.log('token field in .env or config.json should be a valid discord token.')
    process.exit(1)
}
if(typeof port !== "number" && typeof port !== "string"){
    console.log('port field in .env or config.json should be a valid number, for example 3000.')
    process.exit(1)
}




const app = Fastify({
    trustProxy: true,
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
    exposeHeadRoutes: false,
    bodyLimit: 32676,
}); app.use = app.register;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("ready", () => console.log(`Bot is successfully logged in`));
try{
    await client.login(token);
}catch(err){
    console.log('https://discord.com/developers/applications');
    console.log('try pasting your discord bot token into .env or config.json, or set the true intents\n');
    console.log(err)
    process.exit(1)
}



async function checkUntilDocument(stores, id){
    const message = stores.find(msg => msg.id == id)
    if(message && message.content){
        return message.content;
    }
    else{
        const msgs = await client.channels.cache.get(channel_id).messages.fetch({ limit: 100, before: stores.last().id })
        return await checkUntilDocument(msgs, id)
    }
}


async function checkUntilStore(stores, key){
    const message = stores.find(msg => msg.content.startsWith(key))
    if(message && message.content){
        return message.content
    }
    else{
        const msgs = await client.channels.cache.get(store_id).messages.fetch({ limit: 100, before: stores.last().id  })
        return await checkUntilStore(msgs, key)
    }
}



app.use(formbody)
app.register(view, {
    engine: {
        ejs
    },
    root: "./views",
    defaultContext: {},
})


app.get('/', (req, res) => {
    return res.view('index')
})


app.get('/search', async (req, res) => {
    return res.view('search')
})


app.post('/', async (req, res) => {
    const { text } = req.body;
    const { id } = await client.channels.cache.get(channel_id).send(text);
    const uuid = randomUUID();
    await client.channels.cache.get(store_id).send(`${uuid}=${id}`);
    return res.view('created', { id: uuid })
})



app.post('/search', async (req, res) => {
    const { id: uuid } = req.body;
    const stores = await client.channels.cache.get(store_id).messages.fetch({ limit: 100 });
    const message = await checkUntilStore(stores, uuid);
    const id = message.split("=").at(1);
    const documents = await client.channels.cache.get(channel_id).messages.fetch({ limit: 100 });
    const content = await checkUntilDocument(documents, id);
    return res.view('searched', { content });
})


app.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const stores = await client.channels.cache.get(store_id).messages.fetch({ limit: 100 });
    const message = await checkUntilStore(stores, uuid);
    const id = message.split("=").at(1);
    const documents = await client.channels.cache.get(channel_id).messages.fetch({ limit: 100 });
    const content = await checkUntilDocument(documents, id);
    return res.view('searched', { content });
})





app.post('/api/', (req, res) => {})
app.get('/search/:id', (req, res) => {})
app.post('/api/search', (req, res) => {})



app.listen({port, host: "0.0.0.0"}, async (err, addr) => {
    if(err){
        console.error(err);
        await app.close();
        process.exit(1);
    }
    else console.log(`Fastify Server is on port:`, Number(new URL(addr).port), "\nhttps://github.com/Rednexie/pastecord")
})

