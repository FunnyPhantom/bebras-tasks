import algoreaReactTask from './algorea_react_task';

import {call, put, take, select, takeEvery} from 'redux-saga/effects'

import {Workspace} from './views';
import {generateKeyWithWord, ALPHABET_SIZE} from './utils';

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

export function run(container, options) {
    algoreaReactTask(container, options, TaskBundle)
};


function TaskBundle (bundle, deps) {

    bundle.use('requestHint')

    bundle.defineAction('taskInit', 'taskInit')
    bundle.addReducer('taskInit', function (state, action) {
        const {ciphers} = state.task;
        const answer = {
            key: [],
            wordCharIndex: 0,
            wordCipherIndex: null
        }
        for (let index = 0; index < ciphers[0].length; index++) {
            answer.key.push(0);
        }
        const hints = {}
        return updateWorkspace({...state, answer, hints})
    })


    bundle.defineAction('taskRefresh', 'taskRefresh')
    bundle.addReducer('taskRefresh', function (state, action) {
        return updateWorkspace(state)
    })


    bundle.defineView('Workspace', WorkspaceSelector, Workspace(deps))
    function WorkspaceSelector (state, props) {
        const {task, answer, workspace} = state;
        return {task, answer, workspace};
    }


    bundle.defineAction('keyChange', 'Workspace.KeyChange');
    bundle.addReducer('keyChange', function(state, action) {
        const {index, direction} = action;
        let {task, hints, answer} = state;
        const key = answer.key.slice();
        key[index] = (key[index] + parseInt(direction) + ALPHABET_SIZE) % ALPHABET_SIZE;
        answer = {...answer, key};
        return updateWorkspace({...state, answer})
    })



    bundle.defineAction('setPlainWordPosition', 'Workspace.SetPlainWordPosition');
    bundle.addReducer('setPlainWordPosition', function(state, action) {
        const {cipherIndex, charIndex} = action;
        let {answer} = state;
        answer = {...answer, wordCharIndex: charIndex, wordCipherIndex: cipherIndex};
        return updateWorkspace({...state, answer})
    })


    bundle.defineAction('showHintRequest', 'workspace.showHintRequest');
    bundle.addReducer('showHintRequest', (state, action) => {
        let {workspace} = state
        const {hintRequest} = action
        workspace = { ...workspace, hintRequest}
        return {...state, workspace}
    })


    bundle.defineAction('callHintRequest', 'workspace.callHintRequest');
    bundle.addSaga(function* () {
        yield takeEvery(deps.callHintRequest, function* (action) {
            const {hintRequest} = action
            yield put({type: deps.showHintRequest, hintRequest: undefined})
            yield put({type: deps.requestHint, request: hintRequest})
        })
    })

}



function updateWorkspace(state) {
    const {plainWord, ciphers} = state.task
    const {answer, hints} = state
    const {wordCharIndex, wordCipherIndex} = state.answer
    const workspace = {}
    workspace.keyWithHints = answer.key.map(function (value, index) {
        if(index in hints) {
            return {value: hints[index], isHint: true};
        } else {
            return {value: value, isHint: false};
        }
    })
    if(wordCipherIndex !== null) {
        workspace.keyWithWord = generateKeyWithWord(
            workspace.keyWithHints,
            plainWord,
            wordCharIndex,
            ciphers[wordCipherIndex]
        )
    } else {
        workspace.keyWithWord = workspace.keyWithHints;
    }
    return {...state, workspace}
}