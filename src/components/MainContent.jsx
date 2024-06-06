import { useEffect, useState } from "react";
import Errors from "./Errors";
import AuthComponent from "./Auth/AuthComponent";
import AuthContent from "./AuthContent";
import { request, setAuthHeader } from "../helpers/axios-helper";


const MainContent = ({setUserData, userData}) => {
    const [actualScreen, setActualScreen] = useState("loginScreen");
    const [error, setError] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [active, setActive] = useState("loginScreen");
  
    useEffect(() => {
      const auth_token = localStorage.getItem("auth_token");
      if (auth_token !== null && auth_token !== "null") {
        setActualScreen("authScreen");
      }
      const user_data = localStorage.getItem("user_data");
      if (user_data !== null && user_data !== "null") {
        setUserData(user_data);
      }
    }, [actualScreen]);
  
    const logout = () => {
      setActualScreen("loginScreen");
      setAuthHeader(null);
      setUserData(null);
      setIsRegister(false)
    };
  
    const onLogin = (e, email, password) => {
      e.preventDefault();
      request("POST", "/api/entrar", {
        email: email,
        password: password,
      })
        .then((response) => {
          setAuthHeader(response.data.token);
          setActive("loginScreen");
          setIsRegister(false)
          setActualScreen("authScreen");
          setUserData(response.data.userId);
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("user_data", response.data.userId);
        })
        .catch((error) => {
          setAuthHeader(null);
          setActualScreen("errorScreen");
          setIsRegister(false)
          setError(error);
          setUserData(null);
          localStorage.setItem("auth_token", null);
          localStorage.setItem("user_data", null);
        });
    };
  
    const onRegister = (e, email, password) => {
      e.preventDefault();
      request("POST", "/api/registrar", {
        "email": email,
        "password": password,
      })
        .then((response) => {
          setAuthHeader(null);
          setUserData(null);
          setIsRegister(true);
          localStorage.setItem("auth_token", null);
          localStorage.setItem("user_data", null);
          setError("Usuario Creado Correctamente, ahora puede iniciar sesion")
          setActualScreen("errorScreen")
        })
        .catch((error) => {
          setAuthHeader(null);
          setActualScreen("errorScreen");
          setError(error);
          setIsRegister(false)
          setUserData(null);
          localStorage.setItem("auth_token", null);
          localStorage.setItem("user_data", null);
        });
    };
  
    
    return (
      <>
        {actualScreen === "loginScreen" && (
          <AuthComponent onLogin={onLogin} onRegister={onRegister} active={active} setActive={setActive} />
        )}
        {actualScreen === "authScreen" && <AuthContent setActualScreen={setActualScreen} userData={userData} logout={logout} />}
        {actualScreen === "errorScreen" && <Errors setActualScreen={setActualScreen} error={error} isRegister={isRegister} />}
      </>
    );
  };
  
  export default MainContent;
  