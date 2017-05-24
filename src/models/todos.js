import PgAsync, { SQL } from 'pg-async'
import { config } from  '../config/config'

const pgAsync = new PgAsync(config.dbUri);

const todosConfig = {
    tableName: 'todos'
}

export const schema = {
    create: [
        `CREATE TABLE IF NOT EXISTS TODOS (
            ID          SERIAL PRIMARY KEY,
            TITLE       VARCHAR(60),
            COMPLETED   BOOLEAN
        );`
    ]
}

const todoCrudOps = {
    read: async() => {
        return  pgAsync.query(`SELECT * FROM ${todosConfig.tableName}`)
    },
    create: async({ title, completed}) => {
        let todo = {
            title,
            completed
        }

        return await pgAsync.query(`
            INSERT INTO ${todosConfig.tableName} 
            (title, completed) VALUES ($1, $2)`, title, completed)
    },
    update: async(id, { title, completed }) => {
        let query = `UPDATE ${todosConfig.tableName} SET `
        
        if (title != undefined) query += `title = ${title} `
        if (title != undefined && query != undefined) query += ', '
        if (completed != undefined) query += `completed = ${completed} `
        if (id > 0) query += `WHERE id = ${id}`
        
        return pgAsync.query(query)
    }
}

export default todoCrudOps