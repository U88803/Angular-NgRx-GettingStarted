import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as productActions from '../state/product.actions';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable() 
export class ProductEffects {
    constructor(private actions$: Actions,
                private productService: ProductService){}

    @Effect()
    createProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.createProduct(product).pipe(
                map((createdProduct: Product) => (new productActions.CreateProductSuccess(createdProduct))),
                catchError(error=> of (new productActions.CreateProductFail(error)))
            )
        )
    )
    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) =>
            this.productService.getProducts().pipe(
                map((products:Product[]) => (new productActions.LoadSuccess(products))),
                catchError(error => of(new productActions.LoadFailure(error)))

            )
        )
    )
    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updatedProduct  => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of (new productActions.UpdateProductFail(err)))
            )
        )
    )
    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap( (productId: number) =>
            this.productService.deleteProduct(productId).pipe(
                map(() => (new productActions.DeleteProductSuccess(productId))),
                catchError(error => of(new productActions.DeleteProductFail(error) ))
            )
        )
    )
}