import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import { dataCliente } from "function/localstore/storeUsuario";
import { SaldoActual } from "function/util/Query";

function Projects() {
  const [userTienda, setuserTienda] = useState([]);
  const dataTableData = {//963722798
    columns: [
      { Header: "#", accessor: "key", width: "5%" },
      { Header: "Accounts", accessor: "accounts", width: "10%" },
      { Header: "Tienda", accessor: "nombre_tienda", width: "10%" },
      { Header: "Saldo", accessor: "saldos", width: "10%" },
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
      setuserTienda(await SaldoActual(dataCliente().id));
    })()
  }, [])

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Saldos Tiendas
          </MDTypography>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" >
            more_vert
          </Icon>
        </MDBox> */}
      </MDBox>
      <MDBox>
        <DataTable
          table={dataTableData}
          canSearch
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
