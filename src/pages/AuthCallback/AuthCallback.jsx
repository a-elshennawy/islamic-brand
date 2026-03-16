import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loaders/Loader";
import { useTranslation } from "react-i18next";

function AuthCallback() {
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();
  const [t] = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = JSON.parse(params.get("user"));

    if (token && user) {
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      updateUser(user);
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [navigate, updateUser]);

  return (
    <>
      <title>{t("authCallback_page_title")}</title>
      <Loader />
    </>
  );
}

export default AuthCallback;
