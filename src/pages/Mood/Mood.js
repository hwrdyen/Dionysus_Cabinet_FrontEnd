import "./Mood.scss";
import axios from "axios";
import { useState, useEffect } from "react";

//import gif
import Bartending_Gif from "../../assets/Gifs/bartending_gif.gif";

//import components
import CocktailRecipeMoodResult from "../../components/Cocktail_Recipe_Mood_Result/Cocktail_Recipe_Mood_Result";
import Spinner from "../../components/Spinner/Spinner";

function Mood(props) {
  const [Loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [CurrentMood, setCurrentMood] = useState("");
  const [RepresentMoodList, setRepresentMoodList] = useState([]);

  useEffect(() => {
    setLoading(true);
    function GetRepresentMoodList() {
      return axios
        .get(
          `https://dionysus-cocktail-cabinet-be.onrender.com/represent_mood_list`
        )
        .then((element) => {
          let represent_mood_list_info = element.data;
          setRepresentMoodList(represent_mood_list_info);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    GetRepresentMoodList();
  }, []);
  // console.log(RepresentMoodList);

  function LoadingGif() {
    //Hide Mood NavBar
    let Mood__navbar__list = document.getElementById("Mood__navbar--list");
    Mood__navbar__list.classList.remove("Mood__navbar--FinishedLoading");
    Mood__navbar__list.classList.add("Mood__navbar--StillLoading");

    var loading_gif = document.createElement("div");
    loading_gif.id = "Mood__loadinggif--container";
    loading_gif.className = "Mood__loadinggif--container";
    loading_gif.innerHTML = `<img src=${Bartending_Gif} class="Mood__loadinggif--gif"/>`;

    let bartending_div = document.getElementById("Mood__bartending");
    bartending_div.appendChild(loading_gif);

    setTimeout(LoadingGifFadeOut, 1500);
  }

  function LoadingGifFadeOut() {
    let bartending_div = document.getElementById("Mood__bartending");
    let loading_gif = document.getElementById("Mood__loadinggif--container");
    bartending_div.removeChild(loading_gif);

    //Bring Back Mood NavBar
    let Mood__navbar__list = document.getElementById("Mood__navbar--list");
    Mood__navbar__list.classList.add("Mood__navbar--FinishedLoading");
    Mood__navbar__list.classList.remove("Mood__navbar--StillLoading");
    setisLoading(false);
  }

  const SelectMood = (event) => {
    let selected_mood = event.currentTarget.id;
    event.preventDefault();
    setCurrentMood(selected_mood);
    LoadingGif();
    setisLoading(true);
  };

  return (
    <>
      <section id="Mood" className="Mood">
        <div className="Mood__titlecontainer">
          <p className="Mood__title">Mood Matchmaker</p>
        </div>
        {Loading ? (
          <Spinner />
        ) : (
          <div id="Mood__navbar--list" className="Mood__navbar--list">
            {RepresentMoodList.map((represent_mood) => (
              <div
                id={represent_mood?.image_name}
                className="Mood__navbar--item"
                onClick={SelectMood}
              >
                <img
                  className="Mood__item--image"
                  src={`https://dionysus-cocktail-cabinet-be.onrender.com/assets/Mood_Type/${represent_mood?.image_name}.svg`}
                  alt="Mood"
                />
                <p className="Mood__item--title">{represent_mood?.mood_name}</p>
              </div>
            ))}
          </div>
        )}

        <div id="Mood__bartending"></div>

        <div
          className={`${
            isLoading === true
              ? "Mood__result--StillLoading"
              : "Mood__result--FinishedLoading"
          }`}
        >
          <CocktailRecipeMoodResult
            CurrentMood={CurrentMood}
            AllRecipesInfo={props.AllRecipesInfo}
          />
        </div>
      </section>
    </>
  );
}

export default Mood;
