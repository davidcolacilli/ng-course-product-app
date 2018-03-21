import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/iproduct';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: IProduct[] = [];
  constructor( private productService: ProductService) {
    // this.products = this.productService.products;
    this.productService.productObservable
      .subscribe( (products: IProduct[]) => this.products = products);
   }

  ngOnInit() {
  }

  delete(index: number) {
    this.productService.delete(index);
  }

}
