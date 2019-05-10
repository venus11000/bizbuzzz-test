import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import { Layout } from 'antd';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import ProfileDefault from '../../images/default-profile.png';

import { updateUser } from '../../actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                displayName: '',
                email: '',
                phoneNumber: '',
                photoURL: '',
                providerId: '',
                uid: '',
                emailVerified: false,
                isAnonymous: false
            },
            enableSubmit: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(props) {
        if (props.userDetails) {
            let userDetails = { ...props.userDetails };
            let fields = {
                ...this.state.fields,
                displayName: userDetails.displayName,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber,
                photoURL: userDetails.photoURL,
                providerId: userDetails.providerId,
                uid: userDetails.uid,
                emailVerified: userDetails.emailVerified,
                isAnonymous: userDetails.isAnonymous
            }
            this.setState({ fields });
        }
    }
    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        let fields = { ...this.state.fields };

        switch (fieldName) {
            default: fields[fieldName] = fieldValue;
        }

        this.setState({ fields });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.fields);
        this.props.updateUser(this.state.fields);
    }
    render() {
        const { Content } = Layout;
        let fields = { ...this.state.fields }
        return (
            <Content>
                <div className="profile-container">
                    <div className="profile-content">
                        <h2 className="profile-title">Profile</h2>
                        <div className="profile-image-container">
                            <div className="profile-image">
                                <img src={fields.photoURL ? 'data:image/jpeg;base64, ' + fields.photoURL : ProfileDefault} />
                            </div>
                        </div>
                        <Input
                            label="Fullname"
                            name="displayName"
                            onChange={this.handleChange}
                            value={fields.displayName}
                            required={true}
                        />

                        <Input
                            label="E mail"
                            name="email"
                            onChange={this.handleChange}
                            value={fields.email}
                        />

                        <Input
                            label="Phone Number"
                            name="phoneNumber"
                            onChange={this.handleChange}
                            value={fields.phoneNumber}
                            disabled={true}
                        />

                        <Button
                            onClick={this.handleSubmit}
                            disabled={this.state.enableSubmit}
                            label="Update"
                        />
                    </div>
                </div>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);