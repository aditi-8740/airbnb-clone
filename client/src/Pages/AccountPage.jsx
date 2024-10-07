import { useContext } from "react";
import { UserContext } from "../UserContext";
import { NavLink, Outlet } from "react-router-dom";

function AccountPage() {
  const { user,  ready } = useContext(UserContext);

  if (!user) {
    return "Loading...";
  }

  if (ready && !user) {
    return <NavLink to={"/login"} />;
  }

  return (
    <>
      <nav className="flex items-center justify-center gap-5 m-5">
        <NavLink
          to={"/account/myprofile"}
          className={({ isActive }) => {
            return isActive
              ? "px-5 py-2 bg-primary text-white rounded-full flex  gap-1.5"
              : "px-5 py-2 bg-gray-200 text-black rounded-full flex gap-1.5";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={"/account/bookings"}
          className={({ isActive }) => {
            return isActive
              ? "px-5 py-2 bg-primary text-white rounded-full flex  gap-1.5"
              : "px-5 py-2 bg-gray-200 text-black rounded-full flex gap-1.5";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M8 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 5H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19H4.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>My bookings</span>
        </NavLink>

        <NavLink
          to={"/account/places"}
          className={({ isActive }) => {
            return isActive
              ? "px-5 py-2 bg-primary text-white rounded-full flex gap-1.5"
              : "px-5 py-2 bg-gray-200 text-black rounded-full flex gap-1.5";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M13 2L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3V22H7C5.11438 22 4.17157 22 3.58579 21.4142C3 20.8284 3 19.8856 3 18V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 7L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 21.9997H17C18.8856 21.9997 19.8284 21.9997 20.4142 21.4139C21 20.8281 21 19.8853 21 17.9997V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 10L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 11H8M7 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 22V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>My accomodations</span>
        </NavLink>

      </nav>

      <Outlet/>

    </>
  );
}

export default AccountPage;
