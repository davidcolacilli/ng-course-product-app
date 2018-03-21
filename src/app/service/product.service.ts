import { HttpClient } from '@angular/common/http';

import { IProduct } from '../model/iproduct';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {
  private endpoint: string = '//localhost:3000/products';
  private _products: IProduct[] = [];

  private _productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public productObservable$: Observable<IProduct[]> = this._productsSubject.asObservable();

  constructor( private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    // using generics to define the returning type of the response
    this.http.get<IProduct[]>(this.endpoint)
      .subscribe(
        (response) => {
          this.setProducts(response);
        },
        (error) => console.error( 'There was a problem trying to get the product list', error)
      );
  }

  private setProducts(products: IProduct[]) {
    this._products = products;
    this._productsSubject.next(this._products);
  }

  get products(): IProduct[] {
    return this._products;
  }

  delete(index: number) {
    const product: IProduct = this._products.splice(index, 1).shift();
    this.http.delete( [this.endpoint, product.id].join('/') )
      .subscribe(
        ( response ) => this.loadProducts(),
        ( error ) => console.error( 'There was a problem trying to delete the product', error)
      );

  }


}
