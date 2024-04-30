import { Routes, Route } from "react-router-dom";
import SharedLayout from "./layout/sharedLayout";
import HomePage from "./pages/HomePage";
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SharedLayout/>}>
        <Route index element={<HomePage/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
