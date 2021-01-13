import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeAdmin.css';


class HomeAdmin extends Component {
    
    render() {
        return (
            <div>
                <div className="card-home-admin">
                    <div className="title-home-admin">Welcome Home, {!this.props.nickname ? 'Admin' : this.props.nickname}!</div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({adminProfile}) => {
    return {
        nickname: adminProfile.dataAdminProfileByUser.nickname
    }
}

export default connect(mapStatetoProps)(HomeAdmin);