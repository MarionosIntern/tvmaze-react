import { useState } from "react";

function SearchForm({initialTerm, onSearch, disabled}){
    const [text, setText] = useState(initialTerm);

    function handleSubmit(event){
        event.preventdefault();
        onSearch(text.trim());
    }
    
    return(
        <form id = "search-from" onSubmit ={handleSubmit}>
            <label id = "search-input">Search for a Show Title or keyword</label>
            <div>
                <input 
                id = "search-input" 
                type="text" 
                value ={text} 
                onChange={(event) => setText(event.target.value)}
                />
                <button id = "search-button" type = "submit"disabled={disabled}>Submit</button>
            </div>
        </form>
    );
}



export default SearchForm;