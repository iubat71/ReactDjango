import { updateObject } from '../../helpers/updateObject';

const initialState = [
    {
        successful: false,
        failed:false,
        auctions:[{"id":3}]

    }
];


const fetchedAuctions = ( state, action ) => {
    return updateObject( state, {
        auctions: action.data,
        successful: true,
        failed: false,
    } );
};

export default function auctions(state=initialState, action) {
    switch (action.type) {

        case 'AUCTION_POST_SUCCESSFUL':
        case 'BID_POST_SUCCESSFUL':
            return {...state, successful: true};
        case 'AUCTION_FETCH_SUCCESSFUL':
            return fetchedAuctions(state,action);
        case 'POSTING_FAILED':
        case 'BIDDING_FAILED':
        case 'AUTHENTICATION_ERROR':
        case 'FETCHING_FAILED':
            return {...state, failed: true};
        default:
            return state;
    }
}