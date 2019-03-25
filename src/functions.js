import axios from 'axios';

const url = '/api/';
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
