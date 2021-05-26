

const button = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


button.addEventListener('click',getMeals);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


function getMeals(){
    let name = document.getElementById('search-input').value.trim()
    console.log(name)
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then(response => response.json()).then(data =>{
        console.log(data)
        let html = '';
        if(data.meals){
          data.meals.forEach(meal =>{
              html += `<div class = "meal-item" data-id = "${meal.idMeal}">
              <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
              </div>
              <div class = "meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
          </div>`
          mealList.classList.remove('notFound');
          })

        }
        else{
           html = "Sorry we didn't found this item"
           mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;

    })
}

//meal recipe
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }

}

function mealRecipeModal(meal){
    meal = meal[0]
    console.log(meal)
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}