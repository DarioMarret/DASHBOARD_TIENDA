import { useState, useEffect } from "react";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Box, Button, Input, Modal } from "@mui/material";
import { ListarTiendas } from "function/util/Query";
import { dataCliente } from "function/localstore/storeUsuario";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { EditNotifications } from "@mui/icons-material";
import axios from "axios";
import Swal from 'sweetalert2'

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

function ListStore() {
    const [userTienda, setuserTienda] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState({
        id: '',
        nombre_tienda: '',
        responsable: '',
        comision: '',
        token_sistema: '',
        usuario: '',
        password: '',
        direccion: '',
        telefono: '',
        new_password: '',
    });

    const dataTableData = {
        columns: [
            { Header: "#", accessor: "key", width: "10%" },
            { Header: "Accounts", accessor: "accounts", width: "20%" },
            { Header: "Name Store", accessor: "nombre_tienda", width: "20%" },
            { Header: "Responsible", accessor: "responsable", width: "20%" },
            { Header: "Identify", accessor: "cedula", width: "20%" },
            { Header: "Commission", accessor: "comision", width: "20%" },
            { Header: "Name User", accessor: "usuario", width: "20%" },
            { Header: "Balance", accessor: "saldos", width: "20%" },
            { Header: "Token System", accessor: "token_sistema", width: "20%" },
            { Header: "Accion", accessor: "accion", width: "20%" },
        ],
        rows: userTienda
    }
    if (userTienda != null) {
        userTienda.map((item, index) => {
            item['key'] = index + 1;
            item.accion = <>
                <Button>
                    <DeleteSweepIcon fontSize="large" onClick={() => Eliminar(item.id, item.nombre_tienda)} />
                </Button>
                <Button>
                    <EditNotifications onClick={() => handleOpen(item)} />
                </Button>
            </>
        })
    }
    function handleOpen(item) {
        setEdit(item)
        setOpen(!open);
    }
    function handleChange(evenr) {
        setEdit({
            ...edit,
            [evenr.target.name]: evenr.target.value
        })
    }
    async function Actualizar() {
        delete edit.accion;
        const { data } = await axios.put(`https://rec.netbot.ec/v1/api/tiendas`, edit, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic YWRtaW46YWRtaW4=`
            }
        });
        if (data.success) {
            setuserTienda(await ListarTiendas(dataCliente().id));
            setOpen(!open);
            setEdit({
                id: '',
                nombre_tienda: '',
                responsable: '',
                comision: '',
                token_sistema: '',
                usuario: '',
                password: '',
                direccion: '',
                telefono: '',
                new_password: '',
            })
            Swal.fire({
                title: 'Tienda Actualizada',
                text: 'La tienda Fue actualizada correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Lo Sentimos, ha ocurrido un error',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }

    async function Eliminar(id, tienda) {
        Swal.fire({
            title: `Esta Seguro de Eliminar a la Tienda ${tienda}`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.delete(`https://rec.netbot.ec/v1/api/tiendas/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic YWRtaW46YWRtaW4=`
                    }
                });
                if (data.success) {
                    setuserTienda(await ListarTiendas(dataCliente().id));
                    Swal.fire({
                        title: 'Tienda Eliminada',
                        text: 'La tienda Fue Eliminada',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Lo Sentimos, ha ocurrido un error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Cancelando accion', '', 'info')
            }
        })
    }

    useEffect(() => {
        (async () => {
            setuserTienda(await ListarTiendas(dataCliente().id));
        })()
    }, []);

    return (
        <>
            <>
                <MDBox p={3} lineHeight={1}>
                    <MDTypography variant="h5" fontWeight="medium">
                        List Store
                    </MDTypography>
                </MDBox>
                <DataTable
                    table={dataTableData}
                    canSearch />
            </>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '30%' }}>
                    <label>
                        Tienda:
                        <Input name="nombre_tienda" label="Tienda" fullWidth={true} value={edit.nombre_tienda} onChange={handleChange} />
                    </label>
                    <label>
                        Responsable:
                        <Input name="responsable" label="Respónsable" fullWidth={true} value={edit.responsable} onChange={handleChange} />
                    </label>
                    <label>
                        Cedula:
                        <Input name="cedula" label="Cedula" fullWidth={true} value={edit.cedula} onChange={handleChange} />
                    </label>
                    <label>
                        Comision:
                        <Input name="comision" label="Comision" fullWidth={true} value={edit.comision} onChange={handleChange} />
                    </label>
                    <label>
                        Token System:
                        <Input name="token_sistema" label="Token Sistema" fullWidth={true} value={edit.token_sistema} onChange={handleChange} />
                    </label>
                    <label>
                        Usuario:
                        <Input name="usuario" label="Usuario" fullWidth={true} value={edit.usuario} onChange={handleChange} />
                    </label>
                    <label>
                        Contraseña:
                        <Input name="new_password" type="text" label="Contraseña" fullWidth={true} value={edit.new_password} onChange={handleChange} />
                    </label>
                    <label>
                        Direccion:
                        <Input name="direccion" label="Direccion" fullWidth={true} value={edit.direccion} onChange={handleChange} />
                    </label>
                    <label>
                        Telefono:
                        <Input name="telefono" label="telefono" fullWidth={true} value={edit.telefono} onChange={handleChange} />
                    </label>
                    <div style={{ textAlign: 'center' }}>
                        <br />
                        <Button variant="text" size="large" onClick={Actualizar}>Actualizar</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default ListStore;