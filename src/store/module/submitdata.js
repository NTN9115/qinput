/* eslint-disable no-console */
import Fingerprint2 from "fingerprintjs2";
import api from '../../api/index';
const state = {
    submitData: {
    },
    fingerprint: '',
    qData: {
        data: {
            title: ''
        }
    },
    uri: '',
    currentIndex: []
}

const getters = {
    get(state) {
        return state.submitData;
    },
    getFingerprint(state) {
        return state.fingerprint;
    },
    getTitle(state) {
        return state.qData.data.title;
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
        return state.submitData.result_groups[index[0]].results[index[1]].answer_cells[index[2]].answer;
    },
    getGroupAnsweredPercentage: (state) => (index) => {
        let group = state.submitData.result_groups[index].results;
        let length = group.length;
        let answerd = 0;
        let must_length = 0;
        let must_answerd = 0;
        let status = '';
        for (let i = 0; i < length; i++) {
            const element = group[i];
            let a = element.answer_cells;
            let must = element.must_answer;
            if (must == 1) {
                must_length++;
            }
            for (let b = 0; b < a.length; b++) {
                const n = a[b].answer;
                if (n !== "" && n != null && n.length != 0) {
                    answerd++;
                    if (must == 1) {
                        must_answerd++;
                    }
                    break;
                }
            }
        }
        if (must_answerd === must_length) {
            status = 'success'
        } else {
            status = 'warning'
        }


        return {
            percentage: answerd / length * 100,
            status: status
        }
    },
    getCurrentFinishStatus: (state) => {
        for (let i = 0; i < state.currentIndex.length; i++) {
            const index = state.currentIndex[i];
            let question = state.submitData.result_groups[index[0]].results[index[1]];
            if (question.must_answer == 1) {
                for (let b = 0; b < question.answer_cells.length; b++) {
                    const n = question.answer_cells[b];

                    if (n.type == 'comment') {
                        if (n.empty == false && (n.answer === "" || n.answer == null)) {
                            return true;
                        }
                    } else if (n.answer === "" || n.answer == null || n.answer.length == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

const mutations = {
    setAnswer(state, payload) {
        state.submitData.result_groups[payload.index[0]].results[payload.index[1]].answer_cells[payload.index[2]]['answer'] = payload.answer;

    },
    setCurrentIndex(state, currentIndex) {
        state.currentIndex = currentIndex;
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

                api.getSendDataFormat('/' + state.uri.split('/')[1])
                    .then((data) => {
                        console.log(data.code)
                        if (data.code == 200) {
                            data.data.result_groups.forEach(v1 => v1.results.forEach(v2 => v2.answer_cells.forEach(v3 => {
                                v3.type == 'choice' ? v3['answer'] = [] : v3['answer'] = null
                            })));
                            let u = state.uri.split('/');
                            if (u.length == 3) {
                                data.data.finger_print = u[2];
                            } else {
                                data.data.finger_print = murmur;
                            }
                            commit('setSubmitData', data.data)
                        }
                    })
                    .then(() => api.getQuestionnaireData(state.fingerprint, state.uri)
                        .then((data) => {
                            if (data.code == 200) {
                                document.title = "问卷调查-" + data.data.title;
                            }
                            commit('setQd', data)
                        }));

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