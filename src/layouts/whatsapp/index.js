/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input } from "@mui/material";
import io from "socket.io-client";
import QRCode from 'qrcode.react';
import { host_io } from "function/util/global";
import { dataCliente } from "function/localstore/storeUsuario";
import axios from "axios";

var socket;
if (dataCliente() != null) {
    // socket = io(`${dataCliente().host_whatsapp}`, {
    //     transports: ["websocket", "polling"] // use WebSocket first, if available
    //   })
    socket = io(`${dataCliente().host_whatsapp}`, {
        path: "/whatsapp_a1/",
        transports: ["polling"] // use WebSocket first, if available
    });
    // socket = io.connect(`${dataCliente().host_whatsapp}`);
}

function Whatsapp() {
    const [width, setWidth] = useState();
    const [qr, setqr] = useState(null);
    const [ready, setready] = useState(null);
    const [failure, setfailure] = useState(null);
    const [Numero, setNumero] = useState(dataCliente().username);
    const [conection, setconection] = useState(false);

    useEffect(() => {
        socket.on("conexion:", (data) => {
            localStorage.setItem('user_navegador:', data)
        });

        socket.on('qr:', (data) => {
            setqr(data)
        })
        socket.on('ready:', (data) => {
            setready(data)
            setqr(null)
        })
        socket.on('auth_failure:', (data) => {
            setfailure(data)
            setqr(null)
        })
        socket.on('authenticated:', (data) => {
            setready(data)
            setqr(null)
        })
    }, [socket]);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
    }, []);

    function Limpiar() {
        setready(null);
        setfailure(null);
    }

    function RecargarQr() {
        Limpiar()
        socket.emit('registartSession:', { Numero, user_navegador: localStorage.getItem('user_navegador:') })
    }

    async function ExisteSesion() {
        try {
            const { data } = await axios.get(`${dataCliente().host_whatsapp}/api/connect_estado`);
            setconection(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        ExisteSesion()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ textAlign: 'center', justifyContent: 'center' }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
                    <Grid item xs={12} sm={6} md={6} sx={{ textAlign: 'center', justifyContent: 'center' }}>
                        <MDBox p={3} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                Configura Cuenta de Whatsapp
                            </MDTypography>
                        </MDBox>
                        <MDBox sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                            <Button size="large" onClick={RecargarQr}>
                                Solicitar Qr
                            </Button>
                        </MDBox>
                        <div style={{ padding: '10%' }} />
                        <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                            {
                                failure === true ?
                                    null
                                    : <MDTypography variant="h5" fontWeight="medium" color="error">
                                        {failure}
                                    </MDTypography>
                            }
                        </MDBox>
                        <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                            {
                                ready === true ?
                                    null
                                    : <MDTypography variant="h5" fontWeight="medium" color="success">
                                        {ready}
                                    </MDTypography>
                            }
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ textAlign: 'center' }}>
                        <MDBox p={3} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                QR
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={3}>
                            {
                                qr == null ?
                                    <>
                                        <QRCode value={qr ? qr : "https://reactjs.org/"} size={width > 400 ? 400 : (parseInt(width) - 100)} />
                                        <MDTypography variant="h5" fontWeight="medium">
                                            QR No Valido
                                        </MDTypography>
                                    </>

                                    :
                                    <QRCode value={qr} size={width > 400 ? 400 : (parseInt(width) - 100)} />
                            }
                        </MDBox>
                        <div style={{ padding: '20px' }} />
                    </Grid>
                </Grid>
                <MDTypography variant="h6" fontWeight="medium">
                    Estado: {conection ? "Autenticado" : "No Autenticado"}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                    Escane el QR con tu Whatsapp cuando ya lo ayas escanedo espera la respuesta en pantalla para continuar
                </MDTypography>
            </Card>
        </DashboardLayout>
    );
}

export default Whatsapp;
