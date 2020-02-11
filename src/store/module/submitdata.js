/* eslint-disable no-console */
import Fingerprint2 from "fingerprintjs2";
import api from '../../api/index';
const state = {
    submitData: {
    },
    fingerprint: '',
    qData: {},
    uri: ''
}

const getters = {
    get(state) {
        return state.submitData;
    },
    getFingerprint(state) {
        return state.fingerprint;
    },
    getQData(state) {
        return state.qData;
    },
    getAnswerGroups: (state) => (index) => {
        return state.submitData.result_groups[index];
    },
    getAnswerGroup: (state) => (indexa, indexb) => {
        return state.submitData.result_groups[indexa].results[indexb];
    },
    getAnswer: (state) => (index) => {
        return state.submitData.result_groups[index[0]].results[index[1]].answer_cells[index[2]];
    },
    getGroupAnsweredPercentage: (state) => (index) => {
        let group = state.submitData.result_groups[index].results;
        let length = group.length;
        let answerd = 0;
        for (let i = 0; i < group.length; i++) {
            const element = group[i];
            let a = element.answers;
            for (let b = 0; b < a.length; b++) {
                const n = a[b];
                if (n !== "" || n !== null || n !== []) {
                    answerd++;
                    break;
                }
            }
        }
        return answerd / length;
    }
}

const mutations = {
    setAnswer(state, payload) {
        state.submitData.result_groups[payload.index[0]].results[payload.index[1]].answer_cells[payload.index[2]]['answer'] = payload.answer;

    },
    setQd(state, qData) {
        state.qData = qData;
    },
    setUri(state, uri) {
        state.uri = uri;
    },
    setSubmitData(state, submitData) {
        state.submitData = submitData;
    },
    setFp(state, payload) {
        state.fingerprint = payload.fingerprint;
    }

}

const actions = {
    setAnswer(context, payload) {
        context.commit('setAnswer', payload);
    },
    setQData({ commit, state }) {
        api.getQuestionnaireData(state.fingerprint, state.uri).then(data => {
            console.log(data)
            commit('setQd', data)
        });
    },
    init({ commit, state }) {
        return new Promise(resolve => {
            Fingerprint2.get(components => {
                var values = components.map(function (component, index) {
                    if (index === 0) {
                        return component.value.replace(/\bNetType\/\w+\b/, "");
                    }
                    return component.value;
                });
                var murmur = Fingerprint2.x64hash128(values.join(""), 31);
                commit('setFp', { fingerprint: murmur });
                api.getSendDataFormat(state.uri)
                    .then((data) => {
                        data.data.result_groups.forEach(v1 => v1.results.forEach(v2 => v2.answer_cells.forEach(v3 => v3['answer'] = '')))
                        commit('setSubmitData', data.data)
                    })
                    .then(() => api.getQuestionnaireData(state.fingerprint, state.uri)
                        .then((data) => commit('setQd', data)));

                return resolve();
            });
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}