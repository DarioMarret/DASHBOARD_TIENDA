import moment from "moment";

export function Fecha(formato){
    let fecha = moment().format(formato)
    return fecha
}