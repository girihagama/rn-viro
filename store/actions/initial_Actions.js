export const initializeStore = (props) => {
    console.log("Initiating Global Store..");
    return {
        type: 'initialize',
        data: props
    }
}