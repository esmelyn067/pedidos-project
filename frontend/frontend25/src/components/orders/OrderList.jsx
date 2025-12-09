import { useEffect, useState } from "react";
import ordersService from "./ordersService";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack
} from "@mui/material";

import OrderForm from "./OrderForm";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await ordersService.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error("Error cargando órdenes:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar orden?")) return;

    try {
      await ordersService.delete(id);
      load();
    } catch (err) {
      console.error("Error eliminando orden:", err);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4">Gestión de Órdenes</Typography>

      <OrderForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          load();
        }}
        onCancel={() => setEditing(null)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N° Orden</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.orderNumber}</TableCell>
              <TableCell>{o.customerName}</TableCell>
              <TableCell>{o.date}</TableCell>
              <TableCell>{o.status}</TableCell>
              <TableCell>{o.total}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => setEditing(o)}>
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(o.id)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
