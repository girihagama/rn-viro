export function initializeStore(questions) {
    //console.log("Initiating Global Store..");
    return {
        type: 'initialize',
        payload: {questions}
    }
}