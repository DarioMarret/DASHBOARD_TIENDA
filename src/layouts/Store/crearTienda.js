import { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ListarAccounts, createdStores } from "../../function/util/Query";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import { dataCliente } from "function/localstore/storeUsuario";
import MDBox from "components/MDBox";


function CreateTienda() {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [account, setAccount] = useState([]);
    const [tied, setTied] = useState({
        account_id: 0,
        nombre_tienda: '',
        responsable: '',
        cedula: '',
        comision: '',
        token_sistema: '',
        password: '',
        direccion: '',
        usuario: '',
        telefono: '',
    });
    const [Colert, setColert] = useState(false);
    const [alert, setAlert] = useState(false);
    const [Error, setError] = useState(null);

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
            setAccount(await ListarAccounts(dataCliente().id));
        })()
    }, []);

    const handleChange = (event) => {
        setTied({
            ...tied,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const rest = await createdStores(tied);
        if (rest) {
            setColert('success');
            setError('successfully created store');
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
        } else {
            setColert('error');
            setError('error creating store');
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
        }
    }
    return (
        <>
            {
                alert ?
                    <MDAlert color={Colert} >
                        <MDTypography variant="h6">{Error}</MDTypography>
                    </MDAlert>
                    : null
            }
            <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                    Create Store
                </MDTypography>
                <MDTypography variant="button" color="text">
                    Create new Store and assign it to a account.
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
                    <RedBar />
                    <FormControl sx={{ minWidth: 120 }} fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="account_id"
                            // value={rol}
                            label="Account"
                            style={{ height: 50, width: '100%' }}
                            onChange={handleChange}
                        >
                            {
                                account != null ? account.map((item, index) => <MenuItem key={index} value={item.id}>{item.accounts}</MenuItem>) : null
                            }
                        </Select>
                    </FormControl>
                    <RedBar />
                    <TextField fullWidth label="Name Store" id="name_store" name="nombre_tienda" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Responsible/Holder" id="responsible" name="responsable" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Identifier" id="identifier" name="cedula" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Commission" id="commission" name="comision" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Username" id="username" name="usuario" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Password" id="password" name="password" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Address" id="address" name="direccion" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Phone" id="phone" name="telefono" onChange={handleChange} />
                    <RedBar />
                    <TextField fullWidth label="Token System" id="token_system" name="token_sistema" onChange={handleChange} />
                    <RedBar />
                    <div style={{ textAlign: "center" }}>
                        <Button variant="text" color="primary" size="large" fullWidth={true} onClick={(e) => handleSubmit(e)} >Save</Button>
                    </div>
                </div>
            </div>
            <RedBar />
            <RedBar />
        </>
    );
}
function RedBar() {
    return (
        <Box
            sx={{
                height: 20,
                //   backgroundColor: (theme) =>
                //     theme.palette.mode === 'light'
                //       ? 'rgba(255, 0, 0, 0.1)'
                //       : 'rgb(255 132 132 / 25%)',
            }}
        />
    );
}

export default CreateTienda;