import { useState } from "react";
import ordersService from "../../api/ordersService";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem
} from "@mui/material";

export default function OrderForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    orderNumber: "",
    customerName: "",
    status: "PENDING",
    date: "",
    total: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ordersService.create({
        ...form,
        total: parseFloat(form.total)
      });

      onSuccess();
    } catch (error) {
      console.error("Error creando la orden:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Orden
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Número de Orden"
          fullWidth
          margin="normal"
          name="orderNumber"
          value={form.orderNumber}
          onChange={handleChange}
        />

        <TextField
          label="Cliente"
          fullWidth
          margin="normal"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
        />

        <TextField
          label="Fecha"
          type="date"
          fullWidth
          margin="normal"
          name="date"
          InputLabelProps={{ shrink: true }}
          value={form.date}
          onChange={handleChange}
        />

        <TextField
          label="Estado"
          select
          fullWidth
          margin="normal"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value="PENDING">Pendiente</MenuItem>
          <MenuItem value="PROCESSING">Procesando</MenuItem>
          <MenuItem value="COMPLETED">Completado</MenuItem>
        </TextField>

        <TextField
          label="Total"
          type="number"
          fullWidth
          margin="normal"
          name="total"
          value={form.total}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2, mr: 1 }}>
          Guardar
        </Button>

        <Button variant="outlined" sx={{ mt: 2 }} onClick={onCancel}>
          Cancelar
        </Button>
      </form>
    </Paper>
  );
}
