import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle product code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear current product selection',
    InitializeCurrentProduct = '[Product] Initialize current product',
    Load = '[Product] Load all products',
    LoadSuccess = '[Product] Products loading success',
    LoadFailure = '[Product] Products loading failed',
    UpdateProduct = '[Product] Update product details',
    UpdateProductSuccess = '[Product] Update product success',
    UpdateProductFail = '[Product] Update product failed',
    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',
    DeleteProductFail = '[Product] Delete Product failure',
    CreateProduct = '[Product] Create new product',
    CreateProductSuccess = '[Product] Create new product success',
    CreateProductFail = '[Product] Create new product failed ' 
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
export class UpdateProduct implements Action {
    readonly type  = ProductActionTypes.UpdateProduct;
    constructor(public payload: Product){}
}
export class UpdateProductSuccess implements Action {
    readonly type  = ProductActionTypes.UpdateProductSuccess;
    constructor(public payload: Product){}
}
export class UpdateProductFail implements Action {
    readonly type  = ProductActionTypes.UpdateProductFail;
    constructor(public payload: string){}
}
export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DeleteProduct;
    constructor(public payload: number) {}
}
export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DeleteProductSuccess;
    constructor(public payload: number) {}
}
export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DeleteProductFail;
    constructor(public payload: string) {}
}
export class CreateProduct implements Action {
    readonly type = ProductActionTypes.CreateProduct;
    constructor(public payload: Product) {}
}
export class CreateProductSuccess implements Action {
    readonly type = ProductActionTypes.CreateProductSuccess;
    constructor(public payload: Product){}
}
export class CreateProductFail implements Action {
    readonly type = ProductActionTypes.CreateProductFail;
    constructor(public payload: string) {}
}
export type ProductActions = ToggleProductCode 
| SetCurrentProduct 
| InitializeCurrentProduct 
| ClearCurrentProduct
| Load 
| LoadSuccess 
| LoadFailure
| UpdateProduct
| UpdateProductSuccess 
| UpdateProductFail
| DeleteProduct
| DeleteProductSuccess 
| DeleteProductFail
| CreateProduct
| CreateProductSuccess 
| CreateProductFail;