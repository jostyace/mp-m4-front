import defaultAvatar from "./../../assets/avatar-default.svg";

const Info = ({ onEdit, data }) => {
  
  return (
    <div className="items-center flex flex-col">
      <div className="space-y-4">
        <h1 className="text-[#000000] text-4xl text-center font-normal">
          Personal info
        </h1>
        <p className="text-[#000000] text-lg text-center font-light">
          Basic info, like your name and photo
        </p>
      </div>
      <div className="flex flex-col mt-12 sm:border rounded-xl sm:w-5/6 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 ">
        <div className="flex items-center justify-between p-5 border-b">
          <div className="space-y-2 mx-5">
            <h1 className="text-[#000000] font-normal text-2xl">Profile</h1>
            <p className=" text-[#828282] font-normal max-w-[13rem] sm:max-w-none tracking-wide text-sm">
              Some info may be visible to other people
            </p>
          </div>
          <button
            onClick={onEdit}
            className="mx-5 border rounded-xl px-6 py-2 border-[#828282] text-[#828282] hover:bg-[#2F80ED] hover:border-[#2F80ED] hover:text-white transition duration-300"
          >
            Edit
          </button>
        </div>
        <div className="border-b py-3 p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            PHOTO
          </p>
          {data[0] && data[0].picture  ? (
            <img
              src={'http://localhost:3001/uploads/' + data[0].picture}
              alt="User Avatar"
              className="border w-[4.5rem] h-[4.5rem] rounded-lg"
            />
          ) : (
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className="border w-[4.5rem] h-[4.5rem] rounded-lg"
            />
          )}
        </div>
        <div className="border-b p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            NAME
          </p>
          <p className="">{data[0] && data[0].name}</p>
        </div>
        <div className="border-b p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            BIO
          </p>
          <p className="">{data[0] && data[0].bio}</p>
        </div>
        <div className="border-b p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            PHONE
          </p>
          <p className="">{data[0] && data[0].phone}</p>
        </div>
        <div className="border-b p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            EMAIL
          </p>
          <p className="">{data[0] && data[0].email}</p>
        </div>
        <div className="p-5 flex items-center">
          <p className="w-[250px] ml-5 text-[#8f8d8d] font-normal text-sm">
            PASSWORD
          </p>
          <p className="">{'*********'} </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
