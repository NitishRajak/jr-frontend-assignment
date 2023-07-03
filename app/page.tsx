"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://deezerdevs-deezer.p.rapidapi.com/search",
          {
            headers: {
              "X-RapidAPI-Key":
                "57a337c8bbmsh15317e7ea69496cp1227f9jsn08ca122110ec",
              "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
            params: {
              q: "eminem",
            },
          }
        );
        setAlbums(response.data.data);
      } catch (error) {
        console.error("something went wrong:", error);
      }
    };

    fetchAlbums();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Music Sansar</h1>
      <p className="text-gray-600 mb-4">Sansar for music lovers</p>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />
      {albums && albums.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Link href={`/${album.album.id}`} key={album.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full"
                  src={album?.album?.cover}
                  alt={album?.album?.title}
                />
                <div className="p-4">
                  <p className="text-xl font-bold mb-2">
                    {album?.album?.title}
                  </p>
                  <p className="text-gray-600">{album?.artist?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No albums found.</p>
      )}
    </div>
  );
}
