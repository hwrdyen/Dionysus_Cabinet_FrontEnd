import "./NotFound.scss";

//import Gif
import NotFoundGit from "../../assets/Gifs/404_notfound.gif";

function NotFound() {
    return(
        <>
            <section className="NotFound">
                <div className="NotFound__titlecontainer">
                    <p className="NotFound__maintitle">404 | Page Not Found </p>
                    <p className="NotFound__subtitle">These aren't the droids you're looking for.</p>
                    <p className="NotFound__subtitle">The princess is in another castle.</p>
                    <p className="NotFound__subtitle">Your wallet's in your other pants.</p>
                    <p className="NotFound__subtitle">We're not quite sure where your keys are.</p>
                </div>
                <div className="NotFound__imagecontainer">
                    <div className="NotFound__imagefilter"></div>
                    <img className="NotFound__image" src={NotFoundGit} alt="404 Not Found"/>
                </div>
                
            </section>

        </>
    );
}

export default NotFound;