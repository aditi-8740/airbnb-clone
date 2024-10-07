const PhotoPopUp = ({place , setshowAllPhotos}) => {
    
        return (
          <div className="absolute bg-white w-full min-h-screen -mx-8">
            <nav className="fixed top-0 right-0 left-0 h-20 w-full p-4 bg-white z-10">
              <div
                className="inline-block p-3 cursor-pointer rounded-full hover:bg-gray-300/75 "
                onClick={() => setshowAllPhotos(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  color={"#000000"}
                  fill={"none"}
                >
                  <path
                    d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </nav>
    
            <div className="flex flex-col gap-4 my-32 w-4/6 mx-auto">
              {place.photos.length > 0 &&
                place.photos.map((photo) => (
                  <img
                    key={photo.filename}
                    className="w-full h-full"
                    alt="gallery"
                    src={`http://localhost:8000/uploads/${photo.filename}`}
                  />
                ))}
            </div>
          </div>
        );
}

export default PhotoPopUp
