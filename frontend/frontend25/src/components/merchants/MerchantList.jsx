import { useEffect, useState } from "react";
import merchantsService from "../../api/merchantsService";
import { 
  Paper, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText 
} from "@mui/material";

export default function MerchantList({ onSelect, onCreate }) {
  const [merchants, setMerchants] = useState([]);

  const loadData = async () => {
    try {
      const res = await merchantsService.getAll();
      setMerchants(res.data);
    } catch (error) {
      console.error("Error loading merchants:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Comerciantes
      </Typography>

      <Button variant="contained" onClick={onCreate} sx={{ mb: 2 }}>
        Nuevo Comerciante
      </Button>

      <List>
        {merchants.map((merchant) => (
          <ListItem 
            key={merchant.id} 
            divider 
            button 
            onClick={() => onSelect(merchant)}
          >
            <ListItemText
              primary={merchant.name}
              secondary={merchant.address}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
