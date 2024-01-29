import {configureStore} from '@reduxjs/toolkit';
import challengeReducer from './challenges.js';

const store = configureStore({reducer: {challenges: challengeReducer}});

export default store;