/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "../../assets/devchallenges.svg";
import SignIn from "./SignIn";
import SignUp from "./SingUp";
import Socials from "./Socials";

const AuthComponent = ({ active, setActive, onLogin, onRegister }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    onLogin: onLogin,
    onRegister: onRegister,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmitLogin = (e) => {
    state.onLogin(e, email, password);
  };

  const onSubmitRegister = (e) => {
    state.onRegister(e, email, password);
  };

  return (
    <div className="flex justify-center sm:items-center h-screen">
      <div className="w-max sm:border border-[#BDBDBD] rounded-3xl sm:px-10 sm:py-8">
        <img src={logo} alt="logo" className="mb-4 mt-5 sm:mt-0" />
        <SignIn
          active={active}
          onSubmitLogin={onSubmitLogin}
          onChangeHandler={onChangeHandler}
        />
        <SignUp
          active={active}
          onSubmitRegister={onSubmitRegister}
          onChangeHandler={onChangeHandler}
        />
        <Socials active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default AuthComponent;
