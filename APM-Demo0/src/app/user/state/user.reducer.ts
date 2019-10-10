export function reducer(state,action) {
    switch(action.type) {
        case 'MASK_USER_NAME': 
        console.log('action',action);
        console.log('previous state',state);
        return {
            ...state,
            maskUserName : action.payload
        }
        default: return state;
    }
}