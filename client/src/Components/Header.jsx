import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <header className=" py-4 flex justify-between items-center">
        <NavLink to={"/"} className="flex items-center gap-1 font-bold ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="rgb(255,56,92)" className="size-6 rotate-90">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

          <span className="lg:text-xl">airbnb</span>
        </NavLink>

        <div className="flex justify-evenly items-center border border-gray-300 rounded-full py-2 shadow-md w-6/12 ">
          <div className="flex flex-col border-r border-r-gray-300 px-1 sm:px-2 lg:px-6">
            <span className="font-medium leading-3 sm:leading-4 text-center text-xs sm:text-sm md:text-base">Where</span>
            <span className="text-gray-500 text-sm hidden xl:block">Search destinations</span>
          </div>
          <div className="flex flex-col border-r border-r-gray-300 px-1 sm:px-2 lg:px-6">
            <span className="font-medium leading-3 sm:leading-4 text-center text-xs sm:text-sm md:text-base ">Check in</span>
            <span className="text-gray-500 text-sm  hidden xl:block">Add dates</span>
          </div>
          <div className="flex flex-col border-r border-r-gray-300 px-1 sm:px-2 lg:px-6">
            <span className="font-medium leading-3 sm:leading-4 text-center text-xs sm:text-sm md:text-base">Check out</span>
            <span className="text-gray-500 text-sm  hidden xl:block">Add dates</span>
          </div>

          <div className="flex flex-col px-1 sm:px-2 lg:px-6">
            <span className="font-medium leading-3 sm:leading-4 text-center text-xs sm:text-sm md:text-base">Who</span>
            <span className="text-gray-500 text-sm  hidden xl:block">Add guests</span>
          </div>

          <button type="button" className="bg-primary rounded-full p-1 sm:p-2 hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              color="#ffffff"
              fill="none"
            >
              <path
                d="M17.5 17.5L22 22"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div>
          <NavLink
            to={user ? "/account/myprofile" : "/login"}
            className="flex gap-1 sm:gap-2 items-center border border-gray-300 rounded-full p-1 sm:px-2 sm:py-2 shadow-md "
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 sm:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>

            <div className="bg-gray-600 rounded-full p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-4 sm:size-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="hidden md:block">
            {!!user && <div>{(user.name).split(" ")[0]}</div>}
            </div>
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
