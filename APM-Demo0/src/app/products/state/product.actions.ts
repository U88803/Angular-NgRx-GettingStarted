import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle product code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear current product selection',
    InitializeCurrentProduct = '[Product] Initialize current product',
    Load = '[Product] Load all products',
    LoadSuccess = '[Product] Products loading success',
    LoadFailure = '[Product] Products loading failed' 
}
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) { }
}
export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) {}
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}
export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}
export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}
export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) {}
}
export class LoadFailure implements Action {
    readonly type = ProductActionTypes.LoadFailure;
    constructor(public payload: string) {}
}
export type ProductActions = ToggleProductCode 
| SetCurrentProduct 
| InitializeCurrentProduct 
| ClearCurrentProduct
| Load 
| LoadSuccess 
| LoadFailure;