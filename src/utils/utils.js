import { config } from '../config/config'

export function setDb(env) {
    if (env === 'test') {
        return config.test
    } else {
        return config.dev
    }
}

export function stringGen(len) {
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
