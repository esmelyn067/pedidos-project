import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box
} from "@mui/material";

import WarehouseIcon from "@mui/icons-material/Warehouse";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";

import providersService from "../components/Providers/providerService";
import merchantsService from "../components/merchants/merchantsService";
import almacenesService from "../components/almacen/almacenesService";
import productsService from "../components/products/productsService";
import ordersService from "../components/orders/ordersService";
import invoicesService from "../components/invoices/invoicesService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    proveedores: 0,
    comercios: 0,
    almacenes: 0,
    productos: 0,
    pedidos: 0,
    facturas: 0,
  });

  const loadStats = async () => {
    try {
      const [
        prov,
        merc,
        almac,
        prod,
        ord,
        inv,
      ] = await Promise.all([
        providersService.getAll(),
        merchantsService.getAll(),
        almacenesService.getAll(),
        productsService?.getAll?.() ?? { data: [] },
        ordersService?.getAll?.() ?? { data: [] },
        invoicesService?.getAll?.() ?? { data: [] },
      ]);

      setStats({
        proveedores: prov.data.length,
        comercios: merc.data.length,
        almacenes: almac.data.length,
        productos: prod.data.length,
        pedidos: ord.data.length,
        facturas: inv.data.length,
      });
    } catch (error) {
      console.error("Error cargando estadísticas del dashboard", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const Card = ({ title, value, icon }) => (
    <Paper
      sx={{
        padding: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ fontSize: 60, opacity: 0.8 }}>{icon}</Box>

      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Panel Principal
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card title="Proveedores" value={stats.proveedores} icon={<LocalShippingIcon />} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card title="Comerciantes" value={stats.comercios} icon={<StoreIcon />} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card title="Almacenes" value={stats.almacenes} icon={<WarehouseIcon />} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card title="Productos" value={stats.productos} icon={<InventoryIcon />} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card title="Facturas" value={stats.facturas} icon={<ReceiptIcon />} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card title="Pedidos" value={stats.pedidos} icon={<ShoppingCartIcon />} />
        </Grid>
      </Grid>
    </>
  );
}
