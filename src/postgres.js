import PgAsync from 'pg-async'
export { SQL } from 'pg-async'

import once from 'once'

export async function createTables(pgInstance, schemas) {
    await pgInstance.transaction(async (instance) => {
        try {
            await instance.query(schemas.create[0])
        } catch (error) {
            console.log('Error creating tables: ', err)
        }
    })
}

export function postgresMiddleware(uri, schemas) {
    const pgInstance = new PgAsync(uri)
    const setup = once(createTables)

    return async (ctx, next) => {
        const pg = await createTables(pgInstance, schemas)
        ctx.postgres = pg
        return await next()
    }
}