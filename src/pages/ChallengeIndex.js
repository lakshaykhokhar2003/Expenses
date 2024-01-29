import ChallengeHeader from './Challenge/Header.js';
import Challenges from './Challenge/Challenges.js';
import {Link} from "react-router-dom";

const ChallengesPage = () => {
    return (<>
        <ChallengeHeader/>
        <main id="ChallengeMain">
            <Challenges/>
            <Link to="/groups" className="AllGroups">All Groups</Link>
        </main>
    </>);
}

export default ChallengesPage;
