import { useState } from "react";
import invoicesService from "../../api/invoicesService";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function InvoiceForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    invoiceNumber: "",
    date: "",
    totalAmount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await invoicesService.create({
        ...form,
        totalAmount: parseFloat(form.totalAmount)
      });

      onSuccess();
    } catch (error) {
      console.error("Error creando factura:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Factura
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Número de Factura"
          fullWidth
          margin="normal"
          name="invoiceNumber"
          value={form.invoiceNumber}
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
          label="Total"
          type="number"
          fullWidth
          margin="normal"
          name="totalAmount"
          value={form.totalAmount}
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
