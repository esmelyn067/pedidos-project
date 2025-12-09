import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import merchantsService from "./merchantsService";

export default function MerchantForm({ editing, onSaved, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editing) {
          await merchantsService.update(editing.id, values);
        } else {
          await merchantsService.create(values);
        }

        resetForm();
        onSaved && onSaved();
      } catch (error) {
        console.error("Error guardando comerciante:", error);
        alert("Error guardando comerciante");
      }
    }
  });

  useEffect(() => {
    if (editing) formik.setValues(editing);
  }, [editing]);

  return (
    <Paper sx={{ padding: 3, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {editing ? "Editar Comerciante" : "Registrar Comerciante"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />

          <TextField
            label="Dirección"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Teléfono"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
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
