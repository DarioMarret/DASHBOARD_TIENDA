import { useState } from "react";
import { useEffect } from "react";
import { CrearUsuarioAdmin, EliminarUsuarioAdmin, ListarAccounts, ListarRole, ListarUsuariosAdmin, ResetAccount, ResetPassword } from "../../function/util/Query";

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, FormControl, Input, MenuItem, Modal, Select } from "@mui/material";
import { Box } from "@mui/system";
import { dataCliente } from "../../function/localstore/storeUsuario";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

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

function User() {
    const [open, setOpen] = useState(false);
    const [open_2, setOpen_2] = useState(false);
    const [edit, setEdit] = useState(null);
    const [account, setAccount] = useState([]);
    const [roles, setRole] = useState([]);
    const [userAdmin, setuserAdmin] = useState([]);
    const [accounts_id, setAccountBy] = useState(Number);
    const [rol, setRol] = useState(String);
    const [usr, setUsr] = useState({
        username: '',
        password: '',
    });

    const dataTableData = {
        columns: [
            { Header: "#", accessor: "key", width: "10%" },
            { Header: "name", accessor: "username", width: "20%" },
            { Header: "perfil", accessor: "role", width: "20%" },
            { Header: "accounts", accessor: "accounts", width: "20%" },
            { Header: "fecha ingreso", accessor: "fecha_registros", width: "20%" },
            { Header: "accion", accessor: "accion", width: "20%" },
        ],
        rows: userAdmin
    }

    if (userAdmin != null) {
        userAdmin.map((item, index) => {
            item['key'] = index + 1;
            item.accion = <>
                <Button>
                    <DeleteSweepIcon fontSize="large" onClick={() => deleteUserAdmin(item.id)} />
                </Button>
                <Button>
                    <ModeEditIcon onClick={() => handleOpen2(item.id, item)} />
                </Button>
            </>
        })
    }

    useEffect(() => {
        (async () => {
            setuserAdmin(await ListarUsuariosAdmin(dataCliente().id));
            setAccount(await ListarAccounts(dataCliente().id));
            setRole(await ListarRole(dataCliente().id));
        })()
    }, []);

    function handleOpen() {
        setOpen(!open);
    }

    function handleOpen2(id, item) {
        setOpen_2(!open_2);
        setEdit(item)
        console.log(item)
    }

    function handleChange(event) {
        setAccountBy(event.target.value);
    }

    function handleRolChange(event) {
        setRol(event.target.value);
    }

    function handleTextChange(event) {
        setUsr({
            ...usr,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log({ ...usr, accounts_id, role: rol });
        const data = await CrearUsuarioAdmin({ ...usr, accounts_id, role: rol });
        data != false ? setuserAdmin(await ListarUsuariosAdmin(dataCliente().id)) : alert("Error al crear usuario");
    }

    async function deleteUserAdmin(id) {
        const datos = await EliminarUsuarioAdmin(id)
        if (datos) {
            setuserAdmin(await ListarUsuariosAdmin(dataCliente().id))
        }
    }

    async function resetPassword() {
        if(edit != null && usr.password != ''){
            const datos = await ResetPassword(edit.id, usr.password)
            if (datos) {
                setuserAdmin(await ListarUsuariosAdmin(dataCliente().id))
            }
        }
    }
    async function resetAccount() {
        if(edit != null && accounts_id != 0){
            const datos = await ResetAccount(edit.id, accounts_id)
            if (datos) {
                setuserAdmin(await ListarUsuariosAdmin(dataCliente().id))
            }
        }
    }

    return (
        <>
                <MDBox p={3} lineHeight={1}>
                    <MDTypography variant="h5" fontWeight="medium">
                        Users administrator
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                        User assigned to accounts as administrator.
                    </MDTypography>
                    <Button onClick={handleOpen}>new users</Button>
                </MDBox>
                <DataTable
                    table={dataTableData}
                    canSearch />
            {/* MODAL NEW USERS */}
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '30%' }}>
                    <h2 id="parent-modal-title">Created new users</h2>
                    <label>
                        Username:
                        <Input name="username" type="text" fullWidth={true} onChange={handleTextChange} />
                    </label>
                    <label>
                        Password:
                        <Input name="password" type="password" fullWidth={true} onChange={handleTextChange} />
                    </label>
                    <label>
                        Role:
                        <FormControl sx={{ p: 3, minWidth: 120 }} fullWidth={true}>
                            <Select
                                id="demo-simple-select"
                                value={rol}
                                style={{ ...style, height: 50, width: '100%' }}
                                onChange={handleRolChange}
                            >
                                {
                                    roles != null ? roles.map((item, index) => <MenuItem key={index} value={item.role}>{item.role}</MenuItem>) : null
                                }
                            </Select>
                        </FormControl>
                    </label>
                    <div>
                        <label>
                            Accounts:
                            <FormControl sx={{ p: 3, minWidth: 120 }} fullWidth={true}>
                                <Select
                                    id="demo-simple-select"
                                    value={accounts_id}
                                    style={{ ...style, height: 50, width: '100%' }}
                                    onChange={handleChange}
                                >
                                    {
                                        account != null ? account.map((item, index) => <MenuItem key={index} value={item.id}>{item.accounts}</MenuItem>) : null
                                    }
                                </Select>
                            </FormControl>
                        </label>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleSubmit} >Save</Button>
                        <Button>Cancel</Button>
                    </div>
                </Box>
            </Modal>
            {/* MODAL PARA EDITAR */}
            <Modal
                open={open_2}
                onClose={handleOpen2}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '30%' }}>
                    <h2 id="parent-modal-title">{edit != null ? edit.username : ''}</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>
                            Reset password:
                            <Input name="password" type="password" fullWidth={true} onChange={handleTextChange} />
                        </label>
                        <Button variant="text" size="large" onClick={()=>resetPassword()} >Reset</Button>
                    </div>
                    <div style={{ display: 'flex', alignSelf: 'center' }}>
                        <label>
                            Change accounts:
                            <FormControl sx={{ p: 3, minWidth: 120 }} fullWidth={true}>
                                <Select
                                    id="demo-simple-select"
                                    value={accounts_id}
                                    style={{ ...style, height: 50, width: '100%' }}
                                    onChange={handleChange}
                                >
                                    {account != null ? account.map((item, index) => <MenuItem key={index} value={item.id}>{item.accounts}</MenuItem>) : null}
                                </Select>
                            </FormControl>
                        </label>
                        <div>
                            <br />
                            <Button variant="text" size="large" onClick={()=>resetAccount()}>Reset</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </ >
    );
}

export default User;