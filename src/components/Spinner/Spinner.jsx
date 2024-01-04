import "./Spinner.scss";

// Assets
import AutoRenewIcon from "../../assets/Icons/autorenew_black_24dp.svg";

function Spinner() {
  return (
    <>
      <div className="Spinner__Container">
        <img
          src={AutoRenewIcon}
          alt="AutoRenew Icon"
          className="Spinner__icon"
        />
        <div>Loading...</div>
      </div>
    </>
  );
}

export default Spinner;
