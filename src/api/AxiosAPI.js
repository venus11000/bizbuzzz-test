import axios from 'axios';

let token = null;

if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
}

var AxiosAPI = token ? axios.create({
    baseURL: 'http://api.bizbuzzz.com/api/',
    headers: {
        common: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*'
        }
    }
}) : axios.create({
    baseURL: 'http://api.bizbuzzz.com/api/',
    headers: {
        common: {
            'Access-Control-Allow-Origin': '*'
        }
    }
});

export { AxiosAPI };
