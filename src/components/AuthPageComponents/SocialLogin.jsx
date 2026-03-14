import { useTranslation } from "react-i18next";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getGoogleAuthUrl, getAppleAuthUrl } from "../../services/api/auth";

function SocialLogin() {
  const [t] = useTranslation();

  const handleGoogle = async () => {
    const url = await getGoogleAuthUrl();
    window.location.href = url;
  };

  const handleApple = async () => {
    const url = await getAppleAuthUrl();
    window.location.href = url;
  };

  return (
    <>
      <div className="socialLogIn text-center">
        <h4>{t("sign in with")}</h4>
        <div className="socialBtns py-2">
          <button onClick={handleGoogle}>
            <FcGoogle size={40} />
          </button>
          <button onClick={handleApple}>
            <FaApple size={40} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SocialLogin;
