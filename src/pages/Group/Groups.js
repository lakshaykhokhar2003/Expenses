import {useEffect, useState} from 'react';
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import GroupItem from "./GroupItem";
import NewGroup from "./NewGroup";
import {Link} from "react-router-dom";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [isCreatingNewGroup, setIsCreatingNewGroup] = useState();
    const handleStartAddNewChallenge = () => {
        setIsCreatingNewGroup(true);
    }

    const handleDone = () => {
        setIsCreatingNewGroup(false);
    }

    useEffect(() => {
        const getGroups = async () => {
            const response = await axios.get('http://localhost:80/group');
            // console.log(response.data);
            setGroups(response.data);
        }
        getGroups();
    }, [isCreatingNewGroup]);

    return (<>
        {groups.map((group, index) => (<GroupItem
            key={index}
            group={group}
            onClick={<Link to={`/groups/${group._id}`}> </Link>}
        />))}
        <AnimatePresence>
            {isCreatingNewGroup && <NewGroup onDone={handleDone}/>}
        </AnimatePresence>
        <div className="create-new-group">
            <h1>Create New Group</h1>
            <motion.button className="button" onClick={handleStartAddNewChallenge}
                           whileHover={{scale: 1.1, backgroundColor: '#0f172a'}}
                           transition={{type: 'spring', stiffness: 500}}

            >
                + Add Group
            </motion.button>
        </div>
    </>);
}

export default Groups;