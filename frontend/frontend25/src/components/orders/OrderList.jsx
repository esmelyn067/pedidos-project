import { useEffect, useState } from "react";
import ordersService from "../../api/ordersService";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function OrderList({ onSelect, onCreate }) {
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    try {
      const res = await ordersService.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Órdenes
      </Typography>

      <Button variant="contained" onClick={onCreate} sx={{ mb: 2 }}>
        Nueva Orden
      </Button>

      <List>
        {orders.map((order) => (
          <ListItem
            key={order.id}
            divider
            button
            onClick={() => onSelect(order)}
          >
            <ListItemText
              primary={`Orden #${order.orderNumber}`}
              secondary={`Cliente: ${order.customerName} | Estado: ${order.status} | Total: ${order.total}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
