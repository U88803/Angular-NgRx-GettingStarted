import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from './product.actions'; 
export interface State extends fromRoot.State{
    products:  ProductState
}
// for lazy loading purpose -- extending app state
export interface ProductState  {
    showProductCode : boolean;
    currentProductId: number | null;
    products: Product[],
    error : string
}

const initialState:ProductState = {
    showProductCode : true,
    currentProductId : null,
    products : [],
    error: ''
}
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const showProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state=> state.currentProductId
);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId)=> {
        if(currentProductId == 0) {
            return {
                id: 0,
                productName: '',
                productCode : 'New',
                description : '',
                starRating : 0
            }
        } else {
            return currentProductId? state.products.find(p=> p.id == currentProductId) : null;
        }
    }
);
export const getProducts = createSelector(
    getProductFeatureState,
    state=> state.products
);
export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)
export function reducer(state = initialState, action:ProductActions): ProductState {
    switch(action.type) {

        case ProductActionTypes.ToggleProductCode : 
        return {
            ...state,
            showProductCode: action.payload
        };
        case ProductActionTypes.SetCurrentProduct : 
        return {
            ...state,
            currentProductId : action.payload.id
        }
        case ProductActionTypes.ClearCurrentProduct : 
        return {
            ...state,
            currentProductId : null
        }
        case ProductActionTypes.InitializeCurrentProduct : 
        return {
            ...state,
            currentProductId : 0
        }
        case ProductActionTypes.LoadSuccess : 
        return {
            ...state,
            products : action.payload,
            error : ''
        }
        case ProductActionTypes.LoadFailure : 
        return {
            ...state,
            products : [],
            error: action.payload
        }
        case ProductActionTypes.UpdateProductSuccess : 
        const updatedProducts = state.products.map(
            product => (action.payload.id === product.id) ? action.payload : product
        );
        return {
            ...state,
            products : updatedProducts,
            currentProductId : action.payload.id,
            error: ''
        };
        case ProductActionTypes.UpdateProductFail : 
        return {
            ...state,
            error: action.payload
        }
        case ProductActionTypes.DeleteProductSuccess : 
        const newProductSet = state.products.filter(product => product.id !== action.payload)

        return {
            ...state,
            products : newProductSet

        }
        case ProductActionTypes.DeleteProductFail : 
        return {
            ...state,
            error : action.payload
        }
        case ProductActionTypes.CreateProductSuccess: 
        console.log("action",action.payload)
        const newProductArray = [...state.products, action.payload];
        return {
            ...state,
            products: newProductArray,
            currentProductId: action.payload.id,
            error: ''
        }
        case ProductActionTypes.CreateProductFail:
        return {
            ...state,
            error: action.payload
        }
        default : return state;
    }
}