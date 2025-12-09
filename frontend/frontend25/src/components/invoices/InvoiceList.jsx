import { useEffect, useState } from "react";
import invoicesService from "./invoicesService";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack
} from "@mui/material";

import InvoiceForm from "./InvoiceForm";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await invoicesService.getAll();
      setInvoices(res.data);
    } catch (error) {
      console.error("Error cargando facturas:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar factura?")) return;

    try {
      await invoicesService.delete(id);
      load();
    } catch (error) {
      console.error("Error borrando factura:", error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Facturas
      </Typography>

      <InvoiceForm
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
            <TableCell>N° Factura</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.invoiceNumber}</TableCell>
              <TableCell>{inv.date}</TableCell>
              <TableCell>{inv.totalAmount}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() => setEditing(inv)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(inv.id)}
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
