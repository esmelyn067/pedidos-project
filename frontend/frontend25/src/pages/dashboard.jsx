import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import providersService from "../api/providersService";
import merchantsService from "../api/merchantsService";
import almacenesService from "../api/almacenesService";
import productsService from "../api/productsService";
import ordersService from "../api/ordersService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    proveedores: 0,
    comercios: 0,
    almacenes: 0,
    productos: 0,
    pedidos: 0,
  });

  const loadStats = async () => {
    try {
      const [prov, merc, almac, prod, ord] = await Promise.all([
        providersService.getAll(),
        merchantsService.getAll(),
        almacenesService.getAll(),
        productsService?.getAll?.() ?? { data: [] }, // POR SI AÚN NO EXISTE
        ordersService?.getAll?.() ?? { data: [] },
      ]);

      setStats({
        proveedores: prov.data.length,
        comercios: merc.data.length,
        almacenes: almac.data.length,
        productos: prod.data.length,
        pedidos: ord.data.length,
      });
    } catch (error) {
      console.error("Error cargando estadísticas del dashboard", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cardStyle = {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Panel Principal
      </Typography>

      <Grid container spacing={3}>
        {/* Proveedores */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <LocalShippingIcon sx={{ fontSize: 50 }} />
            <div>
              <Typography variant="h6">Proveedores</Typography>
              <Typography variant="h4">{stats.proveedores}</Typography>
            </div>
          </Paper>
        </Grid>

        {/* Comercios */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <StoreIcon sx={{ fontSize: 50 }} />
            <div>
              <Typography variant="h6">Comercios</Typography>
              <Typography variant="h4">{stats.comercios}</Typography>
            </div>
          </Paper>
        </Grid>

        {/* Almacenes */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <WarehouseIcon sx={{ fontSize: 50 }} />
            <div>
              <Typography variant="h6">Almacenes</Typography>
              <Typography variant="h4">{stats.almacenes}</Typography>
            </div>
          </Paper>
        </Grid>

        {/* Productos */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <InventoryIcon sx={{ fontSize: 50 }} />
            <div>
              <Typography variant="h6">Productos</Typography>
              <Typography variant="h4">{stats.productos}</Typography>
            </div>
          </Paper>
        </Grid>

        {/* Pedidos */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={cardStyle}>
            <ShoppingCartIcon sx={{ fontSize: 50 }} />
            <div>
              <Typography variant="h6">Pedidos</Typography>
              <Typography variant="h4">{stats.pedidos}</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
