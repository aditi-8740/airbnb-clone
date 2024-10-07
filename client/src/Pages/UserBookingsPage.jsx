import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { format, differenceInCalendarDays } from 'date-fns'

const BookingsPage = () => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings", { withCredentials: true }).then(({ data }) => {
      setAllBookings(data);
    });
  }, []);

  return (
    <section className="text-gray-900 w-full ">
      {allBookings.length > 0 && allBookings.map((booking) => {
          return (
            <NavLink key={booking._id} to={"/account/bookings/" + booking._id}>
              <div className="flex bg-gray-200 rounded-3xl py-8 px-6 my-8 mx-auto">
                <div className="mr-5 max-w-44 max-h-44 flex-grow shrink-0 ">
                {booking.place.photos.length > 0 && (
                    <img
                      src={`http://localhost:8000/uploads/${booking.place.photos[0].filename}`}
                      alt="bookings photos"
                      className="rounded-xl"
                    />
                  )}
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 ">
                    {booking.place.title}
                  </h2>
                  <div className="border-t-2 border-gray-300 py-2">
                    <div className="flex gap-1">
                      From
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      <span className="font-bold">{ format(new Date(booking.checkIn), "yyyy-MM-dd") }</span>
                      &nbsp; to &nbsp;
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      <span className="font-bold"> { format(new Date(booking.checkOut), "yyyy-MM-dd") } </span>
                      </div>
                    <div>Total Price: $ <span className="font-bold">{booking.price} for {differenceInCalendarDays(booking.checkOut, booking.checkIn)} night </span> </div> 
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
    </section>
  );
};

export default BookingsPage;
