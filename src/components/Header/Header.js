import './Header.scss';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';

import dionysus_cabinet_logo from "../../assets/Icons/dionysus_cabinet_logo.svg";

function Header(props) {

    //onClick rerender the AllList
    const OnClick = (event) => {
        props.setRefetchRecipe(true);
    }

    const [IsOpen, setIsOpen] = useState(false);


    return (
        <>        
            <section className="Header">
                <div className="Header__navbar__mobilecontainer">
                    <Hamburger class="Header__hamburger-navmenu" size={20} toggled={IsOpen} toggle={setIsOpen} onToggle={toggled => {
                    if (toggled) {
                        // open a menu
                        let Header__navbar__mobile = document.getElementById("Header__navbar__mobile");
                        Header__navbar__mobile.classList.remove("hidden");
                        Header__navbar__mobile.classList.add("show");
                    } else {
                        // close a menu
                        let Header__navbar__mobile = document.getElementById("Header__navbar__mobile");
                        Header__navbar__mobile.classList.add("hidden");
                        Header__navbar__mobile.classList.remove("show");
                    }
                    }} />
                </div>

                <div className="Header__logo">
                    <NavLink to={`/`} className="Header__logo--link">
                        {/* <div>
                            Dionysus Cabinet
                        </div> */}
                        <img className="Header__logo--image" src={dionysus_cabinet_logo} alt="Dionysus Cabinet"/>
                    </NavLink>
                </div>

                <div className="Header__navbar__tablet">
                    <NavLink to="/liquor_cellar" onClick={OnClick}>
                        <div className="Header__navbar--button">
                            <div className="before_hover">Cellar</div>
                            <div className="after_hover">Liquor Cellar</div>
                        </div>
                    </NavLink>
                    <NavLink to="/taste_concierge" onClick={OnClick}>
                        <div className="Header__navbar--button">
                            <div className="before_hover">Taste</div>
                            <div className="after_hover">Taste Concierge</div>
                        </div>
                    </NavLink>
                    <NavLink to="/mood_matchmaker" onClick={OnClick}>
                        <div className="Header__navbar--button">
                            <div className="before_hover">Mood</div>
                            <div className="after_hover">Mood Matchmaker</div> 
                        </div>
                    </NavLink>
                    <NavLink to="/upload" onClick={OnClick}>
                        <div className="Header__navbar--button">
                            <div className="before_hover">Upload</div>
                            <div className="after_hover">Upload Recipe</div>
                        </div>
                    </NavLink>
                </div>
            </section> 

            <div className="Header__navbar__mobile hidden tablet__hidden" id="Header__navbar__mobile">
                <NavLink to="/liquor_cellar" onClick={OnClick}>
                    <div className="Header__navbar--button">
                        <div className="before_hover">Cellar</div>
                        <div className="after_hover">Liquor Cellar</div>
                    </div>
                </NavLink>
                <NavLink to="/taste_concierge" onClick={OnClick}>
                    <div className="Header__navbar--button">
                        <div className="before_hover">Taste</div>
                        <div className="after_hover">Taste Concierge</div>
                    </div>
                </NavLink>
                <NavLink to="/mood_matchmaker" onClick={OnClick}>
                    <div className="Header__navbar--button">
                        <div className="before_hover">Mood</div>
                        <div className="after_hover">Mood Matchmaker</div> 
                    </div>
                </NavLink>
                <NavLink to="/upload" onClick={OnClick}>
                    <div className="Header__navbar--button">
                        <div className="before_hover">Upload</div>
                        <div className="after_hover">Upload Recipe</div>
                    </div>
                </NavLink>
            </div>
        </>


    );
}

export default Header;