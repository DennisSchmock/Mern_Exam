import React, {Component}  from 'react';
import {Link} from "react-router";
import AlertContainer from 'react-alert'


import AuthStore from '../../models/AuthStore'

export default class LoginForm extends Component {

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }

    showAlert = function(){
        // this.msg.show('Some text or component', {
        //     time: 2000,
        //     type: 'success'
        //
        // })
    }

    //todo - use state to handle values from form
    handleSubmit(event) {
        event.preventDefault()
        let password = event.target.password.value
        let userName = event.target.userName.value
        AuthStore.login(userName, password, (token) => {
            if (token == null) {
                //Show some alert here if fail
            }
            window.location = '/';

        })
    }

    handleLogout(event) {
        AuthStore.deauthenticateUser();

    }

    render() {
        if (!AuthStore.isUserAuthenticated()) {
            return (

                <div>
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="userName"
                                className="form-control input-sm"
                                placeholder="Username"
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control input-sm"
                                required={true}
                            />

                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Login</button>
                        </div>

                    </form>

                </div>

            )
        }
        else {
            return (
                <div>
                    <div>Welcome user</div>
                    <Link to="/" onClick={this.handleLogout}>logout</Link>
                </div>
            )
        }
    }


}