import { useEffect, useState } from "react";
import { Routes , Route, Link } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import ShowDetail from "./ShowDetail";
import {fetchJson, errorMsg } from "./utils.js";

const default_term = "transformers";
const max_shows = 10;
function App() {
  
  const [searchTerm, setSearchTerm] = useState(default_term);
  const [attempt, setAttempt] = useState(0);
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() =>{
    if(!searchTerm){
      return;
    }

    let ignore = false;
  

    fetchJson(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`)
    .then((results) => {
      if(ignore){
        return;
      }
      setShows(results.map((r) => r.show).filter(Boolean).slice(0, max_shows));
      setStatus("success");
    })
    .catch((err) => {
      if(ignore){
        return;
      }
      setShows([]);
      setError(errorMsg(err));
      setStatus("error");
    });

    return() =>{
      ignore = true;
    };
  }, [searchTerm, attempt]);

  function handleSearch(term){
    setSearchTerm(term);
    setAttempt((n) => n+1);
    setShows([]);
    setStatus(term ? "loading" : "empty");
  }

  return (
    <>
      <div>
        <header class = "gallery-header">
          <h1>
            <Link to="/">TVmazw Show Gallery</Link>
          </h1>
        </header>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <GalleryPage
                  searchTerm={searchTerm}
                  shows={shows}
                  status={status}
                  error={error}
                  onSearch={handleSearch}
                />
              }
            />
            <Route path="/shows/:id" element ={<ShowDetail/>}/>
            <Route 
            path="*" 
            element={
              <p class = "status">
                Page Not Found. <Link to="/">Back to the Gallery</Link>
              </p>
            }
           />
          </Routes>
        </main>

        <footer>
          <p>
            All data is provided {" "}
            <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer">TVmaze.com</a>
          </p>
          <p>
            Licensed under {" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC-BY-SA</a>
          </p>
        </footer>
      </div>
   </>
  );
}

export default App
