import { combineReducers } from 'redux';
import auction from "./auctions";
import auth from './auth';

const auctions = combineReducers({
    auction,
    auth,
})

export default auctions;