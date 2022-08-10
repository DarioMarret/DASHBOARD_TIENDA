import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { dataCliente } from "function/localstore/storeUsuario";
import { TotalCard } from "function/util/Query";
import { useEffect, useState } from "react";

function OrdersOverview() {
  const [ Cards, setCards ] = useState([]);

  useEffect(() => {
    (async () => {
      setCards(await TotalCard(dataCliente().id));
    })()
  }, []);
  console.log(Cards)
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Dash Store
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="store"
          title="Saldo Actual"
          dateTime="ACTUAL DATE"
        />
        <TimelineItem
          color="error"
          icon="thumb_up"
          title="Total Pagos"
          dateTime="ACTUAL DATE"
        />
        <TimelineItem
          color="info"
          icon="autorenew"
          title="Total Transaciones"
          dateTime="ACTUAL DATE"
        />
        <TimelineItem
          color="warning"
          icon="balance_wallet"
          title="Total Recaudado"
          dateTime="ACTUAL DATE"
        />
        <TimelineItem
          color="primary"
          icon="note"
          title="Notas"
          dateTime="ACTUAL DATE"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
