
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
  const [ Cards, setCards ] = useState();

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
                title="Total Pagos"
                count={Cards != null ?Cards.total : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Total Recaudados en las Tiendas",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="house"
                title="Total Tiendas"
                count={Cards != null ? Cards.total_tienda : 0}
                percentage={{
                  color: "success",
                  amount: Cards != null ?Cards.total_accounts : 0,
                  label: "accounts",
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
                count={Cards != null ?Cards.total_transaciones : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label:"Total transacciones tiendas"  ,
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
                count={Cards != null ?Cards.total_recaudado : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Recaudacion en las tiendas",
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
