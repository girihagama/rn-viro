const initial_Reducer = (state = {store:true}, action) => {
    console.log("Initial Reducer..");
    switch (action.type) {
        case 'initialize': {
            return state;
        }
        default:
            return state;
    }
}

export default initial_Reducer;