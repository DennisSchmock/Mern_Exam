/**
 * Created by Dennis on 18-06-2017.
 */
import axios from 'axios'
import {useStrict,} from 'mobx'

let url = 'http://localhost:3001/login'

useStrict(true)
class AuthStore {

    //Inspired by: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //todo implement httpOnly cookies
    static authenticateUser(token, userName) {
        localStorage.setItem('token', token)
        localStorage.setItem('userName', userName)
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') != null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    }

    static getToken() {
        return localStorage.getItem('token');
    }


    static login(userName, password, callback) {
        axios.post(url, {name: userName, password: password})
            .then((response) => {
                var token
                token = response.data.token
                this.authenticateUser(token, userName)
                callback(token);


            }).catch((err) => {
            callback(null)

        });
    }


}

export default AuthStore;