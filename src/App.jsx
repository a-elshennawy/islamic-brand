import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loaders/Loader";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage/CategoryPage"));
const SearchShop = lazy(() => import("./pages/SearchShop/SearchShop"));
const Discounts = lazy(() => import("./pages/Discounts/Discounts"));
const ExchangeReturn = lazy(
  () => import("./pages/ExchangeReturn/ExchangeReturn"),
);
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const [t] = useTranslation();
  return (
    <>
      <title>{t("brand_name")}</title>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product-details/:slug" element={<ProductPage />} />
              <Route
                path="shop/category_id/:category_id"
                element={<CategoryPage />}
              />
              <Route path="search-shop" element={<SearchShop />} />
              <Route path="discounts" element={<Discounts />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="exchange-return" element={<ExchangeReturn />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="auth" element={<Auth />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
