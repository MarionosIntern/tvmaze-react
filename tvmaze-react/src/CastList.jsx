function CastList({status, cast}){
    if(status === "loading"){
        return <p>Loading cast..</p>;
    }
    if(status === "limited"){
        return <p>Cast unavailable at the moment.</p>;
    }
    if(status === "error" || cast.length === 0){
        return <p>Cast Not Available.</p>;
    }

    return(
        <ul class = "cast-list">
            {cast.map((entry) => (
                <li key={`${entry.person.id} - ${entry.character?.id}`}>
                    <strong>{entry.person.name}</strong>
                    {entry.character?.name ? ` as ${entry.character.name}` : ""}
                </li>
            ))}
        </ul>
    );
}

export default CastList;