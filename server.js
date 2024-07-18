import express from "express"
import * as db from "./database.js"
const app = express()

app.use(express.json())
//otherwise post requests are in json format are defined as "undefined"

app.get('/logins',async (req,res)=>{
    const logins = await db.getLogins()
    res.send(logins)
})

app.post('/logins',async(req,res)=>{
    const {username,password} = req.body
    const {insertId} = await db.addLogin(username,password)
    console.log(insertId)
    //wont work because it is thinking it is sending a status code --> res.send(insertId)
    res.send(`${insertId}`)
})

app.get('/messages/:user1/:user2',async (req,res)=>{
    const {user1,user2} = req.params
    const messages = await db.getMessages(user1,user2)
    res.send(messages)
    console.log(messages)
})

app.post('/messages',async(req,res)=>{
    const {message,username,recipient} = req.body
    const {insertId} = await db.addMessage(message,username,recipient)
    const entry = await db.getMessage(insertId)
    res.send(entry)
})

app.get('/posts',async(req,res)=>{
    const posts = await db.getPosts()
    res.send(posts)
})
app.get('/posts/:sorter/reverse=:rev',async(req,res)=>{
    const {sorter,rev} = req.params
    console.log(sorter,rev)
    const posts = await db.getPostsSorted(sorter,rev)
    res.send(posts)
})

app.post('/posts/:forum',async(req,res)=>{
    const {forum} = req.params
    const {post,username} = req.body
    const {insertId} = await db.addPost(post,username,forum)
    const entry = await db.getPost(insertId)
    res.send(entry)

})

app.get('/allusers', async(req,res)=>{
    const users = await db.getAllUsers()
    res.send(users)
})
app.get('/forums',async (req,res)=>{
    const response = await db.getAllForums()
    res.send(response)
})

app.post('/forums',async(req,res)=>{
    const {forum_catergory} = req.body
    const {insertId} = await db.addForum(forum_catergory)
    const result = await db.getForum(insertId)
    res.send(result)

})


const port = 8080
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

//error handling code
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Error cuh')
})