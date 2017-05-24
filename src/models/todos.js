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
    getAll: async() => {
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
    }
}

export default todoCrudOps