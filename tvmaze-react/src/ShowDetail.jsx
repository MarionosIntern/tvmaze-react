import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Poster from "./Poster";
import CastList from "./CastList";
import { fetchJson, errorMsg, stripHTML, premierDate, lastRecord, formatGenres, formatRating } from "./utils";

const max_cast = 15;

function ShowDetail(){
    const {id} = useParams();
    const validId = /^\d+$/.test(id);

    
    const[showResult, setShowResult] = useState(null);
    const[castResult, setCastResult] = useState(null);

    // Load the show
    useEffect(() => {
        if(!validId){
            return;
        }
        let ignore = false;

        fetchJson(`https://api.tvmaze.com/shows/${id}`).then((data) =>{
            if(!ignore){
                setShowResult({id, show:data});
            }
    
        })
        .catch((err) => {
            if(ignore){
                return;
            }
            const message = err.status === 404 ? "We couldn't find a show with that id." : errorMsg(err);
            setShowResult({id, error:message});
        });

        return() =>{
            ignore = true;
        };
    }, [id, validId]);

    //Load the cast seperately
    useEffect(() => {
        if(!validId){
            return;
        }
        let ignore =  false;
       
        fetchJson(`https://api.tvmaze.com/shows/${id}/cast`).then((data) =>{
            if(!ignore){
                setCastResult({id, status: "done", cast: data.filter((c) => c.person).slice(0, max_cast)});
            }
          
        })
        .catch((err) => {
            if(ignore){
                setCastResult({id, status: err.status === 429 ? "limited" : "error", cast: []});
            }
        });

        return() =>{
            ignore = true;
        };
    }, [id, validId]);

    const showLoading = !showResult || showResult.id !== id;
    const castStatus = castResult && castResult.id === id ? castResult.status : "loading";
    const cast = castResult && castResult.id === id ? castResult.cast : [];
    const bLink = <Link to = "/">Back to Gallery</Link>;

    if(!validId){
        return <p class = "status-error">"{id}"is not a valid show ID. {bLink}</p>;
    }
    if(showLoading){
        return <p class = "status">Loading Show...</p>;
    }
    if(showResult.error){
        return <p class = "status-error">{showResult.error} {bLink}</p>;
    }

    const show = showResult.show;
    const summary = stripHTML(show.summary);


    return(
        <article class = "detail">
            <p>{bLink}</p>
            <div class = "detail-top">
                <Poster show = {show}/>
                <div>
                    <h2>{show.name || "Title Not Available"}</h2>
                    <p>{summary || "Summary Not Available"}</p>
                    <dl>
                        <dt>Premiered</dt>
                        <dd>{premierDate(show.premiered)}</dd>
                        <dt>Updated</dt>
                        <dd>{lastRecord(show.updated)}</dd>
                        <dt>Genres</dt>
                        <dd>{formatGenres(show.genres)}</dd>
                        <dt>Rating</dt>
                        <dd>{formatRating(show.rating)}</dd>
                        <dt>Status</dt>
                        <dd>{show.status || "Not Available"}</dd>
                        <dt>Network</dt>
                        <dd>{show.network?.name || show.webChannel?.name || "Not Available"}</dd>
                    </dl>
                    <a href={show.url || "https://www.tvmaze.com"} target = "_blank" rel = "noopener noreferrer">View on TVmaze</a>
                </div>
            </div>
            <h3>Cast</h3>
            <CastList status = {castStatus} cast = {cast}/>
        </article>
    );
}

export default ShowDetail;