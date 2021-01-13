import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emailVerification } from '../../../../Redux/Action';
import VerifiedImg from '../../../Assets/Images/verified.png';
import './Verified.css';


class Verified extends Component {

    state = {
        redirectHome: false,
        count: 5
    }

    componentDidMount() {
        let token = this.props.location.search.split('=')[1];
        this.props.emailVerification(token)
        let myInterval = setInterval(() => {
            this.setState(item => ({
                count: item.count - 1
            }))
            if (this.state.count === 0) {
                clearInterval(myInterval)
                this.setState({ redirectHome: true })
                window.location.reload()
            }
        }, 1000);
    }

    render() {
        let token = this.props.location.search.split('=')[1];
        if (this.state.redirectHome) {
            return (
                <Redirect to="/"></Redirect>
            )
        } else {
            if (!token) {
                return (
                    <Redirect to="/"></Redirect>
                )
            }
        }
        return (
            <div className="text-center" style={{ marginTop: '5%' }}>
                <h1> Thank you...</h1>
                <img src={VerifiedImg} alt="verified-img" className="verified-img" />
                <h5>Please, wait after {this.state.count} second will be redirect to home automation.</h5>
            </div>
        );
    }
}


export default connect(null, { emailVerification })(Verified);