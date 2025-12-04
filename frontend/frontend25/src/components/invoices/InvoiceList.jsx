import { useEffect, useState } from "react";
import invoicesService from "../../api/invoicesService";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function InvoiceList({ onSelect, onCreate }) {
  const [invoices, setInvoices] = useState([]);

  const loadData = async () => {
    try {
      const res = await invoicesService.getAll();
      setInvoices(res.data);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Facturas
      </Typography>

      <Button variant="contained" onClick={onCreate} sx={{ mb: 2 }}>
        Nueva Factura
      </Button>

      <List>
        {invoices.map((invoice) => (
          <ListItem
            key={invoice.id}
            divider
            button
            onClick={() => onSelect(invoice)}
          >
            <ListItemText
              primary={`Factura #${invoice.invoiceNumber}`}
              secondary={`Fecha: ${invoice.date} | Total: ${invoice.totalAmount}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
