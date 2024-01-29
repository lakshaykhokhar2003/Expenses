import {getDate} from "../../components/utils";
import {useNavigate} from "react-router-dom";

const GroupItem = ({group, onClick}) => {
    const navigate = useNavigate()
    const groupChallenges = () => {
        navigate(`/groups/${group._id}/challenges`)
    }
    return (<article className="challenge-item" key={group._id} onClick={groupChallenges}>
        <header>
            <img {...group.image}/>
            <div className="group-item-meta">
                <div className="information">
                    <h3>{group.name}</h3>
                    <small className="owner">~ Owner {group.author.name}</small>
                </div>
                <p>{group.description}</p>
                <h4>Created On: {getDate(group.createdAt)}</h4>
            </div>
        </header>

    </article>)
}

export default GroupItem;