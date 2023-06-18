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
const renderMealDetail = (container) => {
  // Declare wrapper of list category detail in Page Category Detail.
  const mealDetailContainer = document.getElementById(container);

  // Validation to check if wrapper is not exist.
  if (!mealDetailContainer) {
    return;
  }

  // Set Loading Display.
  const breadcrumbLoading = document.createElement("div");
  breadcrumbLoading.setAttribute(
    "class",
    "border w-1/3 p-3 rounded-full bg-slate-200"
  );

  // get data from localstorage, then parse the data to be javascript object.
  const idMeal = localStorage.getItem("idMeal");

  // Call "fetchMealDetail" to fetching data with parameter "getMealId" which get from local storage.
  fetchMealDetail(idMeal);
  console.info("test fetch");

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
