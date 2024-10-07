const PlaceGalleryComponent = ({ place , setshowAllPhotos}) => {

  return (
    <>
      <div className="flex relative">
        {/* Images Box */}
        <div className="flex w-full ">
          {/* Half Box */}
          <div className="p-1.5 w-full">
            {place.photos[0] && (
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block lg:rounded-l-xl md:rounded-r-none rounded-xl "
                src={`http://localhost:8000/uploads/${place.photos[0].filename}`}
              />
            )}
          </div>
        </div>
        <div className="md:flex md:flex-wrap w-1/2 hidden">
          {" "}
          {/* Half Box */}
          <div className="p-1.5 w-1/2">
            {place.photos[1] && (
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block "
                src={`http://localhost:8000/uploads/${place.photos[1].filename}`}
              />
            )}
          </div>
          <div className="p-1.5 w-1/2">
            {place.photos[2] && (
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block rounded-tr-xl"
                src={`http://localhost:8000/uploads/${place.photos[2].filename}`}
              />
            )}
          </div>
          <div className="p-1.5 w-1/2">
            {place.photos[3] && (
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block "
                src={`http://localhost:8000/uploads/${place.photos[3].filename}`}
              />
            )}
          </div>
          <div className="p-1.5 w-1/2">
            {place.photos[4] && (
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block rounded-br-xl"
                src={`http://localhost:8000/uploads/${place.photos[4].filename}`}
              />
            )}
          </div>
        </div>
        <button
          type="button"
          className="absolute bottom-8 right-8 bg-white md:flex gap-1 px-2.5 py-1 rounded-lg border border-black hover:bg-gray-50 hidden"
          onClick={() => setshowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color={"#000000"}
            fill={"none"}
          >
            <path
              d="M11.9959 18H12.0049"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.9998 18H18.0088"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.99981 18H6.00879"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9959 12H12.0049"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9998 6H12.0088"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.9998 12H18.0088"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.9998 6H18.0088"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.99981 12H6.00879"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.99981 6H6.00879"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Show all photos</span>
        </button>

        <button
          type="button"
          className="absolute bottom-48 right-5 md:hidden "
          onClick={() => setshowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={36}
            height={36}
            color={"#000000"}
            fill={"white"}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PlaceGalleryComponent;
