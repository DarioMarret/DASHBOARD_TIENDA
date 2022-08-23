/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
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
import { Button } from "@mui/material";
import { ListarPre } from "function/util/Query";

// Data

function Pre() {
  const [userTienda, setuserTienda] = useState([]);
  const dataTableData = {//963722798
    columns: [
      { Header: "#", accessor: "key", width: "1%" },
      { Header: "Accounts", accessor: "accounts", width: "10%" },
      { Header: "Tienda", accessor: "nombre_tienda", width: "10%" },
      { Header: "Cliente", accessor: "cliente", width: "10%" },
      { Header: "Direccion", accessor: "direccion", width: "10%" },
      { Header: "Telefono", accessor: "telefono", width: "10%" },
      { Header: "Movil", accessor: "movil", width: "10%" },
      { Header: "Email", accessor: "email", width: "10%" },
      { Header: "Notas", accessor: "notas", width0: "10%" },
      { Header: "Estado", accessor: "estado_aprobado", width0: "10%" },
      { Header: "acciones", accessor: "acciones", width: "10%" },
    ],
    rows: userTienda
  }

  if (userTienda != null) {
    userTienda.map((item, index) => {
      item['key'] = index + 1;
      item.estado_aprobado == 'PENDIENTE' ?
        item['acciones'] = <Button disabled> Acreditar </Button>
        : item['acciones'] = <Button > Acreditar </Button>
    })
  }

  useEffect(() => {
    (async () => {
      setuserTienda(await ListarPre(dataCliente().id))
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
                  Listar Pre-registros
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

export default Pre;
