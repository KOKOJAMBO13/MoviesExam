import movies from "./movies.js"

const kartochki = document.querySelector('.kartochki')
const inputSearch = document.querySelector('.inputSearch')
const searchBtn = document.querySelector('.searchBtn')
const selectSort = document.querySelector('.selectSort')
const selectCategory = document.querySelector('.selectCategory')




console.log(searchBtn)


let filteredMovies = [...movies]



function render(data) {
    kartochki.innerHTML = ""

    data.forEach(movie => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
            <div class="card-content">
                <h3>${movie.Title}</h3>
                <img class="card-image" src="./1200x675mf.jpg.png" alt="">
                <br><br>
                <div class="card-info">
                    <span class="daniy"> ${movie.imdb_rating}</span>
                    <span class="daniy"> ${movie.movie_year}</span>
                    <span class="daniy"> ${movie.runtime} min</span>
                </div>
                <p>${movie.Categories.replaceAll('|', ', ')}</p>
            </div>
        `

        kartochki.appendChild(card)
    })
}

render(filteredMovies)


function applyFilters() {
    const searchValue = inputSearch.value.toLowerCase().trim();
    const categoryValue = selectCategory.value.toLowerCase(); 

    filteredMovies = movies.filter(movie => {
        
        const matchTitle = String(movie.Title).toLowerCase().includes(searchValue);

        // Работа с категориями
        const movieCategories = movie.Categories 
            ? movie.Categories.split("|").map(cat => cat.trim().toLowerCase()) 
            : [];

        const matchCategory =
            categoryValue === "all" || 
            movieCategories.includes(categoryValue);

        return matchTitle && matchCategory;
    });

    applySort();
}





function applySort() {
    const sortValue = selectSort.value;

    if (sortValue === "a-z") {
        
        filteredMovies.sort((a, b) => String(a.Title).localeCompare(String(b.Title)));
    } 
    else if (sortValue === "z-a") {
        
        filteredMovies.sort((a, b) => String(b.Title).localeCompare(String(a.Title)));
    } 
    else if (sortValue === "rating") {
        
        filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
    } 
    else if (sortValue === "year") {
        
        filteredMovies.sort((a, b) => b.movie_year - a.movie_year);
    } 
    else if (sortValue === "runtime") {
       
        filteredMovies.sort((a, b) => b.runtime - a.runtime);
    }

    render(filteredMovies);
}



inputSearch.addEventListener("input", applyFilters)
searchBtn.addEventListener("click", applyFilters)
selectCategory.addEventListener("change", applyFilters)
selectSort.addEventListener("change", applySort)
