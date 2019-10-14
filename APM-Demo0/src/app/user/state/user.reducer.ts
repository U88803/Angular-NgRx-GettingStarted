import { User } from '../user';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface State extends fromRoot.State{
    user:  UserState
}
// for lazy loading purpose -- extending app state
export interface UserState  {
    maskUserName : boolean;
}

const initialState:UserState = {
    maskUserName : true,
}
const getProductFeatureState = createFeatureSelector<UserState>('user');
export const maskUserName = createSelector(
    getProductFeatureState,
    state => state.maskUserName
);
export function reducer(state = initialState,action) {
    switch(action.type) {
        case 'MASK_USER_NAME': 
        return {
            ...state,
            maskUserName : action.payload
        }
        default: return state;
    }
}