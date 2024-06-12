import { Routes, Route } from "react-router-dom";
import SharedLayout from "./layout/sharedLayout";
import HomePage from "./pages/HomePage";
import CustomerDetails from "./pages/CustomerDetails";
import OrderDetails from "./pages/OrderDetails";
import TextileDetails from "./pages/TextileDetails";
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SharedLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="customer/:customerId" element={<CustomerDetails/>} />
        <Route path="order/:orderNo" element={<OrderDetails/>} />
        <Route path="fabrics" element={<TextileDetails/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
