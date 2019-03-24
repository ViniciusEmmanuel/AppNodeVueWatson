import axios from 'axios';

const url = 'http://localhost:8080/';
const path = ['translate', 'personality'];

class func {
    static postTranslate(dados) {
        return axios.post(url+path[0], dados);
    }

    static postPersonality(dados) {
        return axios.post(url+path[1] , dados);
    }
}

export default func;
