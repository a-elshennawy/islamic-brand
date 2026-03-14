import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loaders/Loader";

function AuthCallback() {
  const navigate = useNavigate();
  const { updateUser } = useAuthContext();

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
      <Loader />
    </>
  );
}

export default AuthCallback;
