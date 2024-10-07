import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const BookingWidget = ({place}) => {
  const [checkIn , setCheckIn] = useState('')
  const [checkOut , setCheckOut] = useState('')
  const [numberOfGuests, setnumberOfGuests] = useState(1)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [redirect, setRedirect] = useState('')
  
  let noOfDays = 1;
  if(checkIn && checkIn){
    noOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn) )
  }

  function handleBookPlace() {
    axios.post('/bookings',{  //Create a Document
      place: place._id, checkIn, checkOut ,numberOfGuests , fullName, phoneNumber, price: place.pricePerNight * noOfDays
    },{ withCredentials: true }).then(({data})=>{
      setRedirect(true)
      const bookingId = data._id;
      setRedirect(`/account/bookings/${bookingId}`)
      console.log(data);

    })
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (

        <div className=" border border-gray-300 rounded-2xl shadow-xl mr-4 md:m-6 p-4 place-self-start ">
          <div className="font-semibold"><span className="text-xl sm:text-2xl"> $ { (isNaN(noOfDays) ? 1 : noOfDays ) * place.pricePerNight } </span> per night</div>
              
          <div className="border border-gray-300 rounded-2xl  my-4">
            <div className="grid lg:grid-cols-2">
              <div className="sm:border-b-2 lg:border-b-0 lg:border-r-2 lg:pr-2 p-4 ">
                <label htmlFor="checkin" className="font-semibold">CheckIn : </label>
                <input type="date" name="checkin" id="checkin" value={checkIn} onChange={(event)=> setCheckIn(event.target.value) } />  <br />
              </div>
              <div className="lg:pl-2 p-4 ">
                <label htmlFor="checkout" className="font-semibold">CheckOut :</label>
                <input type="date" name="checkout" id="checkout" value={checkOut} onChange={(event)=> setCheckOut(event.target.value) } />
              </div>
              </div>
            <div className="flex flex-col gap-1 border-t-2 p-4">
              <label htmlFor="maxGuests" className="font-semibold ">Number of Guests</label>
              <input type="number" name="maxGuests" id="maxGuests" className="w-full" placeholder="1" 
              value={numberOfGuests} 
              onChange={(event)=> setnumberOfGuests(event.target.value) } />
            </div>
              
            <div  className="flex flex-col gap-1 border-t-2 p-4" >
              <label htmlFor="fullname" className="font-semibold ">Full Name</label>  
                <input type="text" name="fullname" id="fullname" placeholder="e.g. Himani sharma"
                value={fullName} 
                onChange={(event)=> setFullName(event.target.value) } />
            </div>

            <div  className="flex flex-col gap-1 border-t-2 p-4" >
              <label htmlFor="phoneNumber" className="font-semibold ">Phone Number</label>  
                <input type="text" name="phoneNumber" id="phoneNumber"
                value={phoneNumber}
                onChange={(event)=> setPhoneNumber(event.target.value) } />
            </div>
            
        </div>

        <button type="button" className="button-primary"
        onClick={handleBookPlace}>
          Book this place</button>
        </div>
  )
}

export default BookingWidget
