import{useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Poster from "./Poster";
import { fetchJson, stripHTML, shortenText, premierDate, lastRecord, formatGenres, formatRating } from "./utils";

const max_cast = 5;

function ShowCard({show}){
    const [cast, setCast] = useState({status: "loading", names: [] });

    useEffect(() => {
        let ignore = false;
        

        fetchJson(`https://api.tvmaze.com/shows/${show.id}/cast`).then((data) => {
            if(ignore){
                return;
            }
            const names = data.map((c) => c.person?.name).filter(Boolean).slice(0, max_cast);
            setCast({status: "done", names});
        })
        .catch((err) => {
            if(ignore){
                return;
            }
            setCast({status: err.status === 429 ? "limited" : "error", names: []});
        });

        return () =>{
            ignore = true;
        };
    }, [show.id]);

    let castText = "Not Available";

    if(cast.status === "loading"){
        castText = "loading...";
    }else if(cast.status === "limited"){
        castText = "Unavailable (Rate Limited)";
    }else if(cast.names.length > 0){
        castText = cast.names.join(" , ");
    }
    
    const summary = stripHTML(show.summary);

    return(
        <article class = "show-card">
            <Poster show ={show}/>
            <div>
                <h2><Link to = {`/shows/${show.id}`}>{show.name || "Title Not Available"}</Link></h2>
                <p class = "show-card-summary">{summary ? shortenText(summary, 250) : "Summary Not Available"}</p>
                <dl>
                    <dt>Premiered</dt>
                    <dd>{premierDate(show.premiered)}</dd>
                    <dt>Updated</dt>
                    <dd>{lastRecord(show.updated)}</dd>
                    <dt>Genres</dt>
                    <dd>{formatGenres(show.genres)}</dd>
                    <dt>Rating</dt>
                    <dd>{formatRating(show.rating)}</dd>
                    <dt>Cast</dt>
                    <dd>{castText}</dd>
                </dl>
                <a href={show.url ||"https://www.tvmaze.com"} target = "_blank" rel = "noopener noreferrer">View On Tvmaze</a>
            </div>
        </article>

    );
}

export default ShowCard;