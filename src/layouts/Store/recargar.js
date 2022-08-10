/* eslint-disable no-unused-vars */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import { ListarBanks, ListarWayPay, TiendaCedula, recharge, NumeroAleatorio } from "../../function/util/Query";

function RechargeStores() {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [tienda, setTienda] = useState(null);
    const [forma, setForma] = useState([]);
    const [banco, setBancos] = useState([]);
    const [saldo, setSaldo] = useState(Number);
    const [formaPago, setFormaPago] = useState(String);
    const [Banco, setBanco] = useState(String);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        (async () => {
            setBancos(await ListarBanks())
            setForma(await ListarWayPay())
        })()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await recharge({ ...tienda, transacion: NumeroAleatorio(), saldo, forma_pago: formaPago, banco: Banco });
        if (response) {
            alert("Transaccion exitosa");
            limpiar()
        } else {
            alert("Transaccion fallida");
        }
    }

    const handleChangeCedula = async (event) => {
        if (event.target.value.length >= 10) {
            const resultado = await TiendaCedula(event.target.value);
            setTienda(resultado);
        }
    }

    function limpiar() {
        setTienda(null);
        setSaldo(0);
        setFormaPago('');
        setBanco('');
    }

    return (
        <>
            <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                    Recharge Stores
                </MDTypography>
            </MDBox>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <div style={{
                    width: width > 740 ? "30%" : "100%",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "10px",
                }}>
                    <h2>Tienda: <span style={{ fontSize: '20px' }}> {tienda != null ? tienda.nombre_tienda : ''}</span></h2>
                    <RedBar />
                    <TextField fullWidth label="Identifier/ruc" id="cedula" name="cedula" onChange={handleChangeCedula} />
                    <RedBar />
                    <TextField fullWidth label="Current balance" id="saldo_actual" name="saldo_actual" value={tienda != null ? tienda.saldos : 0.0} disabled={true} />
                    <RedBar />
                    <TextField fullWidth label="Balance" id="saldo" name="saldo" value={saldo} onChange={(e) => setSaldo(e.target.value)} />
                    <RedBar />
                    <FormControl sx={{ minWidth: 120 }} fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="account_id"
                            label="Banco"
                            value={Banco}
                            style={{ height: 50, width: '100%' }}
                            onChange={(e) => setBanco(e.target.value)}
                        >
                            {
                                banco != null ? banco.map((item, index) => <MenuItem key={index} value={item.banco}>{item.banco}</MenuItem>) : null
                            }
                        </Select>
                    </FormControl>
                    <RedBar />
                    <FormControl sx={{ minWidth: 120 }} fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Way to pay</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="account_id"
                            label="Forma de Pago"
                            value={formaPago}
                            style={{ height: 50, width: '100%' }}
                            onChange={(e) => setFormaPago(e.target.value)}
                        >
                            {
                                forma != null ? forma.map((item, index) => <MenuItem key={index} value={item.forma_pago}>{item.forma_pago}</MenuItem>) : null
                            }
                        </Select>
                    </FormControl>
                    <RedBar />
                    <div style={{ textAlign: "center" }}>
                        <Button variant="text" color="primary" size="large" fullWidth={true} onClick={(e) => handleSubmit(e)} >Save</Button>
                    </div>
                </div>
            </div>
            <RedBar />
            <RedBar />
        </ >
    );
}

function RedBar() {
    return (
        <Box
            sx={{
                height: 20,
            }}
        />
    );
}

export default RechargeStores;