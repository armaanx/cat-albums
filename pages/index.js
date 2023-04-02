import { MdClear } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [imgsrc, setImgSrc] = useState("/select.png");
  useEffect(() => {
    if (searchTerm.length <= 1) {
      setSearchResults([]);
    }
    if (searchTerm != "") {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&limit=4&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results.albummatches.album);
        });
    }
  }, [searchTerm]);
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return (
    <div className="w-screen h-screen text-center flex flex-col items-centre justify-start">
      <Head>
        <title>Cat Albums</title>
      </Head>
      <h1 className="p-6 text-3xl font-bold text-black">Cat Albums</h1>
      <div className="z-30 text-center m-auto space-x-2 ">
        <input
          className="p-3 border-[3px] rounded-lg border-black z-30 align-middle"
          placeholder="Search Albums"
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          className="align-middle"
          onClick={() => {
            setSearchResults([]);
            setSearchTerm("");
          }}>
          <MdClear className="text-3xl align-middle" />
        </button>
        <ul className="z-30">
          {searchResults.map((item) => {
            return (
              <li
                onClick={() => {
                  setImgSrc(item.image[3]["#text"]);
                  setSearchResults([]);
                  setSearchTerm("");
                }}
                key={item.url}
                className="font-semibold border-2 border-black w-[300px] m-auto p-3 bg-white hover:bg-stone-200 rounded-md z-30">
                <div className="grid grid-flow-col grid-cols-3 items-center justify-center cursor-pointer z-30 ">
                  <img src={item.image[1]["#text"]} className="" />
                  <p>{item.name}</p>
                  <p>{item.artist}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-[375px] w-[375px] z-20">
        <img
          className="absolute top-[100px] right-0 bottom-0 left-0 m-auto h-[375px] w-[375px]"
          src="/cat.png"
        />
      </div>
      <div className="h-[200px] w-[200px] z-10">
        <img
          src={imgsrc}
          className="absolute top-[265px] right-0 bottom-0 left-[10px] m-auto h-[200px] w-[200px]"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 m-auto p-3 font-semibold">
        <span className="space-x-2">
          Made by{" "}
          <a
            className="text-blue-500 underline underline-offset-2"
            href="https://armaan.tech"
            target="_blank"
            rel="noopener noreferrer">
            Armaan
          </a>
          <FaHeart className="inline-block align-middle" />
        </span>
      </div>
    </div>
  );
}
