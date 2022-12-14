/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { Button, Input,  Modal } from "@mui/material";
import { Box } from "@mui/system";
import { CreatedAccount, deleteAccount, ListarAccounts, UpdateAccount } from '../../function/util/Query';
import { dataCliente } from '../../function/localstore/storeUsuario';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import EditIcon from '@mui/icons-material/Edit';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid white',
    borderRadius: '5px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

function Accounts() {
    const [open, setOpen] = useState(false);
    const [open_2, setOpen_2] = useState(false);
    const [open_3, setOpen_3] = useState(false);
    const [By, setBy] = useState(Number);
    const [account, setAccount] = useState([]);
    const [accounts, setAccounst] = useState({
        id: '',
        accounts: '',
        host: '',
        token: '',
        host_whatsapp: '',
    });

    const dataTableData = {
        columns: [
            { Header: "#", accessor: "key", width: "5%" },
            { Header: "accounts", accessor: "accounts", width: "20%" },
            { Header: "Dominio", accessor: "host", width: "20%" },
            { Header: "Token", accessor: "token", width: "20%" },
            { Header: "Host_Whatsapp", accessor: "host_whatsapp", width: "20%" },
            { Header: "date created", accessor: "fecha", width: "20%" },
            { Header: "accion", accessor: "accion", width: "5%" },
        ],
        rows: account
    }
    if (account != null) {
        account.map((item, index) => {
            item['key'] = index + 1;
            item.accion = <>
                <Button>
                    <DeleteSweepIcon fontSize="large" onClick={() => handleOpen2(item.id)} />
                </Button>
                <Button>
                    <EditIcon fontSize="large" onClick={() => handleOpen3(item.id, item)} />
                </Button>
            </>
        })
    }

    function limpiar(){
        setAccounst({
            id: '',
            accounts: '',
            host: '',
            token: '',
            host_whatsapp: '',
        });
    }
    function handleOpen() {
        limpiar()
        setOpen(!open);
    }

    function handleOpen2(id) {
        setOpen_2(!open_2);
        setBy(id)
    }
    function handleOpen3(id, item) {
        limpiar()
        setOpen(!open);
        setAccounst(item)
    }

    async function deleteUserAdmin() {
        const response = await deleteAccount(By);
        response != false ? setAccount(await ListarAccounts(dataCliente().id)) : alert('Error al eliminar');
        setOpen_2(!open_2);
    }
    
    async function handleChange(event) {
        setAccounst({ ...accounts, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {
        if(accounts.id == ''){
            if (accounts.accounts !== '' && accounts.host !== '' && accounts.token !== '') {
                const data = await CreatedAccount(accounts);
                data !== false ? setAccount(await ListarAccounts(dataCliente().id)) : alert("Error al crear usuario");
                handleOpen()
            }
        }
        if(accounts.id !== ''){
            const data = await UpdateAccount(accounts);
            data !== false ? setAccount(await ListarAccounts(dataCliente().id)) : alert("Error al crear usuario");
            handleOpen()
        }
    }

    useEffect(() => {
        (async () => {
            setAccount(await ListarAccounts(dataCliente().id));
        })()
    }, [])

    return (
        <>
            <>
                <MDBox p={3} lineHeight={1}>
                    <MDTypography variant="h5" fontWeight="medium">
                        Accounts
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                        Create new account and assign it to a user.
                    </MDTypography>
                    <Button onClick={handleOpen}>new account</Button>
                </MDBox>
                <DataTable
                    table={dataTableData}
                    canSearch />
            </>
            {/* MODAL NEW USERS */}
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '30%' }}>
                    <h2 id="parent-modal-title">Created new account</h2>
                    <label>
                        Accounts:
                        <Input name="accounts" value={accounts.accounts}  type="text" placeholder='name business' fullWidth={true} onChange={(e) => handleChange(e)} />
                    </label>
                    <label>
                        Host:
                        <Input name="host" value={accounts.host} type="text" placeholder='https://portal.connect' fullWidth={true} onChange={(e) => handleChange(e)} />
                    </label>
                    <label>
                        Token:
                        <Input name="token" value={accounts.token} type="text" placeholder='xxxxxxxxxxxxxxxx' fullWidth={true} onChange={(e) => handleChange(e)} />
                    </label>
                    <label>
                        Sokect Whatsapp:
                        <Input name="host_whatsapp" value={accounts.host_whatsapp} type="text" placeholder='http://45.224.96.56:xxxx' fullWidth={true} onChange={(e) => handleChange(e)} />
                    </label>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleSubmit} >Save</Button>
                        <Button onClick={handleOpen}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
            {/* MODAL PARA ELIMINAR */}
            <Modal
                open={open_2}
                onClose={handleOpen2}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '30%' }}>
                    <div style={{ alignItems: 'center' }}>
                        <h2 id="parent-modal-title">Delete account</h2>
                        <br />
                        <p>
                            Are you sure you want to delete this account?
                            This action will remove everything associated with the account.
                            as administrators and shopkeepers
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <br />
                        <Button variant="text" size="large" onClick={() => deleteUserAdmin()}>delete</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default Accounts;