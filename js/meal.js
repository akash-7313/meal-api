function searchMeal() {
    const searchText = document.getElementById('input-feild');
    const value = searchText.value;

    if(value == ''){
        alert('plz write something to search');
    }
    else{
        searchText.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
        // console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => showMeal(data))
    }
}
function showMeal(data){
    // console.log(data);
    const meals = data.meals;
    // console.log(meals);
    if(meals == null) {
        alert('no matching result found, plz try again');
    }
    else{
        const parentCall = document.getElementById('meals');
        parentCall.textContent='';
        for (const meal of meals){
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal} </h5>
                            <button class="btn btn-primary btn-sm" onclick="searchDetail('${meal.idMeal}')">See Receipe </button>
                        </div>
                </div>
            `
            parentCall.appendChild(div);
        }
    }
}


function searchDetail(id){
    console.log(id);



    const url= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.meals))
}
function showDetail (data){
    // console.log(data);
    const meals = data[0];
    // console.log(meals);
    const parentCall = document.getElementById('more-detail');
    parentCall.textContent='';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${meals.strMealThumb}" class="img-fluid rounded-end" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h4 class="card-title">${meals.strMeal}</h4>
                        <h6 class="card-text">${meals.strArea}</h6>
                        <p class="card-text">${meals.strInstructions.slice(0,300)}</p>
                        <a target="_blank" href="${meals.strYoutube}" class="btn btn-primary btn-sm">See video
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    parentCall.appendChild(div);

    // document.getElementById('meals').style.display='none';
}































