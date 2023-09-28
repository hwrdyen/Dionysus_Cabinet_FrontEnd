import "./Cocktail_Recipe_Result_Item.scss";
import { NavLink } from "react-router-dom";

function Cocktail_Recipe_Result_Item(props) {
  return (
    <>
      <section className="Cocktail_Recipe_Result_Item" id={props.id}>
        <NavLink to={`/cocktail_recipe/${props.CurrentAlcoholRecipe_info.id}`}>
          <img
            className="Result-Item__image"
            src={`https://dionysus-cocktail-cabinet-be.onrender.com/assets/Cocktail_Type/${props.CurrentAlcoholRecipe_info?.img_id}.jpg`}
            alt="Cocktail Result"
          />
          <div className="Result-Item__title">
            {props.CurrentAlcoholRecipe_info.cocktail_name}
          </div>
        </NavLink>
      </section>
    </>
  );
}

export default Cocktail_Recipe_Result_Item;
