import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// Module model.js
// State : - stores all the data about the application that is running in the browser(the data about applications front-end)
//        - should store any data that we might fetch from an API or data that the user inputs or what page the user currently viewing
//        - This data should be the so called single source of thruth. Which should be kept in sync with the user interface UI. That means if some data changes in the state then the user interface should reflect that and if somethingh changes in the UI then the state should also change
//        -Storing and displaiyng dta and keeping everythingh in sync is one of the most difficult tasks when building web applications. Thats why they are many state libraies like Redux or Mobx

// We keep it simple here and use a simple obj to store our entire state
// We will start with a big state object:

// We export the state to use it in the controller
export const state = {
  recipe: {},
};

//  function responsible with fetching the data from our forkify API:
// This fucntion will not return anything . It will just change our state object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // Temp error handlig
    console.error(`${err}💥💥💥`);
  }
};
