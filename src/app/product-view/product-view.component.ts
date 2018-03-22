import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../service/product.service';
import { IProduct } from '../model/iproduct';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  // @Input('productId') productId: number;

  public product: IProduct;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const { productId } = params;
        this.productService.get( productId )
          .subscribe( (product: IProduct) => {
            this.product = product;
          });
      });
  }

  ngOnInit() {
  }

}
