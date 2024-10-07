import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotoUploader from "../Components/PhotoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [addInfo, setAddInfo] = useState("");
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [maxGuests, setmaxGuests] = useState(1);
  const [pricePerNight, setPricePerNight] = useState('');
  const [redirect , setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get('/places/'+id , { withCredentials: true }).then(({data})=>{
        setTitle(data.title)
        setAddress(data.address)
        setDescription(data.description)
        setaddedPhotos(data.photos)
        setPerks(data.perks)
        setAddInfo(data.extraInfo)
        setcheckIn(data.checkIn)
        setcheckOut(data.checkOut)
        setmaxGuests(data.maxGuests)
        setPricePerNight(data.pricePerNight)
      })
    }
  }, [id])
  
  const handleSavePlace = async (event) => {
    event.preventDefault();
    const data = {title, address, addedPhotos, description, perks, addInfo, checkIn, checkOut, maxGuests ,pricePerNight};
    if (id) {
      //update place
      try{
        await axios.put('/places/'+id, data , {
           withCredentials: true 
        })
        setRedirect(true);
  
      }catch{
        console.error('Error adding new place:', error);
      }
    }else{
      // add new place
      try{
        await axios.post('/places', data , {
           withCredentials: true 
        })
        setRedirect(true);
  
      }catch{
        console.error('Error adding new place:', error);
      }
    }
  };

  function formLabel(title, titleId , description) {
    return (
      <>
        <label htmlFor={`${titleId}-for-place`} className="xl:text-xl font-medium">{title}</label>
        {!!description && <span className="text-sm text-gray-400 ml-1.5">({description})</span>}
      </>
    )
  }

  if (redirect) {
    return <Navigate to='/account/places' replace={true} />
  }

  return (
    <div>
      <form onSubmit={handleSavePlace}>
        {formLabel("Title", "title")}
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="title, for example: Sanitized Room with Exotic View in Manali " id="title" />

        {formLabel("Address", "address")}
        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="address" id="address" />

        {formLabel(
          "Photos",
          "photos",
          "We recommend adding at least two photos of the place."
        )}
        <PhotoUploader
          addedPhotos={addedPhotos}
          setaddedPhotos={setaddedPhotos}
        />

        {formLabel("Description", "description")}
        <textarea name="description" id="description-for-place" rows="8" className="border border-gray-200 rounded-lg px-2 py-1 block w-full m-2 ml-0" value={description} onChange={(event) => setDescription(event.target.value)} />

        {formLabel("Select all the features your place offers.", "perks")}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2">
          <Perks perksUseState={perks} setPerksUseState={setPerks} />
        </div>

        {formLabel("Additional Information", "additional-info")}
        <textarea name="description" id="additional-info" rows="8" className="border border-gray-200 rounded-lg px-2 py-1 block w-full m-2 ml-0" value={addInfo} onChange={(event) => setAddInfo(event.target.value)} />

        {formLabel(
          "Details",
          "details",
          "add check in and check out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mt-1.5">
          <div>
            {formLabel("CheckIn time", "checkin")}
            <input type="text" placeholder="e.g. 12:00 pm " id="address" value={checkIn} onChange={(event) => setcheckIn(event.target.value)} />
          </div>
          <div>
            {formLabel("CheckOut time", "checkout")}
            <input type="text" placeholder="e.g. 10:00 am " id="checkout" value={checkOut} onChange={(event) => setcheckOut(event.target.value)} />
          </div>
          <div>
            {formLabel("Max number of Guests", "maxGuests")}
            <input className="w-full" type="number" placeholder="e.g. 2 " id="maxGuests" value={maxGuests} onChange={(event) => setmaxGuests(event.target.value)} />
          </div>
          <div>
            {formLabel("Price per night", "pricePerNight")}
            <input className="w-full" type="number" placeholder="e.g. 900 " id="pricePerNight" value={pricePerNight} onChange={(event) => setPricePerNight(event.target.value)} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary text-white w-32 my-4 mx-auto p-2 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesForm;
