import "./OrderConfirmed.css";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../services/api/order";
import Loader from "../../components/Loaders/Loader";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import successLottie from "../../assets/lotties/success.json";
import { useIsAr } from "../../hooks/useIsAr";

function OrderConfirmed() {
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAr = useIsAr();

  const orderId = searchParams.get("order_id");
  const paymentStatus = searchParams.get("paymentStatus");

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!orderId) navigate("/");
  }, [orderId, navigate]);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="orderConfirmedPage row justify-content-center align-items-center m-0 gap-2">
        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-4 p-0">
          <Lottie animationData={successLottie} loop={true} />
        </div>
        <div className="col-12 text-center p-0 headerText">
          <h3 className="m-0">{t("your order has been confirmed")}</h3>
          <h5 className="py-2">
            {t("order id")} : {order?.id}
          </h5>
        </div>

        {/* order details */}
        <div
          className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10 detailsTable p-0"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div className="tableHead text-center py-2">
            <h4 className="m-0">{t("order details")}</h4>
          </div>
          <div className="tableContent p-2">
            <div className="tableItem p-0">
              <span>{t("order status")}</span>
              <span>{order?.status}</span>
            </div>
            <hr />
            <div className="tableItem p-0">
              <span>{t("payment status")}</span>
              <span>{order?.payment_status}</span>
            </div>
            <hr />
            <div className="tableItem p-0">
              <span>{t("shipping fees")}</span>
              <span>
                {order?.shipping_cost} {t("L.E")}
              </span>
            </div>
            <hr />
            {order?.discount_amount > 0 && (
              <>
                <div className="tableItem p-0">
                  <span>{t("discounts")}</span>
                  <span>
                    {order?.discount_amount} {t("L.E")}
                  </span>
                </div>
                <hr />
              </>
            )}
            <div className="tableItem p-0">
              <span>{t("total")}</span>
              <span>
                {order?.total} {t("L.E")}
              </span>
            </div>
          </div>
        </div>

        {/* shipping details*/}
        <div
          className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10 detailsTable p-0"
          style={{ direction: isAr ? "rtl" : "ltr" }}
        >
          <div className="tableHead text-center py-2">
            <h4 className="m-0">{t("shipping details")}</h4>
          </div>
          <div className="tableContent p-2">
            <div className="tableItem p-0">
              <span>{t("order status")}</span>
              <span>{order?.status}</span>
            </div>
            <hr />
            <div className="tableItem p-0">
              <span>{t("payment status")}</span>
              <span>{order?.payment_status}</span>
            </div>
            <hr />
            <div className="tableItem p-0">
              <span>{t("shipping fees")}</span>
              <span>
                {order?.shipping_cost} {t("L.E")}
              </span>
            </div>
            <hr />
            {order?.discount_amount > 0 && (
              <>
                <div className="tableItem p-0">
                  <span>{t("discounts")}</span>
                  <span>
                    {order?.discount_amount} {t("L.E")}
                  </span>
                </div>
                <hr />
              </>
            )}
            <div className="tableItem p-0">
              <span>{t("total")}</span>
              <span>
                {order?.total} {t("L.E")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderConfirmed;
