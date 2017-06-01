export const config = {
    dev: {
        dbUri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud?user=postgres&password=postgres',
    },
    test: {
        dbUri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud_test?user=postgres&password=postgres',
    }
}