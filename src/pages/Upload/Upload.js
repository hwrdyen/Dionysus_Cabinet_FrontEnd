import "./Upload.scss";
import axios from "axios";
import * as uuid from "uuid";
import { useState, useEffect } from "react";

function Upload(props) {
  const [SuccessfullySubmit, setSuccessfullySubmit] = useState(false);
  const [NewCocktailRecipe, setNewCocktailRecipe] = useState({
    id: null,
    img_id: null,
    cocktail_name: null,
    cocktail_ingredients: null,
    cocktail_included_alchohol: null,
    cocktail_recipe_steps: null,
    represent_mood: null,
    taste_preferences: null,
    cocktail_recipe_author: {
      name: null,
      email: null,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    // start of Author Name
    let author_name_value = document.getElementById("Recipe_Author_Name").value;
    // console.log(author_name_value);
    // end of Author Name

    // start of Author Email
    let author_email_value = document.getElementById(
      "Recipe_Author_Email"
    ).value;
    // console.log(author_email_value);
    // end of Author Email

    // start of Cocktail Name
    let cocktail_name = document.getElementById("Recipe_Name").value;
    // console.log(cocktail_name);
    // end of Cocktail Name

    // start of Cocktail Ingredients
    let cocktail_ingredients_value = [];
    let upload_ingredients_container = document.getElementById(
      "upload_ingredients_container"
    );
    let length_of_upload_ingredientschildNodes =
      upload_ingredients_container.childNodes.length;
    for (let i = 0; i < length_of_upload_ingredientschildNodes; i++) {
      cocktail_ingredients_value.push(
        upload_ingredients_container.children[i].value
      );
    }
    let join_cocktail_ingredients_value = cocktail_ingredients_value.join("; ");
    // console.log(join_cocktail_ingredients_value);
    // end of Cocktail Ingredients

    // start of Liquor Type Checkbox
    let liquor_type_result_value = [];
    let liquor_type_result = document.getElementsByName("Liquor_Type");
    for (let i = 0; i < liquor_type_result.length; i++) {
      if (liquor_type_result[i].checked) {
        liquor_type_result_value.push(liquor_type_result[i].value);
      }
    }
    // console.log(liquor_type_result_value);
    // end of Liquor Type Checkbox

    // start of Mood Category Dropdown Selection
    let mood_category_result = document.getElementById("upload_mood_category");
    let mood_category_result_value = mood_category_result.value;
    // console.log(mood_category_result_value);
    // end of Mood Category Dropdown Selection

    // start of Taste Category Dropdown Selection
    let taste_category_result = document.getElementById(
      "upload_taste_category"
    );
    let taste_category_result_value = taste_category_result.value;
    // console.log(taste_category_result_value);
    // end of Taste Category Dropdown Selection

    // start of Steps to Make Section
    let steps_to_make_value = [];
    let upload_steps_container = document.getElementById(
      "upload_steps_container"
    );
    let length_of_uploadstepschildNodes =
      upload_steps_container.childNodes.length;
    for (let i = 0; i < length_of_uploadstepschildNodes; i++) {
      steps_to_make_value.push(upload_steps_container.children[i].value);
    }
    let join_steps_to_make_value = steps_to_make_value.join("; ");
    // console.log(join_steps_to_make_value);
    // end of Steps to Make Section

    // start of Combining all Info into NewCocktailRecipe_Object
    let NewRecipe_Object = {
      id: uuid.v4(),
      img_id: "z9z9",
      cocktail_name: cocktail_name,
      cocktail_ingredients: join_cocktail_ingredients_value,
      cocktail_included_alchohol: liquor_type_result_value,
      cocktail_recipe_steps: join_steps_to_make_value,
      represent_mood: [mood_category_result_value],
      taste_preferences: [taste_category_result_value],
      cocktail_recipe_author: {
        name: author_name_value,
        email: author_email_value,
      },
    };

    // console.log(NewRecipe_Object);
    setNewCocktailRecipe(NewRecipe_Object);
    // end of Combining all Info into NewCocktailRecipe_Object
    setSuccessfullySubmit(true);

    //reset form
    let Upload__form = document.getElementById("Upload__form");
    Upload__form.reset();
    props.setRefetchRecipe(true);
  };

  // Successfully submit and make a post request to backend
  useEffect(() => {
    if (SuccessfullySubmit === true) {
      axios
        .post(
          `https://dionysus-cocktail-cabinet-be.onrender.com/cocktails_list`,
          NewCocktailRecipe
        )
        .then((res) => {
          console.log(res);
          setSuccessfullySubmit(false);
        })
        .catch((err) => console.log(err));
    }
  }, [SuccessfullySubmit, NewCocktailRecipe]);

  // Cocktail Ingredients
  // Add Ingredients Input
  const AddIngredientsInput = (event) => {
    event.preventDefault();
    let upload_ingredients_container = document.getElementById(
      "upload_ingredients_container"
    );
    let new_ingredient_input = document.createElement("input");
    new_ingredient_input.setAttribute("type", "text");
    new_ingredient_input.classList.add(
      "Upload__RecipeDetailsForm--IngredientsInput"
    );
    upload_ingredients_container.appendChild(new_ingredient_input);
  };

  // Remove Ingredients Input
  const RemoveIngredientsInput = (event) => {
    event.preventDefault();
    let upload_ingredients_container = document.getElementById(
      "upload_ingredients_container"
    );
    let length_of_childNodes = upload_ingredients_container.childNodes.length;
    if (length_of_childNodes > 1) {
      upload_ingredients_container.removeChild(
        upload_ingredients_container.children[length_of_childNodes - 1]
      );
    }
  };

  // Steps to make cocktail
  // Add Steps Input
  const AddStepsInput = (event) => {
    event.preventDefault();
    let upload_steps_container = document.getElementById(
      "upload_steps_container"
    );
    let new_step_input = document.createElement("input");
    new_step_input.setAttribute("type", "text");
    new_step_input.classList.add("Upload__RecipeDetailsForm--StepsInput");
    upload_steps_container.appendChild(new_step_input);
  };

  // Remove Steps Input
  const RemoveStepsInput = (event) => {
    event.preventDefault();
    let upload_steps_container = document.getElementById(
      "upload_steps_container"
    );
    let length_of_childNodes = upload_steps_container.childNodes.length;
    if (length_of_childNodes > 1) {
      upload_steps_container.removeChild(
        upload_steps_container.children[length_of_childNodes - 1]
      );
    }
  };

  return (
    <>
      <section className="Upload">
        <div className="Upload__titlecontainer">
          <p className="Upload__title">Upload Cocktail Recipe</p>
        </div>
        <form className="Upload__form" id="Upload__form" onSubmit={onSubmit}>
          <div className="Upload__form--AuthorInfo">
            <p>Recipe Author Information</p>

            <label className="Upload__AuthorInfoForm--title">Author Name</label>
            <input
              id="Recipe_Author_Name"
              className="Upload__AuthorInfoForm--textinput"
              type="text"
              placeholder="John"
              required
            />

            <label className="Upload__AuthorInfoForm--title">
              Author Email
            </label>
            <input
              id="Recipe_Author_Email"
              className="Upload__AuthorInfoForm--textinput"
              type="email"
              placeholder="John@gmail.com"
              required
            />
          </div>

          <div className="Upload__form--RecipeDetails">
            <p>Cocktail Recipe Details</p>

            <div className="Upload-form__RecipeDetails--sectioncontainer">
              <div className="Upload-form__RecipeDetails--sectionone">
                <label className="Upload__RecipeDetailsForm--title">
                  Cocktail Name
                </label>
                <input
                  id="Recipe_Name"
                  className="Upload__RecipeDetailsForm--textinput"
                  type="text"
                  placeholder="Margarita (max word count: 15)"
                  maxLength="15"
                  required
                />

                <label className="Upload__RecipeDetailsForm--title">
                  Cocktail Ingredients
                </label>
                <div
                  className="Upload__RecipeDetailsForm--IngredientsContainer"
                  id="upload_ingredients_container"
                >
                  <input
                    type="text"
                    className="Upload__RecipeDetailsForm--IngredientsInput"
                    placeholder="1 half lime"
                    required
                  />
                </div>

                <div className="Upload__RecipeDetailsForm--IngredientsButtonContainer">
                  <button
                    className="Upload__RecipeDetailsForm--AddIngredientsInput"
                    onClick={AddIngredientsInput}
                  >
                    Add
                  </button>
                  <button
                    className="Upload__RecipeDetailsForm--RemoveIngredientsInput"
                    onClick={RemoveIngredientsInput}
                  >
                    Remove
                  </button>
                </div>

                <label className="Upload__RecipeDetailsForm--title">
                  Liquor Type
                </label>
                <div className="Upload__RecipeDetailsForm--LiquorTypeContainer">
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input
                      type="checkbox"
                      name="Liquor_Type"
                      value="Absinthe"
                    />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Absinthe
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Brandy" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Brandy
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Cognac" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Cognac
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Gin" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Gin
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Jager" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Jager
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Rum" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Rum
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input
                      type="checkbox"
                      name="Liquor_Type"
                      value="Schnapps"
                    />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Schnapps
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Sambuca" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Sambuca
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Tequila" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Tequila
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input
                      type="checkbox"
                      name="Liquor_Type"
                      value="Vermouth"
                    />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Vermouth
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Vodka" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Vodka
                    </div>
                  </div>
                  <div className="Upload__RecipeDetailsForm--LiquorType">
                    <input type="checkbox" name="Liquor_Type" value="Whiskey" />
                    <div className="Upload__RecipeDetailsForm--LiquorTypeTitle">
                      Whiskey
                    </div>
                  </div>
                </div>
              </div>

              <div className="Upload-form__RecipeDetails--sectiontwo">
                <label className="Upload__RecipeDetailsForm--title">
                  Mood Category
                </label>
                <select
                  className="Upload__RecipeDetailsForm--MoodCategoryDropdown"
                  id="upload_mood_category"
                  name="upload_mood_category"
                >
                  <option value="Partay_Queen">Partay Queen</option>
                  <option value="After_Work">After Work</option>
                  <option value="First_Date">First Date</option>
                  <option value="Blue_Monday">Blue Monday</option>
                  <option value="Surprise_Me">Surprise Me</option>
                </select>

                <label className="Upload__RecipeDetailsForm--title">
                  Taste Category
                </label>
                <select
                  className="Upload__RecipeDetailsForm--TasteCategoryDropdown"
                  id="upload_taste_category"
                  name="upload_taste_category"
                >
                  <option value="Boozy">Boozy</option>
                  <option value="Sweet">Sweet</option>
                  <option value="Sour">Sour</option>
                  <option value="Bitter">Bitter</option>
                  <option value="Umami">Umami</option>
                  <option value="Salty">Salty</option>
                </select>

                <label className="Upload__RecipeDetailsForm--title">
                  Steps to Make
                </label>
                <div
                  className="Upload__RecipeDetailsForm--StepsContainer"
                  id="upload_steps_container"
                >
                  <input
                    type="text"
                    className="Upload__RecipeDetailsForm--StepsInput"
                    placeholder="Sprinkle salt on a small plate."
                    required
                  />
                  {/* <input type="hidden" value="1" id="total_steps"/> */}
                </div>
                <div className="Upload__RecipeDetailsForm--StepsButtonContainer">
                  <button
                    className="Upload__RecipeDetailsForm--AddStepsInput"
                    onClick={AddStepsInput}
                  >
                    Add Step
                  </button>
                  <button
                    className="Upload__RecipeDetailsForm--RemoveStepsInput"
                    onClick={RemoveStepsInput}
                  >
                    Remove Step
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Upload__form--SubmitButtonContainer">
            <input
              className="Upload__form--ResetButton"
              type="reset"
              value="Reset"
            />
            <input
              className="Upload__form--SubmitButton"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload;
