import React, {Component} from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';

import './fullAuction.css';
import {Link, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import {auctions} from "../../reducers/actions";


class fullAuction extends Component {
    state = {
        auction:[],
        error: false,
        bid:0,
        submited:false,
        message:'',
        winning:false
    };

    onSubmit = e => {
        e.preventDefault();
        console.log("id "+this.state.auction.id);
        console.log("bid "+this.state.bid);
        console.log("winnerID "+this.props.user.id);

        this.props.bid(this.state.auction.id, this.state.bid, this.props.user.id);
        this.setState({submited:true,message:"Bid successful. You are the highest bidder"});
    };

    componentDidMount () {
        axios.get( 'http://localhost:8000/auction/'+this.props.match.params.id )
            .then( response => {
                let fetchedAuction = response.data[0];
                this.setState({auction: fetchedAuction});
                //console.log( response );
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });

        if(this.state.auction.winner_id===this.props.user.id){
            this.setState({winning:true});
        };

    }


    render() {
        //console.log(this.state.auction.ending_time);
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        let success = '';
        if(this.state.submited===true){
            success=(
                <div className="alert alert-success" role="alert">
                    <strong>{this.state.message}</strong>
                </div>);
        }

        let winning = null;

        if(this.state.auction.winner_id===this.props.user.id){
            winning = (<div className="alert alert-success" role="alert">
                <strong>You are winning this auction</strong>
            </div>);
        };
            return (
                <div className="container">
                    <div className='row'>
                        <div className='col'>
                            <div className="card">
                                <div className="card-body">
                                    {winning}
                                    <h1 className="card-title">{this.state.auction.item} </h1>
                                    <small class="text-muted">Innitial price <b>{this.state.auction.starting_bid} KM</b></small>
                                    <h3>Time left: <Countdown date={this.state.auction.ending_time}/></h3>
                                    <br/>
                                    <p>Highest bid: <b>{this.state.auction.highest_bid} KM</b></p>
                                    <br/>
                                    <br/>

                                    <form onSubmit={this.onSubmit}>
                                        <input
                                            className="form-control input-lg"
                                            type="number"
                                            min={this.state.auction.highest_bid}
                                            onChange={e => this.setState({bid: e.target.value})}/>
                                        <br/>
                                        <button className="btn btn-success btn-block">Bid</button>
                                    </form>
                                    <br/>
                                    {success}
                                    <br/>
                                    <Link className='btn btn-info btn-block' to='/'>Go back</Link>

                                </div>


                            </div>
                        </div>
                        <div className='col'>
                            <div className='card'>
                                <div className="card-body">

                                    <img class="card-img-bottom" src={this.state.auction.image} alt="Card  cap"/>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            );



    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        bid: (id, highest_bid, winner_id) => dispatch(auctions.bid(id, highest_bid, winner_id))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(fullAuction);