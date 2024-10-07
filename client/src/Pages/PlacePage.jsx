import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerkWidget from "../Components/PerkWidget";
import BookingWidget from "../Components/BookingWidget";
import PlaceGalleryComponent from "../Components/PlaceGalleryComponent";
import PhotoPopUp from "../Components/PhotoPopUp";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setshowAllPhotos] = useState(false);

  useEffect(() => {
    axios
      .get("/places/" + id)
      .then(({ data }) => {
        setPlace(data);
      })
      .catch((err) => {
        console.log("error in fetching place data", err);
      });
  }, [id]);

  if (!place) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  if (showAllPhotos) {
    return <PhotoPopUp place={place} setshowAllPhotos={setshowAllPhotos} />
  }

  return (
    <section>
      <div className="container px-2 lg:px-5 py-5 sm:py-10 ">
        { place && place.title && <h1 className="text-2xl sm:text-3xl font-medium pb-4 hover:underline hover:underline-offset-2">
          {place.title}
        </h1>}
        { place && place.photos && <PlaceGalleryComponent place={place} setshowAllPhotos={setshowAllPhotos} />}

        <h2 className="text-xl sm:text-2xl py-4 font-medium text-gray-900">
          {" "}
          {place.address}{" "}
        </h2>
        <div className="flex flex-col pt-4 pb-6">
          <span className=" font-medium text-gray-900">
            Stay with {place.owner && place.owner.name}
          </span>
          <span className="text-sm text-gray-500">Your Host</span>
        </div>
        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-xl sm:text-2xl pt-6 pb-2 font-medium text-gray-900">
            About this place
            </h2>
            <p className="pb-6 leading-relaxed text-base">
              {" "}
              {place.description}{" "}
            </p>
            <hr />
            <div className="pb-6">
      <h2 className="text-xl sm:text-2xl pt-6 font-medium text-gray-900">
        What this place offers
      </h2>
      <PerkWidget />
            
      <div>
      <h2 className="text-xl sm:text-2xl font-medium pt-4 pb-2">Details : </h2>
      <div> <span className="font-semibold"> Check in time : </span>{place.checkIn} </div>
      <div> <span className="font-semibold"> Check out time : </span>{place.checkOut} </div>
      <div> <span className="font-semibold"> Maximum Guests : </span>{place.maxGuests} </div>
      </div>

      </div>
          </div>
      
      <BookingWidget place={place} />

        </div>
        

     

      </div>
      
    </section>
  );
};

export default PlacePage;