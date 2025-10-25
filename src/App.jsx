import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userdata, setUserdata] = useState([]);
  const [index, setindex] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`
    );
    setUserdata(response.data);
  };

  useEffect(() => {
    getData();
  }, [index]);

  let printuserdata = (
    <h3 className="text-gray-400 text-sm text-center w-full mt-20 animate-pulse">
      Loading...
    </h3>
  );

  if (userdata.length > 0) {
    printuserdata = userdata.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a
            href={elem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="h-52 w-48 rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:shadow-amber-500/20 transition-all duration-300">
              <img
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                src={elem.download_url}
                alt=""
              />
              <h2 className="font-semibold text-white text-xs p-2 bg-black/60">
                {elem.author}
              </h2>
            </div>
          </a>
        </div>
      );
    });
  }

  return (
    <div className="overflow-auto bg-black p-6 min-h-screen text-white flex flex-col gap-10">
      <div className="flex flex-wrap gap-10 justify-center">
        {printuserdata}
      </div>

      <div className="flex justify-center items-center p-4 gap-6">
        <button
          onClick={() => {
            if (index > 1) {
              setindex(index - 1);
              setUserdata([]);
            }
          }}
          className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 
          ${
            index === 1
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-amber-500 text-black hover:bg-amber-400 active:scale-95"
          }`}
        >
          Prev
        </button>

        <h4 className="text-lg font-semibold">Page {index}</h4>

        <button
          onClick={() => {
            setindex(index + 1);
            setUserdata([]);
          }}
          className="px-5 py-2 rounded-lg font-semibold text-sm bg-amber-500 text-black hover:bg-amber-400 active:scale-95 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
