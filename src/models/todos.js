export const schema = {
    create: [
        `CREATE TABLE IF NOT EXISTS TODOS (
            ID          SERIAL PRIMARY KEY,
            TITLE       VARCHAR(60),
            COMPLETED   BOOLEAN
        );`
    ]
}