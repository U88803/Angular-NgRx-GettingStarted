import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as  productActions  from '../state/product.actions';
@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle = 'Products';
	errorMessage: string;

	displayCode: boolean;

	products: Product[];

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;
	sub: Subscription;
	componentActive: boolean;
	products$: Observable<Product[]>;
	errorMessage$: Observable<string>;

	constructor(private productService: ProductService,
				private store : Store<fromProduct.State>) { }

	ngOnInit(): void {
		//todo : unsubscribe
		this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
			currentProduct => this.selectedProduct = currentProduct
		);
		this.store.dispatch(new productActions.Load());
		//todo : unsubscribe
		this.store.pipe(select(fromProduct.showProductCode)).subscribe(
			showProductCode => this.displayCode = showProductCode
		);
		// this.store.pipe(select(fromProduct.getProducts),takeWhile(()=> this.componentActive))
		// .subscribe(
		// 	products => this.products = products 
		// )
		this.products$ = this.store.pipe(select(fromProduct.getProducts))
		this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
	}

	ngOnDestroy(): void {
		this.componentActive = false;
	}

	checkChanged(value: boolean): void {
		this.store.dispatch(new productActions.ToggleProductCode(value));
	}

	newProduct(): void {
		this.store.dispatch(new productActions.InitializeCurrentProduct());
	}

	productSelected(product: Product): void {
		this.store.dispatch(new productActions.SetCurrentProduct(product));
	}

}
