import {useRef} from 'react';
import {useAnimate, stagger} from 'framer-motion';

import Modal from '../../components/Modal.js';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {challengeActions} from "../../store/challenges";

const NewChallenge = ({onDone}) => {
    const title = useRef();
    const description = useRef();
    const deadline = useRef();

    const [scope, animate] = useAnimate();
    const params = useParams()
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const challenge = {
            title: title.current.value, description: description.current.value, deadline: deadline.current.value,
        };

        if (!challenge.title.trim() || !challenge.description.trim() || !challenge.deadline.trim()) {
            animate('input,textarea', {x: [-10, 0, 10, 0]}, {
                type: 'spring', duration: 0.2, delay: stagger(0.05)
            });
            return;
        }

        onDone();
        await axios.post(`http://localhost:80/group/${params.GroupId}/new-challenge`, challenge);
        const response = await axios.get(`http://localhost:80/group/${params.GroupId}/challenge`);
        dispatch(challengeActions.setChallenges(response.data));
    }

    return (<Modal title="New Challenge" onClose={onDone}>
        <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
            <p>
                <label htmlFor="title">Title</label>
                <input ref={title} type="text" name="title" id="title"/>
            </p>

            <p>
                <label htmlFor="description">Description</label>
                <textarea ref={description} name="description" id="description"/>
            </p>

            <p>
                <label htmlFor="deadline">Deadline</label>
                <input ref={deadline} type="date" name="deadline" id="deadline"/>
            </p>

            <p className="new-challenge-actions">
                <button type="button" onClick={onDone}>
                    Cancel
                </button>
                <button>Add Challenge</button>
            </p>
        </form>
    </Modal>);
}

export default NewChallenge;