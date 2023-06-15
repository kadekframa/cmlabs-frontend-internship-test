const fetchCategories = async () => {
  try {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const response = await data.json();
    return await response.categories;
  } catch (error) {
    console.info(error);
  }
};

const listCategory = (categoryContainer) => {
  const categoriesContainer = document.getElementById(categoryContainer);

  if (!categoriesContainer) {
    return;
  }

  fetchCategories()
    .then((categories) => {
      if (!categories) {
        categoriesContainer.innerHTML = "No categories fetched..";
        return;
      }
      console.info(categories);

      for (const category of categories) {
        categoriesContainer.appendChild(cardCategory(category));
        const categoryMeal = document.getElementById(`${category.strCategory}`);
        categoryMeal.addEventListener("click", () => {
          setCategoryName(category.strCategory);
        });
      }
    })
    .catch((error) => {
      console.info(error);
    });
};

const setCategoryName = (category) => {
  localStorage.setItem("categoryName", category);
};

const cardCategory = (category) => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", "/src/category-detail.html");
  anchor.setAttribute(
    "class",
    `relative text-white text-2xl font-bold rounded-2xl flex justify-center items-center bg-[url(${category.strCategoryThumb})] bg-contain bg-no-repeat bg-center h-40 hover:scale-105 duration-300 cursor-pointer`
  );
  anchor.setAttribute("id", `${category.strCategory}`);

  const anchorContent = document.createElement("div");
  anchorContent.setAttribute(
    "class",
    "absolute text-center bg-black top-0 left-0 w-full h-full bg-opacity-30 rounded-2xl hover:bg-opacity-0 hover:opacity-30 hover:scale-110 duration-500 flex items-center justify-center"
  );
  anchorContent.textContent = category.strCategory;
  anchor.appendChild(anchorContent);

  return anchor;
};
