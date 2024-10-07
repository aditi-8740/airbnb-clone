import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PlacesCard from "../Components/PlacesCard";

const UserPlacesPage = () => {
  const [placesList, setPlacesList] = useState([]);
  useEffect(() => {
   axios.get('/user-places',{ withCredentials: true }).then(({data})=>{      //console.log(data);
    setPlacesList(data);
   })
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center gap-2 ">
          <div>my placespage</div>
          <NavLink
            to={"/account/places/add"}
            className="bg-primary text-white px-6 py-2 rounded-full w-30 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#ffffff"
              fill="none"
            >
              <path
                d="M12 4V20M20 12H4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Add new place</span>
          </NavLink>
          {/* list of all added places */}
          {placesList.length > 0 && <PlacesCard  placesList={placesList} setPlacesList={setPlacesList} />}
          
        </div>
        

      <Outlet />
    </>
  );
};

export default UserPlacesPage;
