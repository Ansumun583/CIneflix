import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// useState for short term vairiables. They will empty on refresh

function Row({ title, fetchUrl, isLargeRow }) {
  // short term holder for movies to populate
  const [movies, setMovies] = useState([]);

  // each time the row is loaded this is called to fill the rows with movies from the fetchUrl.

  useEffect(() => {
    // in order to use async inside of useEffect you need to make it a function.
    async function fetchData() {
      
      const request = await axios.get(fetchUrl);
     
      setMovies(request.data.results);
     
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = (movie) => {
    if (trailerUrl)
    {
         setTrailerUrl('');
    } 
    else {
      console.log(movie.name);
      movieTrailer(movie?.title || movie?.name || movie?.source)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
          console.log("the url for the trailer is " + trailerUrl);
        })
        .catch((error) => console.log(error));


      console.log(trailerUrl);
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 2,
    },
  };

  return (
    <div className="row">
      <h2> {title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
           
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div className="row_video_player">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;