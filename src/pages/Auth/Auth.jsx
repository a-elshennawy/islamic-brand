import "./Auth.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { FaEyeSlash, FaEye, FaApple } from "react-icons/fa";
import { useIsAr } from "../../hooks/useIsAr";
import useMobile from "../../hooks/useMobile";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import BtnSpinner from "../../components/Loaders/BtnSpinner";

function Auth() {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const { isMobile } = useMobile();

  const [currForm, setCurrForm] = useState("signUp");
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useAuthContext();
  const { mutate: handleRegister, isPending: isRegistering } = useRegister();
  const { mutate: handleLogin, isPending: isLoggingIn } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    whatsapp: "",
  });

  const isSignUp = currForm === "signUp";
  const isPending = isLoggingIn || isRegistering;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.password_confirmation) {
        return;
      }

      handleRegister(formData, {
        onSuccess: () => {
          setCurrForm("login");

          setFormData({
            ...formData,
            password: "",
            password_confirmation: "",
          });
        },
      });
    } else {
      // login
      handleLogin(
        {
          phone: formData.phone,
          password: formData.password,
        },
        {
          onSuccess: (response) => {
            try {
              if (!response || !response.token) {
                console.error("Token missing in response");
                return;
              }

              localStorage.setItem("userId", response.user.id.toString());
              localStorage.setItem("userToken", response.token);
              localStorage.setItem("userData", JSON.stringify(response.user));

              updateUser(response.user);
              navigate("/");
            } catch (err) {
              console.error("CRASH INSIDE ONSUCCESS:", err);
            }
          },
          onError: (err) => {
            console.error("MUTATION ERROR:", err);
          },
        },
      );
    }
  };

  const switchForm = () => {
    setCurrForm(isSignUp ? "login" : "signUp");
    setFormData({
      ...formData,
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <>
      {isSignUp ? (
        <title>{`${t("brand_name")} | ${t("sign up")} `}</title>
      ) : (
        <title>{`${t("brand_name")} | ${t("log in")} `}</title>
      )}

      <section className="authPage">
        <AnimatePresence mode="wait">
          <Motion.form
            key={currForm}
            initial={{ opacity: 0, x: currForm === "signUp" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currForm === "signUp" ? -100 : 100 }}
            transition={{ duration: 0.3 }}
            className="logForm"
            style={isMobile ? { width: "80%" } : {}}
            onSubmit={handleSubmit}
          >
            <Motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isSignUp ? t("sign up") : t("log in")}
            </Motion.h2>
            <AnimatePresence mode="wait">
              {isSignUp && (
                <>
                  <Motion.div
                    className="inputContainer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label htmlFor="name">{t("name")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Motion.div>

                  <Motion.div
                    className="inputContainer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label htmlFor="email">{t("email")}</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Motion.div>

                  <Motion.div
                    className="inputContainer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="whatsapp">{t("whatsApp")}</label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required={isSignUp}
                    />
                  </Motion.div>
                </>
              )}
            </AnimatePresence>

            <Motion.div
              className="inputContainer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="phone">{t("phone")}</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required={isSignUp}
              />
            </Motion.div>

            <Motion.div
              className="inputContainer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="password">{t("password")}</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="showPassBtn"
                onClick={() => setShowPassword(!showPassword)}
                style={isAr ? { right: ".313rem" } : { left: ".313rem" }}
              >
                {showPassword ? (
                  <>
                    <FaEye />
                  </>
                ) : (
                  <>
                    <FaEyeSlash />
                  </>
                )}
              </span>
            </Motion.div>

            <AnimatePresence mode="wait">
              {isSignUp && (
                <Motion.div
                  className="inputContainer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="password_confirmation">
                    {t("confirm password")}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required={isSignUp}
                  />
                  <span
                    className="showPassBtn"
                    onClick={() => setShowPassword(!showPassword)}
                    style={isAr ? { right: ".313rem" } : { left: ".313rem" }}
                  >
                    {showPassword ? (
                      <>
                        <FaEye />
                      </>
                    ) : (
                      <>
                        <FaEyeSlash />
                      </>
                    )}
                  </span>
                </Motion.div>
              )}
            </AnimatePresence>

            <Motion.button
              type="submit"
              className="submitBtn my-2"
              disabled={isPending}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {isPending ? (
                <BtnSpinner color="var(--white)" size={18} />
              ) : isSignUp ? (
                t("register")
              ) : (
                t("log in")
              )}
            </Motion.button>

            {/* switch form */}
            <Motion.p
              className="my-2 mx-auto p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={switchForm}
              style={{ cursor: "pointer" }}
            >
              {isSignUp
                ? t("Already have an account?")
                : t("Don't have an account?")}
            </Motion.p>
          </Motion.form>
        </AnimatePresence>

        {/* <div className="socialLogIn text-center">
          <h4>{t("sign in with")}</h4>
          <div className="socialBtns py-2">
            <button>
              <FcGoogle size={45} />
            </button>
            <button>
              <FaApple size={45} />
            </button>
          </div>
        </div>*/}
      </section>
    </>
  );
}

export default Auth;
