import {Base64} from 'js-base64';

export function EncryptCualquierDato(data){
    return Base64.encode(data)
}
export function DescryptCualquierDato(data){
    return Base64.decode(data)
}