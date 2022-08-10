import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { red, blue } from '@mui/material/colors';
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import useAuth from "hook/useAuth";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [loading, setLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [error, seterror] = useState(null);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  function handleuser(e) {
    seterror(null);
    setcolor(true);
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  const { login } = useAuth()


  const logup = async () => {
    if (user.username !== '' || user.password !== '') {
      setLoading(true);
      try {
        const { data } = await axios.post('https://rec.netbot.ec/v1/api/login_tienda', user, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic YWRtaW46YWRtaW4=`
          }
        });
        if (data.success !== false) {
          setcolor(true)
          login(data.data)
          setLoading(false);
        } else {
          setcolor(false)
          setLoading(false);
          seterror(data.message)
        }
      } catch (error) {
        seterror(error.message);
        setLoading(false);
      }
    }


  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar Sesión <br /> NetBot
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Usuario" name="username" fullWidth onChange={handleuser} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraceña" name="password" fullWidth onChange={handleuser} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="dark"
                fullWidth
                loading={true}
                onClick={() => logup()}>
                Ingresar
              </MDButton>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: color ? blue[500] : red[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
              {
                error != null ?
                  <MDTypography variant="body2" fontWeight="regular" color="error" mt={1}>
                    {error}
                  </MDTypography> : null
              }
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                No&apos;tienes una cuneta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="dark"
                  fontWeight="medium"
                  textGradient
                >
                  Inscribirse
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
