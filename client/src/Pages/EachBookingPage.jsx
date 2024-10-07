import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PhotoPopUp from "../Components/PhotoPopUp";
import PlaceGalleryComponent from "../Components/PlaceGalleryComponent";
import {format, differenceInCalendarDays} from 'date-fns'

const EachBookingPage = () => {
  const {id} = useParams();
  const [Booking, setBooking] = useState(null);
  const [showAllPhotos, setshowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get(`/account/bookings/${id}`,{withCredentials : true}).then(({data})=>{
        setBooking(data);
    })
  }, [id])
  
  if (showAllPhotos) {
    return <PhotoPopUp place={Booking.place} setshowAllPhotos={setshowAllPhotos} />
  }

  if (!Booking) {   // Show a loading state while the Booking data is being fetched
    return <div>Loading...</div>
  }

  return (

      <div>
      {/**Conditional Rendering */}
      { Booking.place.title && <h1 className="text-2xl sm:text-3xl font-medium  hover:underline hover:underline-offset-2">
          {Booking.place.title}
        </h1>}
      { Booking.place.title && <div className="text-lg py-2 font-medium text-gray-900">
          {Booking.place.address}
        </div>}
        <div className="bg-gray-100 rounded-xl p-4 my-2">
            <div className="text-lg py-2 font-semibold text-gray-900">Booking Details:</div>
            <div className="flex gap-1">
                From
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                <span className="font-bold">{ format(new Date(Booking.checkIn), "yyyy-MM-dd") }</span>
                &nbsp; to &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                <span className="font-bold"> { format(new Date(Booking.checkOut), "yyyy-MM-dd") } </span>
            </div>
            <div className="py-1">Total Price: $ <span className="font-bold">{Booking.price} for {differenceInCalendarDays(Booking.checkOut, Booking.checkIn)} night </span> </div> 

        </div>
      {Booking.place && Booking.place.photos  && <PlaceGalleryComponent place={Booking.place}  setshowAllPhotos={setshowAllPhotos} />}       {/**added checks to ensure Booking.place exists, Sometimes APIs return partial data, where Booking is set, but Booking.place isn't fully populated yet. This could lead to cases where Booking exists, but Booking.place is undefined. That's why the extra check is useful. */}
      <h2 className="text-xl sm:text-2xl pt-6 pb-2 font-medium text-gray-900">
            About this place
            </h2>
            <p className="pb-6 leading-relaxed text-base">
              {" "}
              {Booking.place && Booking.place.description}{" "}
            </p>
      </div>

  )
}

export default EachBookingPage
