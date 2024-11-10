import { NavLink } from "react-router-dom";

const PlacesCard = ({ placesList, setPlacesList }) => {
  return (
      <section className="text-gray-600 w-full ">
        {placesList.map((place) => {
          return (
            <NavLink  key={place._id} to={'/account/places/'+place._id} >
                <div className="flex bg-gray-200 rounded-3xl py-8 px-6 my-8 mx-auto" key={place._id}>
                <div className="mr-5 max-w-44 max-h-44 flex-grow shrink-0 ">
                  {place.photos.length > 0 && (
                    <img
                      src={place.photos[0]}
                      alt="places photos"
                      className="rounded-xl "
                    />
                  )}
                </div>

                <div className="flex-grow-0 shrink h-30 line-clamp-5">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                    {place.title}
                  </h2>
                  <p className="leading-relaxed">{place.description}</p>

                </div>
                </div>
            </NavLink>
    
          );
        })}
      </section>
  );
};

export default PlacesCard;