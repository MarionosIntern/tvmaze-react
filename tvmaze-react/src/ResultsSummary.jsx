function ResultsSummary({count, term}){
    return(
        <p class = "status" role = "status">
            Showing {count} result{count === 1 ? "" : "s"} for "{term}"
        </p>
    );
}

export default ResultsSummary;