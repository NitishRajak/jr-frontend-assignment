"use client";
import React from "react";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";

const AlbumDetails = () => {
  const [albumDetails, setAlbumDetails] = React.useState(null);
  //   const router = useRouter();
  //   const { albumId } = router.query;

  const fetchAlbumDetails = async () => {
    try {
      const response = await axios.get(
        `https://deezerdevs-deezer.p.rapidapi.com/album/103248`,

        {
          headers: {
            "X-RapidAPI-Key":
              "57a337c8bbmsh15317e7ea69496cp1227f9jsn08ca122110ec",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      const albumDetails = response.data;
      setAlbumDetails(albumDetails);
    } catch (error) {
      console.error("something went wrong:", error);
    }
  };

  React.useEffect(() => {
    fetchAlbumDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Album Details Page</h1>
      {albumDetails && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2">{albumDetails.title}</h2>
          <p className="mb-2">Artist: {albumDetails.artist.name}</p>
          <p className="mb-2">Release Date: {albumDetails.release_date}</p>
          <p className="mb-2">Label: {albumDetails.label}</p>
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
