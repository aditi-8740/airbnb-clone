import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function IndexPage() {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setAllPlaces(data);
    });
  }, []);

  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 py-10 justify-evenly">
      {allPlaces.length > 0 && allPlaces.map((place) => {
          return (               
                   
                        <NavLink to={'/places/'+place._id} key={place._id}>
                      <div className="relative w-full h-48 ">
                        <img alt="place" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl "
                        src={place.photos[0]} />
                      </div>
                      <div className="mt-3">
                        <h3 className="text-gray-900 title-font text-lg font-medium truncate">{place.title}</h3>
                        <div className="text-gray-500 ">Stay with {place.owner.name}</div>
                        <p className="mt-1"><span className="font-semibold">$ {place.pricePerNight} </span>night</p>
                      </div>
                    </NavLink>                   
             
          );
        })}
    </section>
  );
}
