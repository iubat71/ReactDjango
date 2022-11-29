import React, {Component} from 'react';

import './auction.css';
import Countdown from 'react-countdown-now';
import {Link} from 'react-router-dom';

class auction extends Component {
    state ={
        bid:null
    }
    onSubmit = e => {
        e.preventDefault();
        console.log("id "+this.props.id);
        console.log("bid "+this.state.bid);
        console.log("winnerID "+this.props.newWinner);

        this.props.bid(this.props.id, this.state.bid, this.props.newWinner);
    };

    render() {

        let auctionTime = new Date(this.props.ending_time);
        let today = new Date();

        auctionTime.setTime(auctionTime.getTime());
        today.setTime(today.getTime());



        if (today > auctionTime) {
            return (<div className="col-lg-3 col-md-6 mb-4">
                <div className="card">
                    <img className="card-img-top" src={this.props.image} alt=""/>
                    <div className="card-body">
                        <h4 className="card-title">{this.props.item}</h4>
                        <h3>Auction finished</h3>
                        <p>Highest bid <b> {this.props.highest_bid} KM</b></p>
                        <p>Auction won user with id: {this.props.owner_id}</p>
                    </div>

                </div>
            </div>);
        }
        if (today < auctionTime) {
            return (
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card">
                            <Link to={"/"+this.props.id}>
                            <img className="card-img-top" src={this.props.image} alt=""/>
                            </Link>
                            <div className="card-body">
                                <h4 className="card-title">{this.props.item}</h4>
                                <p>Highest bid <b> {this.props.highest_bid} KM</b></p>
                            </div>
                            <div className="card-footer">
                                <Link className='btn btn-success btn-block' to={"/"+this.props.id}>Bid</Link>
                                <p>Time left <b><Countdown date={this.props.ending_time}/></b></p>
                            </div>
                        </div>
                    </div>
            );
        }


    }
}


export default auction;