import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import Basic from "layouts/authentication/sign-in";
import AuthContext from "./context/AuthContext";
import { dataCliente, getDatosUsuario, removeDatosUsuario, setDatosUsuario } from "./function/localstore/storeUsuario";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [auth, setAuth] = useState(undefined);
  const [ReloadUser, setReloadUser] = useState(false);


  useEffect(() => {
    (() => {
      const dataC= getDatosUsuario();
      if (dataC != null) {
        setAuth(dataC);
      } else {
        setAuth(null);
      }
      setReloadUser(false);
    })()
  }, [ReloadUser]);
  
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const login = (data) => {
    console.log(data)
    setDatosUsuario(data)
    setAuth(data)
  };

  const logout = () => {
    removeDatosUsuario()
    setAuth(null);
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );


  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <AuthContext.Provider value={authData}>
          <CssBaseline />
          {auth == null || auth == undefined ?
            <Basic /> :
            <>
              {layout === "dashboard" && (
                <>
                  <Sidenav
                    color={sidenavColor}
                    // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                    brandName={dataCliente().responsable}
                    routes={routes}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                  />
                </>
              )}
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/dashboard" />} />
                {/* <Route path="*" element={<Navigate to="/pagar" />} /> */}
              </Routes>
            </>
          }
        </AuthContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <AuthContext.Provider value={authData}>
        <CssBaseline />
        {auth == null || auth == undefined ?
          <Basic /> :
          <>
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName={dataCliente().responsable}
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              </>
            )}
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
              {/* <Route path="*" element={<Navigate to="/pagar" />} /> */}

            </Routes>
          </>
        }
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
