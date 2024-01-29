import coin from "../assets/coins-solid.svg"
import styles from "./Success.module.css"
import {Link} from "react-router-dom";

const Success = () => {
    return (<main className={styles.SuccessMain}>
        <img src={coin} alt=""/>
        <h1>Payment Successful</h1>
        <p>5 coins added!</p>
        <h4>Use them to get discounts!</h4>
        <Link to="/groups" className="AllGroups">All Groups</Link>

    </main>);
}

export default Success;