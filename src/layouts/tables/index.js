import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { dataCliente } from "function/localstore/storeUsuario";
import { ListarTransaccionesTienda } from "function/util/Query";

// Data

function Tables() {
  const [userTienda, setuserTienda] = useState([]);
  const dataTableData = {//963722798
    columns: [
      { Header: "#", accessor: "key", width: "10%" },
      { Header: "Transaccion", accessor: "transacion_id", width: "10%" },
      { Header: "Cantidad", accessor: "cantidad", width: "5%" },
      { Header: "Recaudacion", accessor: "recaudacion", width: "5%" },
      { Header: "Cedula Cliente", accessor: "cedula", width: "10%" },
      { Header: "cliente y estado", accessor: "cliente", width: "25%" },
      { Header: "Fecha de pago", accessor: "fecha_registro", width: "20%" },
      { Header: "Accion", accessor: "accion", width: "20%" },
    ],
    rows: userTienda
  }
  
  if (userTienda != null) {
    userTienda.map((item, index) => {
      console.log(item)
        item['key'] = index + 1;
        item.accion = <>
            <Button>
               send <WhatsAppIcon fontSize="large" onClick={() => console.log(item.id)} />
            </Button>
        </>
    })
}
  useEffect(() => {
    (async () => {
        setuserTienda(await ListarTransaccionesTienda(dataCliente().id));
    })()
}, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  Transacciones realizadas
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={dataTableData}
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
