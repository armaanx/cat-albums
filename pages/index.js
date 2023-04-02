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
      <h1 className="p-6 text-2xl font-bold text-black">Cat Albums</h1>
      <div className="z-30 text-center m-auto space-x-2">
        <input
          className="p-3 border-[3px] rounded-lg border-black"
          placeholder="Search Albums"
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            setSearchResults([]);
            setSearchTerm("");
          }}>
          Clear
        </button>
        <ul className="">
          {searchResults.map((item) => {
            return (
              <li
                onClick={() => {
                  setImgSrc(item.image[3]["#text"]);
                  setSearchResults([]);
                  setSearchTerm("");
                }}
                key={item.url}
                className="font-semibold border-2 border-black w-[300px] m-auto p-3 bg-white hover:bg-stone-200 rounded-md">
                <div className="grid grid-flow-col grid-cols-3 items-center justify-center cursor-pointer ">
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
    </div>
  );
}
