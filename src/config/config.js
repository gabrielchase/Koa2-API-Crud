export const config = {
    dbUri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud?user=gchasepatron&password=postgrespassword',
    server: {
        port: 3000
    }
}