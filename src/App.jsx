import { Routes, Route } from "react-router-dom";
import SharedLayout from "./layout/sharedLayout";
import HomePage from "./pages/HomePage";
import CustomerDetails from "./pages/CustomerDetails";
import OrderDetails from "./pages/OrderDetails";
import TextileDetails from "./pages/TextileDetails";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./layout/PrivateRoute";
import "./App.css";
import FabricDetails from "./pages/FabricDetails";
import SupplierDetails from "./pages/SupplierDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="customer/:customerId"
            element={
              <PrivateRoute>
                <CustomerDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="order/:orderNo"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="fabrics"
            element={
              <PrivateRoute>
                <TextileDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="suppliers"
            element={
              <PrivateRoute>
                <SupplierDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="fabric/:fabricId"
            element={
              <PrivateRoute>
                <FabricDetails />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
