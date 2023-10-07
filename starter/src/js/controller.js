import * as model from './model.js';
import recipeView from './views/recipeViews.js';
///
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return; // guard clause
    recipeView.renderSpinner();

    //1.Loading Recipe
    await model.loadRecipe(id); // async function//returning a promise

    //2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
); // add event on window for # (hash)// we listen for load event
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
