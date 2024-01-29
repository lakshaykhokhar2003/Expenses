import Groups from "./Group/Groups";
import {challengeActions} from "../store/challenges";
import {useDispatch} from "react-redux";

const GroupsPage = () => {
    const dispatch = useDispatch()
    dispatch(challengeActions.setChallenges([]))
    return (<>
        <header className="group-header">
            <h1>Your Group</h1>
        </header>
        <main className="GroupMain">
            <Groups/>
        </main>
    </>);
}

export default GroupsPage;