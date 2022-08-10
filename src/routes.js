import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import PaidIcon from '@mui/icons-material/Paid';
import PageviewIcon from '@mui/icons-material/Pageview';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

// @mui icons
import Icon from "@mui/material/Icon";
import Pagar from "layouts/pagar/pagar";
import Creditod from "layouts/historial";

const routes = [
  {
    type: "collapse",
    name: "Inicio",
    key: "inicio",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Pagar",
    key: "pagar",
    icon: <PaidIcon />,
    route: "/pagar",
    component: <Pagar />,
  },
  {
    type: "collapse",
    name: "Transacciones",
    key: "transacciones",
    icon: <PageviewIcon />,
    route: "/transacciones",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Historial de Creditos",
    key: "credito",
    icon: <HistoryEduIcon />,
    route: "/creditos",
    component: <Creditod />,
  },
  // {
  //   type: "collapse",
  //   name: "reset contraceña",
  //   key: "reset",
  //   icon: <LockResetIcon />,
  //   route: "/reset",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
