import { useState } from "react";
import productsService from "../../api/productsService";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function ProductForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productsService.create({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      });

      onSuccess();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Producto
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <TextField
          label="Precio"
          fullWidth
          margin="normal"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <TextField
          label="Stock"
          fullWidth
          margin="normal"
          name="stock"
          type="number"
          value={form.stock}
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
