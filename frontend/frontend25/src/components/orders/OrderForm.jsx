import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "Yup";
import ordersService from "./ordersService";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Stack
} from "@mui/material";

export default function OrderForm({ editing, onSaved, onCancel }) {
  const formik = useFormik({
    initialValues: {
      orderNumber: "",
      customerName: "",
      status: "PENDING",
      date: "",
      total: ""
    },
    validationSchema: Yup.object({
      orderNumber: Yup.string().required("El número de orden es obligatorio"),
      customerName: Yup.string().required("El nombre del cliente es obligatorio"),
      date: Yup.string().required("La fecha es obligatoria"),
      status: Yup.string().required("El estado es obligatorio"),
      total: Yup.number()
        .required("El total es obligatorio")
        .positive("Debe ser mayor a 0")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          ...values,
          total: parseFloat(values.total)
        };

        if (editing) {
          await ordersService.update(editing.id, payload);
        } else {
          await ordersService.create(payload);
        }

        resetForm();
        onSaved();
      } catch (err) {
        console.error("Error guardando la orden:", err);
        alert("Error guardando la orden");
      }
    }
  });

  useEffect(() => {
    if (editing) formik.setValues(editing);
  }, [editing]);

  return (
    <Paper sx={{ padding: 3, marginBottom: 2 }}>
      <Typography variant="h6">
        {editing ? "Editar Orden" : "Registrar Orden"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginTop: 2 }}>

          <TextField
            label="Número de Orden"
            name="orderNumber"
            fullWidth
            value={formik.values.orderNumber}
            onChange={formik.handleChange}
            error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
            helperText={formik.touched.orderNumber && formik.errors.orderNumber}
          />

          <TextField
            label="Cliente"
            name="customerName"
            fullWidth
            value={formik.values.customerName}
            onChange={formik.handleChange}
            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
            helperText={formik.touched.customerName && formik.errors.customerName}
          />

          <TextField
            label="Fecha"
            type="date"
            name="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <TextField
            label="Estado"
            name="status"
            select
            fullWidth
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <MenuItem value="PENDING">Pendiente</MenuItem>
            <MenuItem value="PROCESSING">Procesando</MenuItem>
            <MenuItem value="COMPLETED">Completado</MenuItem>
          </TextField>

          <TextField
            label="Total"
            name="total"
            type="number"
            fullWidth
            value={formik.values.total}
            onChange={formik.handleChange}
            error={formik.touched.total && Boolean(formik.errors.total)}
            helperText={formik.touched.total && formik.errors.total}
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>

            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          </Stack>

        </Stack>
      </form>
    </Paper>
  );
}
