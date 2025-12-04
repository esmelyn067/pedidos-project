import { useState } from "react";
import almacenesService from "../../api/almacenesService";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function AlmacenForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await almacenesService.create(form);
      onSuccess();
    } catch (error) {
      console.error("Error creando almacén:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Almacén
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Almacén"
          fullWidth
          margin="normal"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          label="Ubicación"
          fullWidth
          margin="normal"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2, mr: 1 }}>
          Guardar
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </form>
    </Paper>
  );
}
