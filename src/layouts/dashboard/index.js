
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import { TotalCard } from "function/util/Query";
import { dataCliente } from "function/localstore/storeUsuario";

function Dashboard() {
  const [ Cards, setCards ] = useState([]);

  useEffect(() => {
    (async () => {
      setCards(await TotalCard(dataCliente().id));
    })()
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Saldo Actual"
                count={Cards != null ?Cards.saldo : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Saldo actual de la tienda",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="thumb_up"
                title="Total Pagos"
                count={Cards != null ? Cards.transacciones : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Total de pagos clientes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="autorenew"
                title="Transaciones realizadas"
                count={Cards != null ?Cards.transacciones_count : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Total transacciones realiazadas",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="balance_wallet"
                title="Recaudacion"
                count={Cards != null ?Cards.recaudacion : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Recaciones",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
