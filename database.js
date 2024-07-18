import mysql from "mysql2"

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST||'127.0.0.1',
    user: process.env.MYSQL_USER||'root',
    password: process.env.MYSQL_PASSWORD||'akshay',
    database: process.env.MYSQL_DATABASE||'tech_trek'
}).promise()
//^allows us to use promise api version instead of having to use callback functions; can use async await instead of callback functions

export async function getLogins(){
    const [logins] = await pool.query(`select * from logins`)
    return logins
}

export async function addLogin(username,password){
    const [result] = await pool.query(`insert into logins (username,password) values (?,?)`,[username,password])
    console.log(result)
    return result
}

export async function getMessages(username1,username2){
    const [messages] = await pool.query(`select * from messages where username = ? and recipient = ? or username = ? and recipient = ?`,[username1,username2,username2,username1])
    return messages
}

export async function getMessage(id){
    const [message] = await pool.query(`select * from messages where id = ?`,[id])
    return message
}

export async function addMessage(message,username,recip){
    const [result] = await pool.query(`insert into messages (message,username,recipient) values (?,?,?)`,[message,username,recip])
    console.log(result)
    return result
}

export async function getPosts(){
    const [posts] = await pool.query(`select * from posts`)
    return posts
}
export async function getPost(id){
    const [post] = await pool.query(`select * from posts inner join forums on posts.forum_id = forums.id where posts.id = ?`,[id])
    return post[0]
}

export async function getPostsSorted(c_sorter,reverse){
    if (reverse=="true"){
        const [posts] = await pool.query(`select * from posts inner join forums on posts.forum_id = forums.id order by posts.${c_sorter} desc`)
        console.log(posts)
        return posts
    }
    const [posts] = await pool.query(`select * from posts inner join forums on posts.forum_id = forums.id order by ${c_sorter}`)
    return posts
    
}

export async function addPost(post,username,forum){
    const [[{id}]] = await pool.query(`select id from forums where forum_catergory = ?`,[forum])
    console.log("forum_id:",id)
    const [result] = await pool.query(`insert into posts (post,username,forum_id) values (?,?,?)`,[post,username,id])
    return result
}

export async function getAllUsers(){
    const [result] = await pool.query(`select username from logins`)
    return result
}

export async function getForum(id){
    const [[result]] = await pool.query(`select * from forums where id = ?`,[id])
    return result
}

export async function getAllForums(){
    const [result] = await pool.query(`select * from forums`)
    return result
}
export async function addForum(forum){
    const [result] = await pool.query(`insert into forums (forum_catergory) values (?)`,[forum])
    return result
}