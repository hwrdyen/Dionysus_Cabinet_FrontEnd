import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./Taste.scss";

import axios from "axios";
import { useState, useEffect } from "react";

import CocktailRecipeTasteResultList from "../../components/Cocktail_Recipe_Taste_Result_List/Cocktail_Recipe_Taste_Result_List.js";
import Spinner from "../../components/Spinner/Spinner.jsx";

function Taste(props) {
  const [Loading, setLoading] = useState(false);
  const [TastePreferencesList, setTastePreferencesList] = useState([]);
  const [CurrentTaste, setCurrentTaste] = useState("");

  useEffect(() => {
    setLoading(true);
    function GetTastePreferencesList() {
      return axios
        .get(
          `https://dionysus-cocktail-cabinet-be.onrender.com/taste_preferences_list`
        )
        .then((element) => {
          let taste_preferences_list_info = element.data;
          setTastePreferencesList(taste_preferences_list_info);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    GetTastePreferencesList();
  }, []);
  // console.log(TastePreferencesList);

  let Label_Value_list = [
    {
      value: 0,
      // label: 'Boozy',
      label: "",
    },
    {
      value: 20,
      // label: 'Sweet',
      label: "",
    },
    {
      value: 40,
      // label: 'Sour',
      label: "",
    },
    {
      value: 60,
      // label: 'Bitter',
      label: "",
    },
    {
      value: 80,
      // label: 'Umami',
      label: "",
    },
    {
      value: 100,
      // label: 'Salty',
      label: "",
    },
  ];

  for (let i = 0; i < Label_Value_list.length; i++) {
    Label_Value_list[i].label = TastePreferencesList[i]?.taste_name;
  }
  // console.log(Label_Value_list);

  const ClickonSlider = (event) => {
    let target_value = event.target.value;
    // console.log(event.target.value);
    let target_object = Label_Value_list.find(
      (value_object) => value_object?.value === target_value
    );
    // console.log(target_object);
    // console.log(target_object?.label);
    setCurrentTaste(target_object?.label);
  };

  return (
    <>
      <section className="Taste">
        <div className="Taste__titlecontainer">
          <p className="Taste__title">Taste Concierge</p>
        </div>
        <div className="Taste__slidebar--section">
          <Box className="Taste__slidebar--container">
            <Slider
              aria-label="Restricted values"
              defaultValue={null}
              step={null}
              marks={Label_Value_list}
              onChange={ClickonSlider}
            />
          </Box>
        </div>

        {Loading ? (
          <Spinner />
        ) : (
          <CocktailRecipeTasteResultList
            CurrentTaste={CurrentTaste}
            AllRecipesInfo={props.AllRecipesInfo}
            TastePreferencesList={TastePreferencesList}
          />
        )}
      </section>
    </>
  );
}

export default Taste;
