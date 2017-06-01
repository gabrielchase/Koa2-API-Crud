'use strict'

import PgAsync, { SQL } from 'pg-async'
import { setDb } from '../utils/utils'

const { dbUri } = setDb(process.env.NODE_ENV)
const pgAsync = new PgAsync(dbUri)

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
    readOne: async(id) => {
        return  pgAsync.query(`SELECT * FROM ${todosConfig.tableName} WHERE id = $1`, id)
    },
    create: async({ title, completed }) => {
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
        
        if (title != undefined) query += `title = '${title}' `
        if (title != undefined && completed != undefined) query += ', '
        if (completed != undefined) query += `completed = ${completed} `
        if (id > 0) query += `WHERE id = ${id}`
        
        return pgAsync.query(query)
    },
    delete: async(id) => {
        pgAsync.query(`DELETE FROM ${todosConfig.tableName} WHERE id = $1`, id)
    }
}

export default todoCrudOps