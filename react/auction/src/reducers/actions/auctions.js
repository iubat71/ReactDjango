//import axios from 'axios';

export const postAuction = (owner_id, item, image, starting_bid, ending_time) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*',
        };
        let body = JSON.stringify({owner_id, item, image, starting_bid, ending_time});

        return fetch("http://localhost:8000/auctions/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'AUCTION_POST_SUCCESSFUL', data: res.data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: "POSTING_FAILED", data: res.data});
                    throw res.data;
                }
            })
    }
};

export const bid = (id, highest_bid, winner_id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({id, highest_bid, winner_id});
        let APIUrl = "http://localhost:8000/auction/"+id;
        return fetch(APIUrl, {headers, body, method: "PUT"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'BID_POST_SUCCESSFUL', data: res.data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: "BIDDING_FAILED", data: res.data});
                    throw res.data;
                }
            })
    }
};

export const fetchAuctionsSuccess = ( auctions ) => {
    return {
        type: 'AUCTION_FETCH_SUCCESSFUL',
        auctions: auctions
    };
};

export const fetchOrders = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*',
        };
        //let body = JSON.stringify({owner_id, item, image, starting_bid, ending_time});

        return fetch("http://localhost:8000/auctions/", {headers, method: "GET"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'AUCTION_FETCH_SUCCESSFUL', data: res.data });
                    console.log(res.data);
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: "FETCHING_FAILED", data: res.data});
                    throw res.data;
                }
            })
    }
};