import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { dataCliente } from "function/localstore/storeUsuario";
import { ListarHistorialTienda } from "function/util/Query";

// Data

function Creditod() {
  const [userTienda, setuserTienda] = useState([]);
  const dataTableData = {//963722798
    columns: [
      { Header: "#", accessor: "key", width: "1%" },
      { Header: "Accounts", accessor: "accounts", width: "10%" },
      { Header: "Nombre Tienda", accessor: "nombre_tienda", width: "10%" },
      { Header: "Forma de pago", accessor: "forma_pago", width: "10%" },
      { Header: "Banco", accessor: "banco", width: "10%" },
      { Header: "Credito", accessor: "creditos", width: "10%" },
      { Header: "Transaccion", accessor: "transacion", width0: "10%" },
      { Header: "Fecha Creditacion", accessor: "fecha_registro", width: "20%" },
    ],
    rows: userTienda
  }
  
  if (userTienda != null) {
    userTienda.map((item, index) => {
      item['key'] = index + 1;
    })
  }
  useEffect(() => {
    (async () => {
      setuserTienda(await ListarHistorialTienda(dataCliente().id));
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
                  Historial de creditos
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

export default Creditod;
