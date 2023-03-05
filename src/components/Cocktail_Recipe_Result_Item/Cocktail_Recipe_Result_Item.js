import "./Cocktail_Recipe_Result_Item.scss";
import { NavLink } from "react-router-dom";


function Cocktail_Recipe_Result_Item(props) {
    return (
        <>
            <section className="Cocktail_Recipe_Result_Item">
                <NavLink to={`/cocktail_recipe/${props.CurrentAlcoholRecipe_info.recipe_id}`}>
                    <img className="Result-Item__image" src={`http://localhost:5050/assets/Cocktail_Type/${props.CurrentAlcoholRecipe_info?.img_id}.jpg`}/>
                    <div className="Result-Item__title">{props.CurrentAlcoholRecipe_info.cocktail_name}</div>
                </NavLink>
            </section>
        </>
    );
}

export default Cocktail_Recipe_Result_Item;