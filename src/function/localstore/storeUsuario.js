import { dataClientes, usuario_local } from "../util/global";
import jwt_decode from "jwt-decode";

export function setDatosUsuario(data) {
    try {
        localStorage.setItem(usuario_local, data)
        return true;
    } catch (error) {
        console.log(error);
    }
}

export function getDatosUsuario() {
    try {
        const parse = localStorage.getItem(usuario_local)
        return parse;
    } catch (error) {
        console.log(error);
    }
}

export function removeDatosUsuario() {
    try {
        localStorage.removeItem(usuario_local)
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const dataCliente = () => {
    let user = getDatosUsuario();
    if (user) {
        return jwt_decode(user);
    } else {
        return null;
    }
}

export const dataClienteId = (idfactura) => {
    if (idfactura != null) {
        var items;
        const parse = JSON.parse(localStorage.getItem(dataClientes))
        parse.map(item => {
            if (item != null) {
                if (item.idfactura == idfactura) {
                    items = item;
                }
            }
        })
        return items
    }
}