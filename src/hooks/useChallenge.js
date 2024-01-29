import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {challengeActions} from "../store/challenges";

const useChallenge = (challengeId) => {
    const [selectedType, setSelectedType] = useState("active");
    const challenge = useSelector(state => state.challenges.challenges)

    const params = useParams();
    const dispatch = useDispatch()
    const handleSelectType = (newType) => {
        setSelectedType(newType);
    };

    const filteredChallenges = {
        active: challenge.filter((challenge) => challenge.status === "Active"),
        completed: challenge.filter((challenge) => challenge.status === "Completed"),
        failed: challenge.filter((challenge) => challenge.status === "Failed"),
    };

    const displayedChallenges = filteredChallenges[selectedType];

    const handleFail = async () => {
        try {
            const data = {status: "Failed"}
            await axios.put(`http://localhost:80/group/${params.GroupId}/challenge/${challengeId}`, data);
            dispatch(challengeActions.updateChallenge({challengeId, data}));

        } catch (err) {
            throw err;
        }
    }
    const handleComplete = async () => {
        try {
            const data = {status: "Completed"}
            await axios.put(`http://localhost:80/group/${params.GroupId}/challenge/${challengeId}`, data);
            dispatch(challengeActions.updateChallenge({challengeId, data}));
        } catch (err) {
            throw err;
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:80/group/${params.GroupId}/challenge/${challengeId}`);
            dispatch(challengeActions.removeChallenge(challengeId))
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        const getChallenges = async () => {
            try {
                const response = await axios.get(`http://localhost:80/group/${params.GroupId}/challenge`);
                dispatch(challengeActions.setChallenges(response.data))
            } catch (err) {
                throw err;
            }
        };

        getChallenges();
    }, []);

    return {
        filteredChallenges,
        handleSelectType,
        selectedType,
        displayedChallenges,
        handleFail,
        handleComplete,
        handleDelete,
    };
};

export default useChallenge;
