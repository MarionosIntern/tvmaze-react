import { useState } from "react";


function Poster({show}){
    const [failed, setFailed] = useState(false);
    const url = show.image && (show.image.medium || show.image.original);

    if(!url ||failed ){
        return <div class= "poster-fallback" >Image not Available</div>
    }
    return(
        <img src={url} 
        alt={`Poster for ${show.name}`}
        onError = {() => setFailed(true)}
        />
    );
}

export default Poster;