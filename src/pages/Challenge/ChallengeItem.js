import React from 'react';
import {motion} from 'framer-motion';
import {daysLeft, getDate} from "../../components/utils";
import useChallenge from "../../hooks/useChallenge";

const ChallengeItem = ({challenge, selectedType}) => {
    const {handleFail, handleComplete, handleDelete} = useChallenge(challenge.id);

    return (<motion.li layout exit={{y: -30, opacity: 0}}>
        <article className="challenge-item">
            <header>
                <div className="challenge-item-meta">
                    <div className="challengeInformation">
                        <div>
                            <h1>{challenge.title}</h1>
                            <p className="challenge-item-description">
                                {challenge.description}
                            </p>
                        </div>
                        <div className="daysInformation">
                            <p>{getDate(challenge.deadline)}</p>
                            <small>{daysLeft(challenge.deadline)} Days Left</small>
                        </div>
                    </div>

                    <p className="challenge-item-actions">
                        {(selectedType === "completed" || selectedType === "active") && (
                            <button onClick={handleFail} className="btn-negative">
                                Mark as failed
                            </button>)}
                        {(selectedType === "failed" || selectedType === "active") && (
                            <button onClick={handleComplete}>Mark as completed</button>)}
                        <button className="btn-negative" onClick={handleDelete}>
                            Delete
                        </button>
                    </p>
                </div>
            </header>
        </article>
    </motion.li>);
};

export default ChallengeItem;
