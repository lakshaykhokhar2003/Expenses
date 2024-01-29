import {useRef, useState} from 'react';
import {motion, useAnimate, stagger} from 'framer-motion';

import Modal from '../../components/Modal.js';
import images from '../../assets/images.js';
import axios from "axios";

const NewGroup = ({onDone}) => {
    const name = useRef();
    const description = useRef();

    const [scope, animate] = useAnimate();

    const [selectedImage, setSelectedImage] = useState(null);

    // const {addChallenge} = useContext(ChallengesContext);

    const handleSelectImage = (image) => {
        setSelectedImage(image);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const group = {
            name: name.current.value, description: description.current.value, image: selectedImage,
        };

        if (!group.name.trim() || !group.description.trim() || !group.image) {
            animate('input,textarea', {x: [-10, 0, 10, 0]}, {
                type: 'spring', duration: 0.2, delay: stagger(0.05)
            });
            return;
        }

        console.log(group)
        await axios.post('http://localhost:80/new-group', group)
        onDone();

        // addChallenge(challenge);
    }

    return (<Modal title="New Group" onClose={onDone}>
        <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
            <p>
                <label htmlFor="name">Name</label>
                <input ref={name} type="text" name="name" id="name"/>
            </p>

            <p>
                <label htmlFor="description">Description</label>
                <textarea ref={description} name="description" id="description"/>
            </p>

            <motion.ul id="new-challenge-images" variants={{
                show: {transition: {staggerChildren: 0.05}},
            }}>
                {images.map((image) => (<motion.li
                    variants={{
                        hidden: {opacity: 0, scale: 0.5}, show: {opacity: 1, scale: 1}
                    }}
                    transition={{type: 'spring'}}
                    exit={{opacity: 1, scale: 1}}
                    key={image.alt}
                    onClick={() => handleSelectImage(image)}
                    className={selectedImage === image ? 'selected' : undefined}
                >
                    <img {...image} />
                </motion.li>))}
            </motion.ul>

            <p className="new-challenge-actions">
                <button type="button" onClick={onDone}>
                    Cancel
                </button>
                <button>Add Group</button>
            </p>
        </form>
    </Modal>);
}

export default NewGroup;