/* eslint-disable no-console */
import axios from 'axios'
let config = {
    baseURL: 'http://192.168.0.114:8000'
};
const _axios = axios.create(config);
export default {
    getQuestionnaireData(fingerprint, uri) {
        return new Promise((resolve, reject) => {
            _axios
                .get("/questionnaireEntity" + uri, {
                    params: {
                        fingerprint: fingerprint
                    }
                })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    },
    getSendDataFormat(uri) {
        return new Promise((resolve, reject) => {
            _axios.get("/result/template" + uri)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }
}