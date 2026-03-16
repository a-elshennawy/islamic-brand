import { useTranslation } from "react-i18next";
import { getPreviousOrders } from "../../services/api/order";
import { useQuery } from "@tanstack/react-query";
import SectionLoader from "../Loaders/SectionLoader";
import { useState } from "react";
import Lottie from "lottie-react";
import emptyCartLottie from "../../assets/lotties/emptyCart.json";
import { IoMdCloseCircle } from "react-icons/io";
import { useIsAr } from "../../hooks/useIsAr";
import { AnimatePresence, motion as Motion } from "motion/react";

function Orders() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getPreviousOrders,
  });

  const orderItems = selectedOrder?.order_details;
  if (!orders || ordersLoading) {
    return (
      <>
        <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center">
          <SectionLoader />
        </div>
      </>
    );
  }

  if (orders?.length == 0) {
    return (
      <>
        <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center">
          <div className="row justify-content-center align-items-center gap-1 m-0">
            <div className="noOrders col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
              <Lottie animationData={emptyCartLottie} loop={true} />
              <h4>{t("no orders yet")}</h4>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-10 text-center">
        <h2 className="tabTitle">{t("previous orders")}</h2>
        <div className="row justify-content-center align-items-center gap-1 m-0">
          {orders?.map((orderItem) => (
            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              key={orderItem?.id}
              className="orderCard p-2 col-xl-3 col-lg-4 col-md-5 col-sm-10 col-11"
            >
              <h4>
                {t("order id")} : {orderItem?.id}
              </h4>
              <hr />
              <h4>
                {t("subtotal")} : {orderItem?.sub_total} {t("L.E")}
              </h4>
              <hr />
              <h4>
                {t("total")} : {orderItem?.total} {t("L.E")}
              </h4>
              <hr />
              <button
                onClick={() => {
                  setSelectedOrder(orderItem);
                  setOpenOrderModal(true);
                }}
              >
                {t("order details")}
              </button>
            </Motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {openOrderModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="modalOverLay"
          >
            <div
              className="orderDetails p-2"
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              <span
                className="closeBtn"
                style={isAr ? { right: "0" } : { left: "0" }}
                onClick={() => setOpenOrderModal(false)}
              >
                <IoMdCloseCircle size={24} />
              </span>

              <div className="content py-3">
                <h5>
                  {t("order id")} : {selectedOrder?.id}
                </h5>
                <h5>
                  {t("order status")} : {selectedOrder?.status}
                </h5>
                <h5>
                  {t("payment status")} :{" "}
                  {selectedOrder?.payment_status
                    ? selectedOrder?.payment_status
                    : t("unpaid")}
                </h5>
                <h5>
                  {t("subtotal")} : {selectedOrder?.sub_total} {t("L.E")}
                </h5>
                <h5>
                  {t("shipping fees")} : {selectedOrder?.shipping_cost}{" "}
                  {t("L.E")}
                </h5>
                <h5>
                  {t("total")} : {selectedOrder?.total} {t("L.E")}
                </h5>
                <h5>
                  {t("shipping address")} :{" "}
                  {selectedOrder?.user_address?.state?.country?.name} -{" "}
                  {selectedOrder?.user_address?.state?.name} -{" "}
                  {selectedOrder?.user_address?.city?.name} -{" "}
                  {selectedOrder?.user_address?.address_one} -{" "}
                  {selectedOrder?.user_address?.address_two} -{" "}
                  {selectedOrder?.user_address?.district_name}
                </h5>
                <hr />
                <div className="orderedProducts">
                  <h4>{t("order items")} :</h4>
                  {orderItems?.map((item) => (
                    <div key={item?.id} className="orderedItem p-1">
                      <h5>{item?.product?.name}</h5>
                      <h5>
                        {item?.price} {t("L.E")} ({item?.quantity} {t("piece")})
                      </h5>
                      <h5>
                        {t("total")} : {item?.total_price} {t("L.E")}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Orders;
