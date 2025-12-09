import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack, Paper } from "@mui/material";
import providerService from "./providerService";

export default function ProviderForm({ editing, onSaved }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      rnc: "",
      contact: "",
      address: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editing) {
          await providerService.update(editing.id, values);
        } else {
          await providerService.create(values);
        }
        resetForm();
        onSaved && onSaved();
      } catch (err) {
        console.error(err);
        alert("Error al guardar proveedor");
      }
    }
  });

  useEffect(() => {
    if (editing) formik.setValues(editing);
  }, [editing]);

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="RNC"
            name="rnc"
            value={formik.values.rnc}
            onChange={formik.handleChange}
          />

          <TextField
            label="Contacto"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
          />

          <TextField
            label="Dirección"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />

          <Button variant="contained" type="submit">
            {editing ? "Actualizar" : "Guardar"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
