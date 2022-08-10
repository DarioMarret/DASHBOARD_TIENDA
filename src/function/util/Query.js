import axios from 'axios'
import { url } from './global';


export const ListarUsuariosAdmin = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/usuarios_admin/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        if (data.success) {
            return data.users;
        } else {
            return false;
        }
    } catch (error) {
        console.warn(error);
    }
}

export const ListarAccounts = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/accounts/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        if (data.success) {
            return data.data;
        } else {
            return false;
        }
    } catch (error) {
        console.warn(error);
    }
}

export const CreatedAccount = async (accounts) => {
    try {
        const { data } = await axios.post(`${url}/api/accounts`, { accounts },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const deleteAccount = async (accounts_id) => {
    try {
        let enable = 1;
        const { data } = await axios.delete(`${url}/api/accounts/${enable}/${accounts_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarRole = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/roles/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        if (data.success) {
            return data.data;
        } else {
            return false;
        }
    } catch (error) {
        console.warn(error);
    }
}

export const CrearUsuarioAdmin = async (datos) => {
    try {
        const { data } = await axios.post(`${url}/api/usuarios_admin`,
            datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic YWRtaW46YWRtaW4=`
            }
        });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const EliminarUsuarioAdmin = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/api/usuarios_admin/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const ResetPassword = async (id, password) => {
    try {
        const { data } = await axios.put(`${url}/api/usuarios_admin_account/reset_password/${id}`, { password },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const ResetAccount = async (id, accounts_id) => {
    try {
        const { data } = await axios.put(`${url}/api/usuarios_admin_account/reset_account/${id}`, { accounts_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarTiendas = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/tiendas/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarBanks = async () => {
    try {
        const { data } = await axios.get(`${url}/api/banks`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const createdStores = async (datos) => {
    try {
        const { data } = await axios.post(`${url}/api/tiendas`,
            datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic YWRtaW46YWRtaW4=`
            }
        });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarWayPay = async () => {
    try {
        const { data } = await axios.get(`${url}/api/way_to_pay`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const TiendaCedula = async (cedula) => {
    try {
        const { data } = await axios.post(`${url}/api/tienda_cedula`, { cedula },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data[0] : false
    } catch (error) {
        console.warn(error);
    }
}

export const recharge = async (datos) => {
    console.log(datos)
    try {
        const { data } = await axios.post(`${url}/api/recargar`,
            datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic YWRtaW46YWRtaW4=`
            }
        });
        return data.success ? true : false
    } catch (error) {
        console.warn(error);
    }
}

export const NumeroAleatorio = () => {
    const r = Math.random() * (10000000 - 99999999) + 99999999
    return Math.floor(r)
}

export const Loginn = async (datos) => {
    try {
        const { data } = await axios.post(`${url}/api/login_admin`,
            datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic YWRtaW46YWRtaW4=`
            }
        });
        return data.success ? data : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarTransaccionesTienda = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/transacciones/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const ListarHistorialTienda = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/historialcredito/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const SaldoActual = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/saldotiendas/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data[0].saldos : false
    } catch (error) {
        console.warn(error);
    }
}

export const TotalCard = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/totalcard/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}

export const UlmiasTransaciones = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/ultimastransaciones/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic YWRtaW46YWRtaW4=`
                }
            });
        return data.success ? data.data : false
    } catch (error) {
        console.warn(error);
    }
}