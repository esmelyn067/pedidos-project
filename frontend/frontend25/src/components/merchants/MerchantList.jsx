import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack
} from "@mui/material";

import MerchantForm from "./MerchantForm";
import merchantsService from "./merchantsService";

export default function MerchantList() {
  const [merchants, setMerchants] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await merchantsService.getAll();
      setMerchants(res.data);
    } catch (error) {
      console.error("Error cargando comerciantes:", error);
      alert("Error cargando comerciantes");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar este comerciante?")) return;

    try {
      await merchantsService.delete(id);
      load();
    } catch (error) {
      console.error("Error eliminando comerciante:", error);
      alert("No se pudo eliminar");
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Comerciantes
      </Typography>

      <MerchantForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          load();
        }}
        onCancel={() => setEditing(null)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {merchants.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.address}</TableCell>
              <TableCell>{m.phone}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => setEditing(m)}>
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(m.id)}
                  >
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
