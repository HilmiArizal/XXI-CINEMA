import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resendEmail } from '../../../../Redux/Action';
import Success from '../../../Assets/Images/success.png';
import Loading from '../../../Assets/Images/loading.gif';
import './Unverified.css';
import { Redirect } from 'react-router-dom';


class Unverified extends Component {

    state = {
        loading: false,
        success: false
    }

    onBtnLoading = () => {
        this.props.resendEmail();

        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ success: true })
        }, 2000);
    }

    render() {
        if (this.props.status === 'verified') {
            return (
                <Redirect to='/'></Redirect>
            )
        }
        return (
            <div className="text-center" style={{ marginTop: '5%' }}>
                <h1 >{this.state.success ? 'Check your email!' : `Your account hasn't verified!`}</h1>
                {
                    this.state.loading
                        ?
                        this.state.success
                            ?
                            <img src={Success} alt="success-img" className="success-img" />
                            :
                            <img src={Loading} alt="loading-gif" className="loading-gif" />
                        :
                        <div className="btn btn-sm" id="btn-action-unverified" onClick={this.onBtnLoading}>SEND EMAIL NOW</div>
                }

            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        status: auth.dataUser.status
    }
}

export default connect(mapStatetoProps, { resendEmail })(Unverified);