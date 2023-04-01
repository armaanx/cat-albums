import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length <= 0) {
      setSearchResults([]);
    }
    if (searchTerm != "") {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&limit=5&format=json`
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
      <h1 className="p-5 text-2xl font-bold text-black">Cat Albums</h1>
      <div className="z-30">
        <input
          placeholder="Search Albums"
          type="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <ul>
          {searchResults.map((item) => {
            return (
              <li>
                {item.name} - {item.artist}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-[375px] w-[375px] z-20">
        <img
          className="absolute top-0 right-0 bottom-0 left-0 m-auto h-[375px] w-[375px]"
          src="/cat.png"
        />
      </div>
      <div className="h-[200px] w-[200px] z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png"
          className="absolute top-[165px] right-0 bottom-0 left-[10px] m-auto h-[200px] w-[200px]"
        />
      </div>
    </div>
  );
}
