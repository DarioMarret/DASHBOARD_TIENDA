import { useState, useEffect } from "react";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Button } from "@mui/material";
import { ListarTiendas } from "function/util/Query";
import { dataCliente } from "function/localstore/storeUsuario";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


function ListStore() {
    const [userTienda, setuserTienda] = useState([]);
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
                    delete {/* <DeleteSweepIcon fontSize="large" onClick={() => deleteUserAdmin(item.id)} /> */}
                </Button>
                <Button>
                    edit
                    {/* <ModeEditIcon onClick={() => handleOpen2(item.id, item)} /> */}
                </Button>
            </>
        })
    }

    useEffect(() => {
        (async () => {
            setuserTienda(await ListarTiendas(dataCliente().id));
        })()
    }, []);

    return (
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
    );
}

export default ListStore;