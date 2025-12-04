import { useEffect, useState } from "react";
import almacenesService from "../../api/almacenesService";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function AlmacenList({ onSelect, onCreate }) {
  const [almacenes, setAlmacenes] = useState([]);

  const loadData = async () => {
    try {
      const res = await almacenesService.getAll();
      setAlmacenes(res.data);
    } catch (error) {
      console.error("Error cargando almacenes:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Almacenes
      </Typography>

      <Button variant="contained" onClick={onCreate} sx={{ mb: 2 }}>
        Nuevo Almacén
      </Button>

      <List>
        {almacenes.map((almacen) => (
          <ListItem
            key={almacen.id}
            divider
            button
            onClick={() => onSelect(almacen)}
          >
            <ListItemText
              primary={almacen.name}
              secondary={`Ubicación: ${almacen.location}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
