import {AnimatePresence, motion} from 'framer-motion';
import ChallengeItem from './ChallengeItem.js';
import ChallengeTabs from './ChallengeTabs.js';
import useChallenge from "../../hooks/useChallenge";

const Challenges = () => {
    const {filteredChallenges, handleSelectType, selectedType, displayedChallenges,groupExpense} = useChallenge()
    return (<div id="challenges">
        <ChallengeTabs
            challenges={filteredChallenges}
            onSelectType={handleSelectType}
            selectedType={selectedType}
            groupExpense={groupExpense}
        >
            <AnimatePresence mode="wait">
                {displayedChallenges.length > 0 && (<motion.ol
                    key="list"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{y: -20, opacity: 0}}
                    className="challenge-items"
                >
                    <AnimatePresence>
                        {displayedChallenges.map((challenge) => (
                            <ChallengeItem key={challenge.id} challenge={challenge} selectedType={selectedType}/>))}
                    </AnimatePresence>
                </motion.ol>)}
                {displayedChallenges.length === 0 && (<motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20, transition: {duration: 0.1}}}
                    key="fallback"
                >
                    No challenges found.
                </motion.p>)}
            </AnimatePresence>
        </ChallengeTabs>
    </div>);
};

export default Challenges;
