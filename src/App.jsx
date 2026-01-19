import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout/Layout";

const Home = lazy(() => import("./pages/Home/Home"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
