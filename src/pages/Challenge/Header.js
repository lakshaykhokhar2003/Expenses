import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import NewChallenge from './NewChallenge.js';

export default function ChallengeHeader() {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

    const handleStartAddNewChallenge = ()=> {
        setIsCreatingNewChallenge(true);
    }

    const handleDone = ()=> {
        setIsCreatingNewChallenge(false);
    }

    return (<>
        <AnimatePresence>
            {isCreatingNewChallenge && <NewChallenge onDone={handleDone}/>}
        </AnimatePresence>
        <header id="main-header">
            <h1>Your Challenges</h1>
            <motion.button onClick={handleStartAddNewChallenge} className="button"
                           whileHover={{scale: 1.1, backgroundColor: '#0f172a'}}
                           transition={{type: 'spring', stiffness: 500}}>
                Add Challenge
            </motion.button>
        </header>
    </>);
}
