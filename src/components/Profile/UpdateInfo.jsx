/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BiChevronLeft, BiSolidCamera } from "react-icons/bi";
import defaultAvatar from "./../../assets/avatar-default.svg";
import { request } from "../../helpers/axios-helper.js";

const UpdateInfo = ({ onEdit, setActualScreen, data }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: data[0]?.name || "",
    bio: data[0]?.bio || "",
    phone: data[0]?.phone || "",
    email: data[0]?.email || "",
    password: ""
  });

  const imageUrl = `data:image/jpeg;base64, ${data[0]?.imageData}`;

  useEffect(() => {
    if (data[0]?.image && !file) {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const newFile = new File([blob], "image.jpg", { type: "image/jpeg" });
          setFile(newFile);
        })
        .catch((error) => {
          console.error("Error fetching and creating File:", error);
        });
    }
  }, [data, file, imageUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_data");
    const formDataToSend = new FormData();

    if (file) formDataToSend.append("picture", file);
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    request("PATCH", `/api/usuarios/${userId}`, formDataToSend)
      .then((response) => {
        console.log(response);
        setActualScreen("authScreen");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setActualScreen("errorScreen");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="items-center flex justify-center">
      <div className="flex flex-col sm:w-5/6 w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
        <button
          onClick={onEdit}
          className="flex flex-row mb-5 items-center text-lg text-[#2D9CDB] w-20"
        >
          <BiChevronLeft size={23} />
          <p>Back</p>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="border rounded-xl">
            <div className="flex items-center justify-between p-5 pt-6">
              <div className="space-y-2 ml-10">
                <h1 className="text-[#000000] font-normal text-2xl">
                  Change Info
                </h1>
                <p className="text-[#828282] font-normal sm:max-w-none text-sm">
                  Changes will be reflected to every services
                </p>
              </div>
            </div>
            <div className="py-3 p-5 flex items-center">
              <div className="relative ml-10">
                {data[0].image ? (
                  <img
                    src={imageUrl}
                    alt="User Avatar"
                    className="border w-[4.5rem] h-[4.5rem] rounded-lg"
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="User Avatar"
                    className="border md:w-[4.5rem] md:h-[4.5rem] rounded-lg"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BiSolidCamera size={24} className="text-[#FFFFFF]" />
                </div>
              </div>
              <label
                className="ml-5 text-[#8f8d8d] font-normal w-36 text-sm hover:cursor-pointer"
                htmlFor="fileInput"
              >
                <input
                  name="picture"
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className="p-5 py-2 ml-10 flex flex-col space-y-1">
              <p className="text-[#4F4F4F] font-normal text-sm">Name</p>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="text-sm border rounded-xl md:w-96 p-3 pl-4 border-[#828282]"
                placeholder="Enter your name..."
              />
            </div>
            <div className="p-5 py-2 ml-10 flex flex-col space-y-1">
              <p className="text-[#4F4F4F] font-normal text-sm">Bio</p>
              <input
                name="bio"
                type="text"
                value={formData.bio}
                onChange={handleInputChange}
                className="text-sm border rounded-xl md:w-96 p-3 pl-4 pb-16 border-[#828282]"
                placeholder="Enter your bio..."
              />
            </div>
            <div className="p-5 py-2 ml-10 flex flex-col space-y-1">
              <p className="text-[#4F4F4F] font-normal text-sm">Phone</p>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                className="text-sm border rounded-xl md:w-96 p-3 pl-4 border-[#828282]"
                placeholder="Enter your phone..."
              />
            </div>
            <div className="p-5 py-2 ml-10 flex flex-col space-y-1">
              <p className="text-[#4F4F4F] font-normal text-sm">Email</p>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="text-sm border rounded-xl md:w-96 p-3 pl-4 border-[#828282]"
                placeholder="Haven't implemented Changing Email yet"
              />
            </div>
            <div className="p-5 py-2 ml-10 flex flex-col space-y-1">
              <p className="text-[#4F4F4F] font-normal text-sm">Password</p>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="text-sm border rounded-xl md:w-96 p-3 pl-4 border-[#828282]"
                placeholder="Enter your new password"
              />
            </div>
            <div className="ml-10 px-5 pt-3 pb-10">
              <button
                type="submit"
                className="border rounded-xl px-6 py-2 bg-[#2F80ED] text-white transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;
