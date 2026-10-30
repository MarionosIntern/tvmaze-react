import SearchForm from "./SearchForm";
import ResultsSummary from "./ResultsSummary";
import ShowList from "./ShowList";

//Renders only one of these messages at a timeS
function GalleryPage({searchTerm, shows, status, error, onSearch}){
    return(
        <>
            <SearchForm initialTerm={searchTerm} onSearch={onSearch} disabled={status === "loading"}/>

            {status === "loading" && <p class = "status" role ="status">Searching for "{searchTerm}"...</p>}
            {status === "error" && <p class = "status-error" role = "alert">{error}</p>}
            {status === "empty" && <p class = "status">Enter a show title or keyword.</p>}
            {status === "success" && shows.length === 0 && (<p class = "status">No shows found for "{searchTerm}". Try another title or keyword.</p>)}
            {status === "success" && shows.length > 0 && (
                <>
                    <ResultsSummary count = {shows.length} term = {searchTerm}/>
                    <ShowList shows = {shows}/>
                </>
            )}
        </>
    );
}


export default GalleryPage;


