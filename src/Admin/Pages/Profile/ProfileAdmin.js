import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminProfile, getAdminProfileByUser, addAdminProfile, editAdminProfile } from '../../../Redux/Action';
import ImgProfile from '../../Assets/AkunImage.png';
import { MDBContainer } from 'mdbreact';
import './ProfileAdmin.css';
import { API_URL } from '../../../Helpers';


class ProfileAdmin extends Component {

    state = {
        fullname: '',
        nickname: '',
        imageprofile: null,
        previewImage: null,
        changeImage: false,
    }

    componentDidMount() {
        this.props.getAdminProfile();
        this.props.getAdminProfileByUser();
    }

    onKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.onBtnAdmin();
        }
    }

    onChangeImg = (e) => {
        if (e.target.files[0]) {
            this.setState({
                changeImage: true,
                imageprofile: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    onBtnAdmin = (e) => {
        e.preventDefault();

        if (this.props.dataAdminProfile.length === 0) {
            let reset = '#form-profile-admin';
            let fullname = this.state.fullname;
            let nickname = this.state.nickname;
            let { imageprofile } = this.state;
            let dataProfileAdmin = { fullname, nickname }
            if (this.props.dataAdminProfile.length >= 1) {
                this.props.editAdminProfile(dataProfileAdmin, imageprofile);
            } else {
                this.props.addAdminProfile(dataProfileAdmin, imageprofile, reset);
            }
        } else {
            this.props.dataAdminProfile.map((item, index) => {
                let fullname = this.state.fullname === '' ? item.fullname : this.state.fullname;
                let nickname = this.state.nickname === '' ? item.nickname : this.state.nickname;
                let changeImage = this.state.changeImage;
                let imageprofile = this.state.imageprofile === null ? API_URL + item.imageprofile : this.state.imageprofile;
                let dataProfileAdmin = { fullname, nickname, changeImage }
                if (this.props.dataAdminProfile.length >= 1) {
                    this.props.editAdminProfile(dataProfileAdmin, imageprofile);
                } else {
                    this.props.addAdminProfile(dataProfileAdmin, imageprofile);
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div className="card-profile-admin">
                    <div className="title-profile-admin">Welcome Profile, {this.props.nickname}!</div>
                    <MDBContainer>
                        <div className="form-profile-admin">Input full your identity for account as admin!</div>
                        <br />
                        <div className="input-profile-admin">
                            {
                                this.props.dataAdminProfile.length > 0
                                    ?
                                    this.props.dataAdminProfile.map((item, index) => {
                                        return (
                                            <div className="left-profile-admin" key={index}>
                                                <div className="form-group">
                                                    {
                                                        this.state.changeImage
                                                            ?
                                                            <img src={this.state.previewImage} alt="img-profile" className="img-profile" />
                                                            :
                                                            <img src={API_URL + item.imageprofile === null ? ImgProfile : API_URL + item.imageprofile} alt="img-profile" className="img-profile" />
                                                    }
                                                    <div className="img-input">
                                                        <input type="file" onChange={this.onChangeImg} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Fullname</label>
                                                    <input type="text" defaultValue={item.fullname} className="form-control form-control-sm" onChange={(e) => this.setState({ fullname: e.target.value })} onKeyPress={this.onKeyPress} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Nickname</label>
                                                    <input type="text" defaultValue={item.nickname} className="form-control form-control-sm" onChange={(e) => this.setState({ nickname: e.target.value })} />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <form className="left-profile-admin" id="form-profile-admin">
                                        <div className="form-group">
                                            {
                                                this.state.changeImage
                                                    ?
                                                    <img src={this.state.previewImage} alt="img-profile" className="img-profile" />
                                                    :
                                                    <img src={ImgProfile} alt="img-profile" className="img-profile" />
                                            }
                                            <div className="img-input">
                                                <input type="file" onChange={this.onChangeImg} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Fullname</label>
                                            <input type="text" className="form-control form-control-sm" onChange={(e) => this.setState({ fullname: e.target.value })} onKeyPress={this.onKeyPress} />
                                        </div>
                                        <div className="form-group">
                                            <label>Nickname</label>
                                            <input type="text" className="form-control form-control-sm" onChange={(e) => this.setState({ nickname: e.target.value })} />
                                        </div>
                                    </form>
                            }
                            <div className="">
                                <button className="btn btn-primary btn-sm" id="btn-profile-admin" onClick={this.onBtnAdmin}>SUBMIT</button>
                            </div>
                        </div>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}


const mapStatetoProps = ({ adminProfile }) => {
    return {
        dataAdminProfile: adminProfile.dataAdminProfile,
        dataAdminProfileByUser: adminProfile.dataAdminProfileByUser,
        nickname: adminProfile.dataAdminProfileByUser.nickname
    }
}

export default connect(mapStatetoProps, { getAdminProfile, getAdminProfileByUser, addAdminProfile, editAdminProfile })(ProfileAdmin);