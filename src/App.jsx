import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loaders/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const ExchangeReturn = lazy(
  () => import("./pages/ExchangeReturn/ExchangeReturn"),
);
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product-details/:slug" element={<ProductPage />} />
              <Route path="shop/category_id/:category_id" element={<Shop />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="exchange-return" element={<ExchangeReturn />} />
              <Route path="privacy-policy" element={<Privacy />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
