import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import almacenesService from "./almacenesService";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";

export default function AlmacenForm({ editing, onSaved, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      location: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      location: Yup.string().required("La ubicación es obligatoria")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editing) {
          await almacenesService.update(editing.id, values);
        } else {
          await almacenesService.create(values);
        }

        resetForm();
        onSaved && onSaved();
      } catch (error) {
        console.error("Error guardando almacén:", error);
        alert("Error guardando el almacén");
      }
    }
  });

  useEffect(() => {
    if (editing) formik.setValues(editing);
  }, [editing]);

  return (
    <Paper sx={{ padding: 3, marginBottom: 2 }}>
      <Typography variant="h6">
        {editing ? "Editar Almacén" : "Registrar Almacén"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <TextField
            label="Nombre del Almacén"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="Ubicación"
            name="location"
            fullWidth
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
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
