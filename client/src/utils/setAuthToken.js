import axios from 'axios';

export default setAuthToken = (token) => {
    if (token) {
        //sets default auth token for every request
        axios.defaults.headers.common["Authorisation"] = token;
    } else {
        delete axios.defaults.headers.common["Authorisation"];
    }
}