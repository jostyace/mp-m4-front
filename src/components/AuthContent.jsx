/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Info from "./Profile/Info";
import UpdateInfo from "./Profile/UpdateInfo";
import { request, setAuthHeader } from "../helpers/axios-helper.js";

const AuthContent = ({ logout, setActualScreen, userData }) => {
  const [data, setData] = useState(userData);
  const [edit, setEdit] = useState(false);

  
  useEffect(() => {
    request("GET", `/api/usuarios/${userData}`, {})
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthHeader(null);
        } else {
          setData(error.response.code);
        }
      });
  }, []);

  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="flex flex-col">
      <Navbar logout={logout} data={data} />
      <div className="flex flex-col mt-3">
        {edit ? (
          <UpdateInfo onEdit={onEdit} setActualScreen={setActualScreen} data={data} />
        ) : (
          <Info onEdit={onEdit} data={data} />
        )}
      </div>
    </div>
  );
};

export default AuthContent;
