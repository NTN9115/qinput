/* eslint-disable no-console */
import axios from 'axios'
let config = {
    baseURL: 'http://127.0.0.1:7999'
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
    },
    submitData( submitdata) {
        console.log(submitdata)
        return new Promise((resolve, reject) => {
            _axios.post("/result", submitdata)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
}