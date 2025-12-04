import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../api/axiosClient';
import { TextField, Button, Stack } from '@mui/material';

export default function ProviderForm({ editing, onSaved }) {
  const formik = useFormik({
    initialValues: { name: '', rnc: '', contact: '', address: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre requerido')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editing && editing.id) {
          await api.put(`/providers/${editing.id}`, values);
        } else {
          await api.post('/providers', values);
        }
        resetForm();
        onSaved && onSaved();
      } catch (err) {
        console.error(err);
        alert('Error al guardar proveedor');
      }
    }
  });

  useEffect(() => {
    if (editing) formik.setValues(editing);
  }, [editing]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={1} direction="row" alignItems="center">
        <TextField label="Nombre" name="name" value={formik.values.name} onChange={formik.handleChange} error={Boolean(formik.touched.name && formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
        <TextField label="RNC" name="rnc" value={formik.values.rnc} onChange={formik.handleChange} />
        <TextField label="Contacto" name="contact" value={formik.values.contact} onChange={formik.handleChange} />
        <Button variant="contained" type="submit">Guardar</Button>
      </Stack>
    </form>
  );
}
