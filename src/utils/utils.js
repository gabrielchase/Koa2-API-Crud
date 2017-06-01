import { config } from '../config/config'

export function setDb(env) {
    if (env === 'test') {
        return config.test
    } else {
        return config.dev
    }
}