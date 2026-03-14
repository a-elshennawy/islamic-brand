import "./Profile.css";
import { getUser } from "../../services/api/user";
import { useQuery } from "@tanstack/react-query";
import SideBar from "../../components/ProfilePageComponents/SideBar";
import { useState } from "react";
import Wishlist from "../../components/ProfilePageComponents/Wishlist";
import Orders from "../../components/ProfilePageComponents/Orders";
import { useIsAr } from "../../hooks/useIsAr";
import SectionLoader from "../../components/Loaders/SectionLoader";

function Profile() {
  const isAr = useIsAr();
  const [currentTab, setCurrentTab] = useState("wishlist");
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return (
      <>
        <div className="profilePage row justify-content-center align-items-start gap-2 m-0">
          <SectionLoader />
        </div>
      </>
    );
  }
  return (
    <>
      <section
        className="profilePage row justify-content-center align-items-start gap-2 m-0"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <SideBar user={user} currentTab={currentTab} onChange={setCurrentTab} />
        {currentTab === "wishlist" ? <Wishlist /> : <Orders />}
      </section>
    </>
  );
}

export default Profile;
