import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    challenges: [],
}

const challengeSlice = createSlice({
    name: "challenges", initialState, reducers: {
        setChallenges(state, action) {
            state.challenges = action.payload;
        }, removeChallenge(state, action) {
            state.challenges = state.challenges.filter((challenge) => challenge.id !== action.payload);
        }, updateChallenge(state, action) {
            const {challengeId, data} = action.payload;
            state.challenges = state.challenges.map((challenge) => {
                if (challenge.id === challengeId) {
                    return {...challenge, ...data};
                }
                return challenge;
            });
        },
    },
});

export const challengeActions = challengeSlice.actions;

export default challengeSlice.reducer;