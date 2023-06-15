// Variable Declaration.
let categoryBreadCrumb = document.getElementById("category-breadcrumb");
let categoryTitle = document.getElementById("categoryTitle");
const categoryDetailListWrapper = document.getElementById(
  "category-details-container"
);
const buttonLoadMore = document.getElementById("button-load-more");
const iconLoader = document.getElementById("icon-loader");
const iconLoading = document.getElementById("icon-loading");

let limitCategoryDetail = 8;
const getCategoryName = localStorage.getItem("categoryName");

// Fetching data from API endpoint asynchronously.
const fetchCategoriesDetail = async (categoryName) => {
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );

    const response = await data.json();

    // Set data category into local storage.
    localStorage.setItem("dataCategoryDetails", JSON.stringify(response.meals));
  } catch (error) {
    console.info(error);
  }
};

// Render page Category Details.
const renderCategoryDetails = (categoriesDetailContainer) => {
  // Declare wrapper of list category detail in Page Category Detail.
  const categoryDetailContainer = document.getElementById(
    categoriesDetailContainer
  );

  // Validation to check if wrapper is not exist.
  if (!categoryDetailContainer) {
    return;
  }

  // Set category title for Category Detail Page.
  categoryTitle.innerHTML = getCategoryName;

  // Set breadcrumb name for Category Detail Page.
  categoryBreadCrumb.innerHTML = getCategoryName;

  // Set Loading Display.
  for (let i = 0; i < 8; i++) {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "relative rounded-2xl h-60 shadow-lg");

    const animatePulse = document.createElement("div");
    animatePulse.setAttribute(
      "class",
      "border bg-white top-0 left-0 w-full h-full rounded-2xl flex items-center justify-center text-center animate-pulse"
    );

    const textWrapper = document.createElement("div");
    textWrapper.setAttribute(
      "class",
      "bg-slate-200 opacity-80 rounded-full p-4 w-10/12"
    );

    animatePulse.appendChild(textWrapper);

    wrapper.appendChild(animatePulse);

    categoryDetailListWrapper.appendChild(wrapper);
  }

  // Call fetchCategoriesDetail to fetching data with parameter "getCategoryName" that get from local storage.
  fetchCategoriesDetail(getCategoryName);

  // Set Timeout method will map data from localstorage after 400 miliseconds.
  setTimeout(() => {
    // get data from localstorage, then parse the data to be javascript object.
    const dataCategoryDetails = JSON.parse(
      localStorage.getItem("dataCategoryDetails")
    );

    // Clear list wrapper.
    categoryDetailListWrapper.innerHTML = "";

    // Filter and mapping data into Page Category Detail.
    dataCategoryDetails
      .filter((_, index) => {
        return index < limitCategoryDetail;
      })
      .map((meal) => {
        categoryDetailContainer.appendChild(cardCategoryDetail(meal));

        const categoryDetailMeal = document.getElementById(`${meal.idMeal}`);
        categoryDetailMeal.addEventListener("click", () => {
          setIdMeal(meal.idMeal);
        });
      });
  }, 400);
};

// Function "cardCategoryDetail" will create elements that will displayed into Page Category Detail.
const cardCategoryDetail = (meal) => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", "/src/meal-detail.html");
  anchor.setAttribute(
    "class",
    `relative text-white text-xl font-semibold rounded-2xl flex justify-center items-center bg-[url(${meal.strMealThumb})] h-60 bg-cover bg-no-repeat bg-center hover:scale-105 duration-300 shadow-lg cursor-pointer`
  );
  anchor.setAttribute("id", `${meal.idMeal}`);

  const anchorContent = document.createElement("div");
  anchorContent.setAttribute(
    "class",
    "absolute bg-black top-0 left-0 w-full h-full bg-opacity-30 rounded-2xl hover:bg-opacity-0 hover:opacity-30 hover:scale-110 duration-500 flex items-center justify-center text-center"
  );
  anchorContent.textContent = meal.strMeal;
  anchor.appendChild(anchorContent);

  return anchor;
};

// Set Meal Id to localstorage.
const setIdMeal = (idMeal) => {
  localStorage.setItem("idMeal", idMeal);
};

// Create event for "Load more" button to load more data.
buttonLoadMore.addEventListener("click", () => {
  console.info("Success Load More...");
  categoryDetailListWrapper.innerHTML = "";

  iconLoader.classList.add("hidden");
  iconLoading.classList.remove("hidden");

  limitCategoryDetail = limitCategoryDetail + 8;
  renderCategoryDetails("category-details-container");

  // Check "limitCategoryDetail" variable to display icon loading properly.
  if (
    limitCategoryDetail >
    JSON.parse(localStorage.getItem("dataCategoryDetails")).length
  ) {
    buttonLoadMore.innerHTML = "All data loaded";
  } else {
    setTimeout(() => {
      if (iconLoader.classList.contains("hidden")) {
        iconLoader.classList.remove("hidden");
      }

      if (!iconLoading.classList.contains("hidden")) {
        iconLoading.classList.add("hidden");
      }
    }, 1000);
  }
});
