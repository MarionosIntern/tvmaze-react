import { useEffect, useState } from "react";
import { Routes , Route, Link } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import ShowDetail from "./ShowDetail";
import {fetchJson, errorMessage } from "./utils.js";

const default_term = "transformers";
const max_shows = 10;
function App() {
  
  const [searchTerm, setSearchAttempt] = useState[default_term];
  const [attempt, setAttempt] = useState(0);
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() =>{
    if(!searchTerm){
      setShows([]);
      setStatus("empty");
      return;
    }
  })

  return (
    <>
  
      
    </>
  )
}

export default App
