import { useEffect, useState } from "react";
import almacenesService from "./almacenesService";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Stack
} from "@mui/material";

import AlmacenForm from "./AlmacenForm";

export default function AlmacenList() {
  const [almacenes, setAlmacenes] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await almacenesService.getAll();
      setAlmacenes(res.data);
    } catch (error) {
      console.error("Error cargando almacenes:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar almacén?")) return;

    try {
      await almacenesService.delete(id);
      load();
    } catch (error) {
      console.error("Error borrando almacén:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Almacenes
      </Typography>

      <AlmacenForm
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
            <TableCell>Ubicación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {almacenes.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.location}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => setEditing(a)}>
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(a.id)}
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
