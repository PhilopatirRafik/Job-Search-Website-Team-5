
document.getElementById("searchForm").addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("job_title").value.trim();
    const years = document.getElementById("experience_years").value.trim();

    localStorage.setItem("searchData", JSON.stringify({
        title,
        years
    }));

    window.location.href = "job_results.html";
});

 
