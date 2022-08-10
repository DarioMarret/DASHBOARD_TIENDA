/* eslint-disable array-callback-return */


import { Box, Button, Card, CircularProgress, FormGroup, Grid, Input, Select } from '@mui/material';
import axios from 'axios';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState, useRef, } from 'react';
import { useReactToPrint } from 'react-to-print';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { dataCliente, dataClienteId } from '../../function/localstore/storeUsuario';
import { Fecha } from '../../function/util/usuario';
import { red, blue } from '@mui/material/colors';


function Pagar() {
    const [estadoBusqueda, setEstadoBusqueda] = useState(false);
    const [resultaBusqueda, setResultaBusqueda] = useState(null);

    const [estadoPagar, setEstadoPagar] = useState(false);
    const [bloqueoPagar, setBloqueoPagar] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);

    const [estadoTransaccion, setEstadoTransaccion] = useState(false);
    const [bloqueoTotal, setBloqueoTotal] = useState(false);
    const [saldoInsuficiente, setSaldoInsuficiente] = useState(false);
    const componentRef = useRef();

    const [dataPersona, setdataPersona] = useState(null);
    const [factura, setfactura] = useState(null);
    const [select, setselect] = useState(null);
    const [total, settotal] = useState(null);
    const [totalF, settotalF] = useState(0);
    const [idcliente, setidcliente] = useState(null);
    const [estadoPado, setestadoPado] = useState(null);
    // const [linkfactura, setlinkfactura] = useState(null);
    const [estacedula, setestacedula] = useState(null);
    // const [estadoSpinner, setestadoSpinner] = useState(false);
    const [transacion, settransacion] = useState(null);
    const [selectIdfactura, setselectIdfactura] = useState(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function reset() {
        setSaldoInsuficiente(false);
        setEstadoTransaccion(false);
        setEstadoBusqueda(false);
        setEstadoPagar(false);
        seterror(null);
    }

    const Search = async (e) => {
        const { value } = e.target;
        reset();
        if (value.length === 10 || value.length === 13) {
            setLoading(true)
            setestacedula(value)
            try {
                const { data } = await axios.post('https://rec.netbot.ec/v1/api/cliente', { cedula: value }, {
                    headers: {
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Content-Type': 'application/json'
                    }
                })//buscar cliente
                if (data.success) {
                    setEstadoBusqueda(true);
                    setResultaBusqueda(data.msg);
                    setLoading(false);
                } else {
                    setEstadoBusqueda(false);
                    setLoading(false);
                    setEstadoPagar(true);
                    setselect(data)
                    setidcliente(data[0].idcliente)
                    var Iterable = []
                    let total = 0
                    data.map(items => {
                        total += items.total
                        setResultaBusqueda(items.datosClient)
                        Iterable.push(items.info)
                        localStorage.setItem('dataClient:', JSON.stringify(Iterable))
                    })
                    settotal(`Total a pagar $` + total.toFixed(2))
                }
                //0928676485  1104892367  0923980742001  0911663110  
            } catch (error) {
                seterror("Lo sentimos, no se pudo conectar con el servidor")
                setLoading(false)
            }
        }
    }

    const onChangeTag = async (e) => {
        console.log(e);
        if (e !== "" && e !== "0") {
            let id = e.indexOf(',')
            let idfactura = e
            setfactura(idfactura)
            if (id !== -1) {
                setBloqueoTotal(true)
                const { data } = await axios.post('https://rec.netbot.ec/v1/api/factura', { idfactura }, {
                    headers: {
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Content-Type': 'application/json'
                    }
                })
                setdataPersona(data.description)
                settotalF(data.total)
                setBloqueoPagar(false)
                setselectIdfactura(data.idfactura)
            } else {
                const { data } = await axios.post('https://rec.netbot.ec/v1/api/factura', { idfactura }, {
                    headers: {
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Content-Type': 'application/json'
                    }
                })
                setdataPersona(data.description)
                settotalF(data.total)
                setBloqueoPagar(false)
                setselectIdfactura(data.idfactura)
                setBloqueoTotal(false)
            }
        } else {
            settotalF(0)
            setBloqueoPagar(true)
        }
    }

    const handleChange = async (e) => {
        settotalF(e.target.value)
        setBloqueoPagar(false)
    }

    // function handleClear() {
    //     setestadoPado(null)
    //     setlinkfactura(null)
    // }

    const hanblePagar = async () => {
        if (totalF.length > 0) {
            try {
                setLoading(true)
                let info = {
                    "pasarela": dataCliente().nombre_tienda,
                    "id_tienda": dataCliente().id,
                    "total": totalF,
                    "recaudacion": dataCliente().comision,
                    "accounts_id": dataCliente().accounts_id,
                    "idfactura": parseInt(factura),
                    "idcliente": idcliente,
                    "cedula": estacedula,
                    "token": dataCliente().token_sistema,
                    "cliente": resultaBusqueda,
                    "telefono": dataClienteId(selectIdfactura).telefono,
                    "movil": dataClienteId(selectIdfactura).movil,
                }
                const { data } = await axios.post('https://rec.netbot.ec/v1/api/pagar', info, {
                    headers: {
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Content-Type': 'application/json'
                    }
                })
                if (data.success) {
                    setLoading(false)
                    setSaldoInsuficiente(true)
                    setestadoPado(data.data.salida)
                    settransacion(data.transacion_id)
                    setEstadoTransaccion(true)
                    settotalF(null)
                } else {
                    setLoading(false)
                    setSaldoInsuficiente(true)
                    setestadoPado(data.msg)
                }
            } catch (error) {
                setLoading(false)
                seterror("Lo sentimos, no se pudo conectar con el servidor")
            }

        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <MDBox p={3} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                Buscar Cliente A Pagar
                                <p>Tienda  {dataCliente().nombre_tienda}</p>
                            </MDTypography>
                            <Box sx={{ width: '30%' }}>
                                <FormGroup sx={{ p: 2, minWidth: 120 }} >
                                    <Input label="Buscar Cliente" placeholder="Buscar Cliente" type='number' name="cedula" color="secondary" onChange={Search} />
                                </FormGroup>
                                {loading  ?
                                        <>
                                            <CircularProgress
                                                size={100}
                                                value={100}
                                                sx={{
                                                    color: blue[500],
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />

                                            <MDTypography variant="h5" fontWeight="medium" sx={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                paddingTop: '10%',
                                                color: blue[500],
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}>
                                                Cargando..
                                            </MDTypography>
                                        </>
                                        : null
                                    }
                            </Box>
                        </MDBox>
                        {estadoBusqueda
                            ? <MDBox p={3} lineHeight={1}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Resultado del Cliente: {' '} {resultaBusqueda}
                                </MDTypography>
                            </MDBox> : null
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        {estadoPagar ?
                            <MDBox p={3} lineHeight={1}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    <p>Cliente: {resultaBusqueda}</p>
                                </MDTypography>
                            </MDBox>
                            : null
                        }
                    </Grid>
                </Grid>
                {estadoPagar ?
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <MDBox p={3} lineHeight={1}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Detalles:
                                </MDTypography>
                                <Box sx={{ width: '100%' }}>
                                    <FormGroup sx={{ p: 2, minWidth: 120 }} >
                                        <Select
                                            native
                                            onChange={(e) => onChangeTag(e.target.value)}
                                        >
                                            <option value={0} >{total ? "Selecione Valores a pagar" : ''}</option>
                                            {
                                                select ?
                                                    select.map((items, index) => (
                                                        <option key={index} value={items.idfactura} >{items.detalle}</option>
                                                    )) : ''
                                            }
                                        </Select>
                                    </FormGroup>
                                </Box>
                                <Box sx={{ width: '100%' }}>
                                    <FormGroup sx={{ p: 2, minWidth: 120 }} >
                                        <Input native value={totalF} disabled={bloqueoTotal} label="Valor a pagar" type='number' placeholder="Ingrese cantidad a paga" name="cedula" color="secondary" onChange={(e) => handleChange(e)} />
                                    </FormGroup>
                                </Box>
                                <Box sx={{ width: '100%' }}>
                                    <FormGroup sx={{ p: 3, minWidth: 120 }} >
                                        <Button sx={{ p: 2 }} color="dark" disabled={bloqueoPagar} onClick={hanblePagar}><LocalAtmIcon fontSize="large" />Pagar</Button>
                                    </FormGroup>
                                    <MDTypography variant="body2" fontWeight="regular" color="error" mt={1}>
                                         {error}
                                    </MDTypography>


                                    {loading  ?
                                        <>
                                            <CircularProgress
                                                size={100}
                                                value={100}
                                                sx={{
                                                    color: blue[500],
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />

                                            <MDTypography variant="h5" fontWeight="medium" sx={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                paddingTop: '10%',
                                                color: blue[500],
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}>
                                                Cargando..
                                            </MDTypography>
                                        </>
                                        : null
                                    }
                                </Box>
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <MDBox p={3} lineHeight={1}>
                                <MDTypography variant="h5" fontWeight="medium" sx={{ textAlign: 'center' }}>
                                    Detalles <hr />
                                    {dataPersona}
                                </MDTypography>
                            </MDBox>
                        </Grid>
                    </Grid>
                    : null}
                {estadoTransaccion ?
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <MDBox p={3} fullWidth={true} >
                                <MDTypography variant="h6" fontWeight="medium" sx={{ textAlign: 'left' }} ref={componentRef}>
                                    <p style={{ fontSize: 19, lineHeight: 1.2 }}>COMNET (COMPUTECNICSNET S.A)</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>RUC 092782129001</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>COOP. PANCHO JACOME MZ.240 SL.20</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>FECHA: {Fecha("DD-MM-YYYY HH:mm:ss")}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>*****************************************</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>DESCRIPCION</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>*****************************************</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>DESCUENTO: $ 0.00</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>COMISION: {dataCliente().comision}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>TOTAL: {selectIdfactura !== null ? (parseFloat(dataClienteId(selectIdfactura).total) + parseFloat(dataCliente().comision)).toFixed(2) : "0.0"}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>SALDO: $0.00</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>*****************************************</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>CLIENTE</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>*****************************************</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>NOMBRE: {resultaBusqueda != null ? resultaBusqueda.substring(0, 25) : ''}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>DIRECCION: {selectIdfactura !== null ? dataClienteId(selectIdfactura).direccion.substring(0, 25) : ''}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>CEDULA: {selectIdfactura !== null ? dataClienteId(selectIdfactura).cedula : ''}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>FECHA CORTE: {selectIdfactura !== null ? dataClienteId(selectIdfactura).fecha_corte : ''}</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>*****************************************</p>
                                    <p style={{ fontSize: 16, lineHeight: 1.2 }}>NUMERO CONTROL: {transacion != null ? transacion : ''}</p>
                                </MDTypography>
                                <Button variant='' onClick={handlePrint} >IMPRIMIR</Button>
                                {/* <Button variant='' color='dark'>ENVIAR A WHATSAPP</Button> */}
                            </MDBox>
                        </Grid>
                    </Grid>
                    : null}
                {saldoInsuficiente
                    ? <MDBox p={3} lineHeight={1} fullWidth={true}>
                        <MDTypography variant="h5" fontWeight="medium">
                            {estadoPado}
                        </MDTypography>
                    </MDBox> : null
                }
            </Card>
        </DashboardLayout >
    );
}
export default Pagar;