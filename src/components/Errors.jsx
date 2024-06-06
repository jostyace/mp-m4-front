/* eslint-disable react/prop-types */
const Errors = ({ error, setActualScreen, isRegister }) => {

  const handleButtonClick = () => {
    setActualScreen("loginScreen")
  }
 
    if(isRegister == true) {
      return (
        <div className="flex items-center justify-center  bg-zinc-700 h-screen bg-opacity-20">
      <div className="bg-red-100  border-l-4 border-green-500 w-[500px] text-green-700 p-9">
        <div className="flex flex-col  ">
          <div>
            <p className="text-xl font-bold mb-3">Registered Successfully</p>
              <p className="text-base">
                
                Now you can Login
              </p>
          </div>
          <button onClick={handleButtonClick} className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  );
    }
    else{
      
        return (
          <div className="flex items-center justify-center  bg-zinc-700 h-screen bg-opacity-20">
        <div className="bg-red-100  border-l-4 border-red-500 w-[500px] text-red-700 p-9">
          <div className="flex flex-col  ">
            <div>
              <p className="text-xl font-bold mb-3">An error occurred</p>
              {error.response && (
                <p className="text-base">
                  
                  {error.response.data.message}
                </p>
              )}
            </div>
            <button onClick={handleButtonClick} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  
    }

    
};

export default Errors;
