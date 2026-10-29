function ResultsSummary({count, search}){
    return(
        <p class = "status" role = "status">
            Showing {count} result{count === 1 ? "" : "s"} for "{search}"
        </p>
    );
}

export default ResultsSummary;