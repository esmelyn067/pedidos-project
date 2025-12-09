import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

// COMPONENTES GENERALES
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard";  

// PROVEEDORES
import ProviderList from "./components/Providers/ProviderList";
import ProviderForm from "./components/Providers/ProviderForm";

// COMERCIOS
import MerchantList from "./components/merchants/MerchantList";
import MerchantForm from "./components/merchants/MerchantForm";

// ALMACENES
import AlmacenList from "./components/almacen/AlmacenList";
import AlmacenForm from "./components/almacen/AlmacenForm";

// Facturas
import InvoiceList from "./components/invoices/InvoiceList";
import InvoiceForm from "./components/invoices/InvoiceForm";

export default function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          <Toolbar />

          <Routes>

            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Proveedores */}
            <Route path="/providers" element={<ProviderList />} />
            <Route path="/providers/nuevo" element={<ProviderForm />} />

            {/* Comercios */}
            <Route path="/merchants" element={<MerchantList />} />
            <Route path="/merchants/nuevo" element={<MerchantForm />} />

            {/* Almacenes */}
            <Route path="/almacen" element={<AlmacenList />} />
            <Route path="/almacen/nuevo" element={<AlmacenForm />} />

            {/* Facturas */}
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/nuevo" element={<InvoiceForm />} />

          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
