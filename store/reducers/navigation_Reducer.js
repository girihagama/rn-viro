import questions from '../../js/speech_and_buttons.json'

const initialState = {
    active_step: 0,
    active_step_data: questions[0]
}

function navigation_Reducer(state = initialState, action) {
    //console.log("Initial Reducer..");
    switch (action.type) {
        case 'setStep': {
            return action.payload;
        }
        default:
            return state;
    }
}

module.exports = navigation_Reducer