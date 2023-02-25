import './Alcohol_Cabinet.scss';

import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

//import components
import Cocktail_Recipe_Result_List from "../../components/Cocktail_Recipe_Result_List/Cocktail_Recipe_Result_List.js";

function Alcohol_Cabinet(props) {

    const SelectAlcohol = (event) => {
        let selected_alcohol = event.currentTarget.id;
        event.preventDefault();
        props.setCurrentAlcohol(selected_alcohol);
    }

    const ResetSelectAlcohol = (event) => {
        props.setCurrentAlcohol("");
    }

    // Render Alcohol_List
    const [AlcoholList, setAlcoholList] = useState([]);

    useEffect(() => {
        function GetAlcoholList() {
            return axios.get(`http://localhost:8080/alcohol_list`)
            .then((element) => {
                let alcohol_list_info = element.data;
                setAlcoholList(alcohol_list_info);  
            })
        }
        GetAlcoholList();
    }, [])


    return (
        <>
            <section className="Alcohol_Cabinet">
                <div className="Alcohol_Cabinet__titlecontainer">
                    <p className="Alcohol_Cabinet__title">Liquor Cellar</p>
                </div>

                <div className="Alcohol_Cabinet__alcoholtype">{ 
                        AlcoholList.map((alcohol_type) => (
                                <div id={`${alcohol_type?.image_name}`} className={`Alcohol_Cabinet__block`} onClick={SelectAlcohol}>
                                    <img src={`http://localhost:8080/assets/Alcohol_Type/${alcohol_type?.image_name}.png`} alt={`${alcohol_type?.alcohol_name}`} className="Alcohol_Cabinet__block_image"/>
                                    <div className="Alcohol_Cabinet__block_title">{alcohol_type?.alcohol_name}</div>
                                </div>                     
                ))}</div>

                <Cocktail_Recipe_Result_List CurrentAlcohol={props.CurrentAlcohol} CurrentAlcoholRecipes={props.CurrentAlcoholRecipes} ResetSelectAlcohol={ResetSelectAlcohol} />

            </section>
        </>
    );
}

export default Alcohol_Cabinet;