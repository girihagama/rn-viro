function main_Reducer(state = { storeInitialized: true }, action) {
    //console.log("Initial Reducer..");
    switch (action.type) {
        case 'initialize': {
            return action.payload;
        }
        default:
            return state;
    }
}

module.exports = main_Reducer