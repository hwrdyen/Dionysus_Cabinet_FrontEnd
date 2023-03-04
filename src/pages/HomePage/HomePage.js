import "./HomePage.scss";
import { NavLink } from "react-router-dom";

// import gif
import bar_gif from "../../assets/Gifs/homepage_bar_gif.gif";

function HomePage() {
    return(
        <>
            <section className="HomePage">
                <div className="HomePage__title--container">
                    <p className="HomePage__title--subtitle">Welcome To</p>
                    <p className="HomePage__title--maintitle typewriter">Dionysus Cabinet</p>
                </div>
                

                <div className="HomePage__background--container">
                    <div className="HomePage__background--filter"></div>
                    <img className="HomePage__background--image" src={bar_gif} alt="Home Page Background"/>
                </div>


                {/* button on the gif  */}
                <div className="HomePage__buttoncontainer">
                    <NavLink to="/liquor_cellar">
                        <div className="HomePage__button">
                            <p className="HomePage__button--title">Liquor Cellar</p>
                        </div>
                    </NavLink>
                    <NavLink to="/taste_concierge">
                        <div className="HomePage__button">
                            <p className="HomePage__button--title">Taste Concierge</p>
                        </div>
                    </NavLink>
                    <NavLink to="/mood_matchmaker">
                        <div className="HomePage__button">
                            <p className="HomePage__button--title">Mood Matchmaker</p>
                        </div>
                    </NavLink>
                </div>
            </section>

        </>
    );
}

export default HomePage;