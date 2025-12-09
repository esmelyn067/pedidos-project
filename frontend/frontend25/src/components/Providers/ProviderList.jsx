import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, Paper, Stack
} from "@mui/material";

import ProviderForm from "./ProviderForm";
import providerService from "./providerService";

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await providerService.getAll();
      setProviders(res.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando proveedores");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proveedor?")) return;

    try {
      await providerService.delete(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar proveedor");
    }
  };

  console.log("ProviderList cargado");

  return (
    <Paper sx={{ padding: 3 }}>
      <h2>Gestión de Proveedores</h2>

      <ProviderForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>RNC</TableCell>
            <TableCell>Contacto</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {providers.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.rnc}</TableCell>
              <TableCell>{p.contact}</TableCell>
              <TableCell>{p.address}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => setEditing(p)}>
                    Editar
                  </Button>

                  <Button variant="outlined" color="error" onClick={() => remove(p.id)}>
                    Eliminar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
