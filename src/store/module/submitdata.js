/* eslint-disable no-console */
import Fingerprint2 from "fingerprintjs2";
import api from '../../api/index';
import secret from '../../utils/secret'

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
    getFirstAnswer: (state) => (index) => {
        return state.qData.data.question_group[index[0]].question_cells[index[1]].answer_cells[0];
    },
    getAnswer: (state) => (index) => {
        return state.submitData.submit_result_group[index[0]].result_cells[index[1]].answer;
    },
    getGroupAnsweredPercentage: (state) => (index) => {
        let group = state.submitData.submit_result_group[index].result_cells;
        let length = group.length;
        let answerd = 0;
        let must_length = 0;
        let must_answerd = 0;
        let color = '';
        for (let i = 0; i < length; i++) {
            const resultCell = group[i];
            if (resultCell.must_answer) {
                must_length++;
            }
            const n = resultCell.answer;
            if (n !== "" && n != null && n.length != 0) {
                answerd++;
                if (resultCell.must_answer) {
                    must_answerd++;
                }
            }

        }
        if (must_answerd === must_length) {
            color = '#409EFF'
        } else {
            color = '#787878'
        }


        return {
            percentage: answerd / length * 100,
            color: color
        }
    },
    getCurrentFinishStatus: (state) => {
        for (let i = 0; i < state.currentIndex.length; i++) {
            const index = state.currentIndex[i];
            let question = state.submitData.submit_result_group[index[0]].result_cells[index[1]];
            console.log(question)
            if (question.must_answer) {
                if (question.answer == "" || question.answer == null || question.answer.length == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

const mutations = {
    setAnswer(state, payload) {
        state.submitData.submit_result_group[payload.index[0]].result_cells[payload.index[1]]['answer'] = payload.answer;

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
                api.getQuestionnaireData(state.fingerprint, state.uri)
                    .then((data) => {
                        if (data.code == 200) {
                            let decryptData = secret.Decrypt(data.data);
                            data.data = decryptData;
                            document.title = "问卷调查-" + data.data.title;
                            let uriList = state.uri.split('/');
                            let id = uriList[1];
                            let fp = state.fingerprint;
                            if (uriList.length == 3) {
                                fp = uriList[2];
                            }
                            commit('setSubmitData', {
                                id: id,
                                finger_print: fp,
                                submit_result_group: decryptData.submit_result_template.submit_result_group
                            })
                        }
                        commit('setQd', data)
                    });
                return resolve();
            })
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