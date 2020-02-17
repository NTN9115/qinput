import axios from 'axios'
import secret from '../utils/secret'
import config from '../static/config'
let axiosConfig = {
    baseURL: config.url
};
const _axios = axios.create(axiosConfig);
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
    submitData(submitdata) {
        return new Promise((resolve, reject) => {
            _axios.post("/result", {
                data: secret.Encrypt(submitdata)
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
}