//Helper functions kept seperate from components

//A map to make sure the same url isn't fetched twice and to keep StrictMode's effetcs from doubling the request
const cache = new Map();

//Fetch json and check res.status before calling res.json
export function fetchJson(url){
    if(cache.has(url)){
        return cache.get(url);
    }

    const promise = fetch(url).then((res) => {
        if(!res.ok){
            const error = new Error(`HTTP Error ${res.status}`);
            error.status = res.status;
            throw error;
        }
        return res.json();
    })

    cache.set(url,promise);
    promise.catch(() => cache.delete(url));
    return promise;
}

//Turns an error into a message the user can understand
export function errorMsg(error){
    if(error.status === 429){
        return "TV Maze is rate-limiting requests. Please try again later.";
    }
    if(error.status){
        return `TV Maze returned an error (${error.status}). Please try again later.`;
    }
    return "Could not reach TV Maze. Please check your internet connection and try again.";
}

//Shortens the text and adds ... if its shortened
export function shortenText(text, maxLength){
    return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;

}

//Uses textcontent to return plain text and DOMParser to read it before displaying it 
export function stripHTML(html){
    if(!html){
        return "";
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.body.textContent || "").trim();
}

//Changes the API's YYYY-MM-DD date into MM/DD/YYYY
//Returns a fallback if date is not available or in unexpected format
export function premierDate(date){
    if(!date){
        return "Not Available";
    }
    const [year, month, day] = date.split("-");
    if(!year || !month || !day){
        return "Not Available";
    }
    return `${month}/${day}/${year}`;
}

//Accounts for the miliseconds javascript uses since the "updated" value is in seconds
export function lastRecord(seconds){
    if(!seconds){
        return "Not Available";
    }
    return new Date(seconds * 1000).toLocaleString();
}

export function formatGenres(genres){
    return genres && genres.length ? genres.join(" , ") : "Not Available";
}

export function formatRating(rating){
    const average = rating && rating.average;
    return typeof average === "number" ? `${average} /10` : "Not Available";
}



