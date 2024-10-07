import { useState } from "react";
import axios from "axios";

const PhotoUploader = ({addedPhotos , setaddedPhotos}) => {

  function uploadPhoto(event) {
    const fileList = event.target.files;
    console.log(fileList);

    if (fileList.length > 0) {
      const formData = new FormData();                   // Create FormData to send file to the server via an HTTP request.
      for (let i = 0; i < fileList.length; i++) {       // Loop over each selected file and append it to FormData
        formData.append("photos", fileList[i]);
      }

      try {                                             // Send the form data to the server
        axios
          .post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",    //used for file uploads req to servers
            },
          })
          .then((response) => {
            const { files: addedfiles } = response.data;
            setaddedPhotos((previousFiles) => {
              return [...previousFiles, ...addedfiles];
            });
            console.log("File uploaded successfully:", response.data);
          });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }

  function handleRemovePhoto ( removedPhoto ) {
    setaddedPhotos( addedPhotos.filter((photo)=>{
      return photo.filename !== removedPhoto.filename
    }) )
  }

  function handleSetAsCoverPhoto( starPhoto ) { 
    setaddedPhotos([ starPhoto , ...addedPhotos.filter((photo)=>{
      return photo.filename !== starPhoto.filename
    }) ] );

    // 2nd way:
    // const unselectedPhotos = addedPhotos.filter((photo)=>{ return photo.filename !== starPhoto.filename })
    // unselectedPhotos.unshift(starPhoto)
    // setaddedPhotos( unselectedPhotos  )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
      {addedPhotos.length > 0 && addedPhotos.map((photo) => {
          return (
            <div className="md:text-xl my-2 relative" key={photo.filename} >
              <img
                className="w-full h-32 rounded-2xl object-cover cursor-pointer"
                src={`http://localhost:8000/uploads/${photo.filename}`}
              />
              <button type="button" onClick={()=> handleRemovePhoto(photo)} className="absolute bottom-2 right-1.5 bg-black/50 p-2 rounded-full hover:bg-black/80 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>

              <button type="button" onClick={()=> handleSetAsCoverPhoto(photo)} className="absolute bottom-2 left-1.5 bg-black/50 p-2 rounded-full hover:bg-black/80 ">
                { photo.filename  == addedPhotos[0].filename ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                }
              </button>

            </div>
          );
        })}
      <label
        className="flex items-center justify-center border border-gray-200 w-48 h-32 rounded-2xl md:text-xl px-5 py-5 lg:px-10 lg:py-10 my-2 cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          name="placesPictures"
          onChange={uploadPhoto}
          multiple
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
        Upload
      </label>
    </div>
  );
};

export default PhotoUploader;
