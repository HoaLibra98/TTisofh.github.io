const reducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case 'UPDATE_DATE_USER':
            newState = {...state, ...action.data || {}}
            return newState;
        default:
            return state
    }
}
export default reducer;