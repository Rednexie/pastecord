

import Fastify from "fastify";
import formbody from "@fastify/formbody"
import view from "@fastify/view"
const channel_id  ="1229869812658733127"
const store_id = "1229869799404736582"
import ejs from "ejs"
import crypto from "crypto"
import fs from "fs"


function randomUUID(){
    return crypto.randomUUID().split("-").at(1);
}




const app = Fastify({
    trustProxy: true,
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
    exposeHeadRoutes: false,
    bodyLimit: 32676,
}); app.use = app.register;
import { Client, GatewayIntentBits, messageLink } from "discord.js"
import path from "path";
import { fstat } from "fs";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("ready", () => console.log(`Bot is successfully logged in`));
await client.login(process.env.DC);



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
    const stores = await client.channels.cache.get(store_id).messages.fetch({ limit: 100 })
    const message = await checkUntilStore(stores, uuid);
    const id = message.split("=").at(1);
    const documents = await client.channels.cache.get(channel_id).messages.fetch({ limit: 100 })
    const content = await checkUntilDocument(documents, id)
    return res.view('searched', { content })
})


app.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const stores = await client.channels.cache.get(store_id).messages.fetch({ limit: 100 })
    const message = await checkUntilStore(stores, uuid);
    const id = message.split("=").at(1);
    const documents = await client.channels.cache.get(channel_id).messages.fetch({ limit: 100 })
    const content = await checkUntilDocument(documents, id)
    return res.view('searched', { content })
})





app.post('/api/', (req, res) => {})
app.get('/search/:id', (req, res) => {})
app.post('/api/search', (req, res) => {})



app.listen({port: 3000, host: "0.0.0.0"}, async (err, addr) => {
    if(err){
        console.error(err);
        await app.close();
        process.exit(1);
    }
    else console.log(`Fastify Server is on port:`, Number(new URL(addr).port))
})

