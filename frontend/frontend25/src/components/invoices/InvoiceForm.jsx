import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import invoicesService from "./invoicesService";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack
} from "@mui/material";

export default function InvoiceForm({ editing, onSaved, onCancel }) {
  const formik = useFormik({
    initialValues: {
      invoiceNumber: "",
      date: "",
      totalAmount: ""
    },
    validationSchema: Yup.object({
      invoiceNumber: Yup.string().required("El número de factura es obligatorio"),
      date: Yup.string().required("La fecha es obligatoria"),
      totalAmount: Yup.number()
        .required("El total es obligatorio")
        .positive("Debe ser mayor a 0")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          ...values,
          totalAmount: parseFloat(values.totalAmount)
        };

        if (editing) {
          await invoicesService.update(editing.id, payload);
        } else {
          await invoicesService.create(payload);
        }

        resetForm();
        onSaved();
      } catch (error) {
        console.error("Error guardando factura:", error);
        alert("Error guardando factura");
      }
    }
  });

  useEffect(() => {
    if (editing) {
      formik.setValues({
        invoiceNumber: editing.invoiceNumber,
        date: editing.date,
        totalAmount: editing.totalAmount
      });
    }
  }, [editing]);

  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6">
        {editing ? "Editar Factura" : "Registrar Factura"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <TextField
            label="Número de Factura"
            name="invoiceNumber"
            value={formik.values.invoiceNumber}
            onChange={formik.handleChange}
            error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
            helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
            fullWidth
          />

          <TextField
            label="Fecha"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            fullWidth
          />

          <TextField
            label="Total"
            type="number"
            name="totalAmount"
            value={formik.values.totalAmount}
            onChange={formik.handleChange}
            error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
            helperText={formik.touched.totalAmount && formik.errors.totalAmount}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
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
