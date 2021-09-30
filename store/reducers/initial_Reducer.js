function initial_Reducer(state = { storeInitialized: true }, action) {
    console.log("Initial Reducer..");
    switch (action.type) {
        case 'initialize': {
            return state;
        }
        default:
            return state;
    }
}

module.exports = initial_Reducer