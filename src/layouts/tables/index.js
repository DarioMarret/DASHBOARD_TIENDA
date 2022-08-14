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
import { Box, Button, FormControl, Input, MenuItem, Modal, Select } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { dataCliente } from "function/localstore/storeUsuario";
import { ListarTransaccionesTienda } from "function/util/Query";
import axios from "axios";

// Data
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid white',
  borderRadius: '5px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

function Tables() {
  const [userTienda, setuserTienda] = useState([]);
  const [data, setdata] = useState([]);
  const [numero, setnumero] = useState(null);
  const [opcional, setopcional] = useState(null);
  const [ticket, setticket] = useState(null);
  const [open_2, setOpen_2] = useState(false);


  const dataTableData = {
    columns: [
      { Header: "#", accessor: "key", width: "10%" },
      { Header: "Tienda", accessor: "nombre_tienda", width: "10%" },
      { Header: "Transaccion", accessor: "transacion_id", width: "10%" },
      { Header: "Cantidad", accessor: "cantidad", width: "5%" },
      { Header: "Recaudacion", accessor: "recaudacion", width: "5%" },
      { Header: "Cedula Cliente", accessor: "cedula", width: "10%" },
      { Header: "cliente y estado", accessor: "cliente", width: "25%" },
      { Header: "Fecha de pago", accessor: "fecha_registro", width: "20%" },
      { Header: "Accion", accessor: "accion", width: "20%" },
    ],
    rows: userTienda
  }

  if (userTienda != null) {
    userTienda.map((item, index) => {
      item['key'] = index + 1;
      item.accion = <>
        <Button onClick={() => send(item)}>
          send <WhatsAppIcon fontSize="large" />
        </Button>
      </>
    })
  }
  
  function handleOpen2() {
    limpiar()
    setOpen_2(!open_2);
  }
  function limpiar() {
    setnumero(null);
    setopcional(null);
  }

  async function send(item) {
    let movil = item.movil.replace(/ /g, '').substr(1, 9);
    let telefono = item.telefono.replace(/ /g, '').substr(1, 9);
    console.log(typeof item.ticket)
    setticket(item.ticket);
    setdata([{ "fn": movil }, { "fn": telefono }])
    handleOpen2()
  }

  async function whatsappsend() {
    if (numero != null && numero.length == 9 && ticket != "") {
      await axios.post(`${dataCliente().host_whatsapp}/api/send_whatsapp`, {
        from: `593${numero}@c.us`,
        "mensaje": ticket,
      })
      handleOpen2()
      console.log(data)
    }

    if (opcional != null && opcional.length == 10 && ticket != "") {
      await axios.post(`${dataCliente().host_whatsapp}/api/send_whatsapp`, {
        from: `593${opcional.replace(/ /g, '').substr(1, 9)}@c.us`,
        "mensaje": ticket,
      })
      handleOpen2()
    }
  }

  useEffect(() => {
    (async () => {
      setuserTienda(await ListarTransaccionesTienda(dataCliente().id));
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
                  Transacciones realizadas
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
      {/* MODAL PARA ELIMINAR */}
      <Modal
        open={open_2}
        onClose={handleOpen2}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '30%' }}>
          <div style={{ alignItems: 'center' }}>
            <h2 id="parent-modal-title">Renviar Comprobante</h2>
            <br />
            <label>
              Numero Whatsapp:
              <FormControl sx={{ p: 3, minWidth: 120 }} fullWidth={true}>
                <Select
                  id="demo-simple-select"
                  value={numero}
                  style={{ ...style, height: 50, width: '100%' }}
                  onChange={(event) => setnumero(event.target.value)}
                >
                  {
                    data != null ? data.map((item, index) => <MenuItem key={index + 1} value={item.fn}>{item.fn}</MenuItem>) : null
                  }
                </Select>
              </FormControl>
            </label>
            <RedBar />
            <label>
              Numero Opcional:
              <Input name="opcional" type="text" fullWidth={true} onChange={(event) => setopcional(event.target.value)} />
            </label>
          </div>
          <div style={{ textAlign: 'right' }}>
            <br />
            <Button variant="text" size="large" onClick={whatsappsend}>renviar</Button>
          </div>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        //   backgroundColor: (theme) =>
        //     theme.palette.mode === 'light'
        //       ? 'rgba(255, 0, 0, 0.1)'
        //       : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}
export default Tables;
