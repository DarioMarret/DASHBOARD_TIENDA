import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import DomainIcon from '@mui/icons-material/Domain';
import PageviewIcon from '@mui/icons-material/Pageview';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

// @mui icons
import Icon from "@mui/material/Icon";
import Creditod from "layouts/historial";
import Account from "layouts/Account";
import Store from "layouts/Store";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Whatsapp from "layouts/whatsapp";
import Pre from "layouts/Pre";

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
    name: "Business",
    key: "business",
    icon: <DomainIcon />,
    route: "/business",
    component: <Account />,
  },
  {
    type: "collapse",
    name: "WhatsApp",
    key: "whatsapp",
    icon: <WhatsApp/>,
    route: "/whatsapp_qr",
    component: <Whatsapp />,
  },
  {
    type: "collapse",
    name: "Stores",
    key: "stores",
    icon: <StoreMallDirectoryIcon />,
    route: "/store",
    component: <Store />,
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
  {
    type: "collapse",
    name: "Pre-registros",
    key: "registros",
    icon: <HistoryEduIcon />,
    route: "/pre-registros",
    component: <Pre />,
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
