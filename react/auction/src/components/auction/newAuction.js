import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auctions} from "../../reducers/actions";
import './newAuction.css';
class newAuction extends Component {

    state = {
        'owner_id':this.props.user.id,
        'item':'',
        'image':'',
        'starting_bid':'',
        'ending_time':'',
        'submited':false,
        'message':''
    };



    onSubmit = e => {
        e.preventDefault();
        e.target.reset();
        this.setState({owner_id:this.props.user.id});
        this.setState({submited:true})
        this.props.newAuction(this.state.owner_id, this.state.item,this.state.image,this.state.starting_bid,this.state.ending_time);
        this.setState({message:"Successfully made an auction"});

    };



    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        let success = null;
        let auctionImage = null
        if(this.state.submited===true){
            success=(
                <div className="alert alert-success" role="alert">
                <strong>{this.state.message}</strong>
                </div>);
            auctionImage=(
                    <img src={this.state.image} alt="auction"/>
            );
        }


        return (

            <div className="NewAuction">
                <h1>New Auction</h1>
                <div className="container">
                    <div className="card card-container">
                        <form className="form-signin" onSubmit={this.onSubmit}>
                            {this.props.errors.length > 0 && (
                                <ul>
                                    {this.props.errors.map(error => (
                                        <li key={error.field}>{error.message}</li>
                                    ))}
                                </ul>
                            )}
                            {success}
                            {auctionImage}

                            <input type="text" id="inputEmail" className="form-control" placeholder="Item"
                                   required onChange={e => this.setState({item: e.target.value})} />
                            <input type="text" id="inputPassword" className="form-control"
                                   placeholder="Image (URL)" required onChange={e => this.setState({image: e.target.value})}/>
                            <input type="number" id="startingBid" className="form-control"
                                   placeholder="Starting bid" required onChange={e => this.setState({starting_bid: e.target.value})}/>
                            <input type="date" id="endingTime" className="form-control"
                                   placeholder="Ending time" required onChange={e => this.setState({ending_time: e.target.value+"T00:00Z"})}/>

                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Submit</button>
                        </form>
                        <Link to='/'>Go back</Link>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        newAuction: (owner_id, item, image, starting_bid, ending_time) => {
            return dispatch(auctions.postAuction(owner_id, item, image, starting_bid, ending_time));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(newAuction);