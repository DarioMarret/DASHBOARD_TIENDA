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
import data from "layouts/dashboard/components/Projects/data";
import { dataCliente } from "function/localstore/storeUsuario";
import { UlmiasTransaciones } from "function/util/Query";

function Projects() {
  const { columns, rows } = data();
  const [userTienda, setuserTienda] = useState([]);
  const dataTableData = {//963722798
    columns: [
      { Header: "#", accessor: "key", width: "5%" },
      { Header: "Transaccion", accessor: "transacion_id", width: "10%" },
      { Header: "Cantidad", accessor: "cantidad", width: "10%" },
      { Header: "Cedula Cliente", accessor: "cedula", width: "10%" },
      { Header: "cliente y estado", accessor: "cliente", width: "10%" },
      { Header: "Fecha de pago", accessor: "fecha_registro", width: "10%" },
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
        setuserTienda(await UlmiasTransaciones(dataCliente().id));
    })()
}, []);
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Ultimas transaciones registradas
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
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
