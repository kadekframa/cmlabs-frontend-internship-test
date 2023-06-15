// Variable Declaration.
let mealBreadCrumb = document.getElementById("meal-detail-breadcrumb");
let mealTitle = document.getElementById("meal-title");

// const iconLoader = document.getElementById("icon-loader");
// const iconLoading = document.getElementById("icon-loading");

const imageMeal = document.getElementById("meal-image");
const instructions = document.getElementById("instructions");
const recipes = document.getElementById("recipes");
const videoTutorial = document.getElementById("video-tutorial");

// Fetching data from API endpoint asynchronously.
const fetchMealDetail = async (id) => {
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const response = await data.json();

    // Set data category into local storage.
    localStorage.setItem("dataMealDetails", JSON.stringify(response.meals));
  } catch (error) {
    console.info(error);
  }
};

// Render page Meal Details.
const renderMealDetail = () => {
  // Set category title for Category Detail Page.
  //   categoryTitle.innerHTML = getCategoryName;

  // Set breadcrumb name for Category Detail Page.
  //   categoryBreadCrumb.innerHTML = getCategoryName;

  // Set Loading Display.

  // Set Timeout method will get data from localstorage after 100 miliseconds.
  setTimeout(() => {
    // get data from localstorage, then parse the data to be javascript object.
    const idMeal = localStorage.getItem("idMeal");

    // Call "fetchMealDetail" to fetching data with parameter "getMealId" which get from local storage.
    fetchMealDetail(idMeal);
    console.info("test fetch");
  }, 100);

  // Set Timeout method will get data from localstorage after 500 miliseconds.
  setTimeout(() => {
    const getMealId = JSON.parse(localStorage.getItem("dataMealDetails"));
    let dataMeal = getMealId[0];

    console.info(getMealId[0]);
    mealTitle.innerHTML = dataMeal.strMeal;
    mealBreadCrumb.innerHTML = dataMeal.strMeal;
    imageMeal.src = dataMeal.strMealThumb;

    instructions.textContent = dataMeal.strInstructions;

    for (let i = 1; i <= 20; i++) {
      const listRecipes = document.createElement("li");
      if (eval(`dataMeal.strIngredient${i}`) === "") {
        return;
      } else {
        listRecipes.innerHTML =
          eval(`dataMeal.strMeasure${i}`) +
          " " +
          eval(`dataMeal.strIngredient${i}`);
      }
      recipes.appendChild(listRecipes);
    }

    videoTutorial.src = dataMeal.strYoutube;
  }, 500);
};
