import { useEffect, useState } from "react";
import productsService from "../../components/products/productsService";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ProductList({ onSelect, onCreate }) {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      const res = await productsService.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Productos
      </Typography>

      <Button variant="contained" onClick={onCreate} sx={{ mb: 2 }}>
        Nuevo Producto
      </Button>

      <List>
        {products.map((product) => (
          <ListItem
            key={product.id}
            divider
            button
            onClick={() => onSelect(product)}
          >
            <ListItemText
              primary={product.name}
              secondary={`Precio: ${product.price} | Stock: ${product.stock}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
