import { useState } from "react";
import merchantsService from "../../api/merchantsService";
import { 
  TextField, 
  Button, 
  Paper, 
  Typography 
} from "@mui/material";

export default function MerchantForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await merchantsService.create(form);
      onSuccess();
    } catch (error) {
      console.error("Error creando comerciante:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Comerciante
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
          label="Dirección"
          fullWidth
          margin="normal"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <TextField
          label="Teléfono"
          fullWidth
          margin="normal"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2, mr: 1 }}
        >
          Guardar
        </Button>

        <Button variant="outlined" sx={{ mt: 2 }} onClick={onCancel}>
          Cancelar
        </Button>
      </form>
    </Paper>
  );
}
