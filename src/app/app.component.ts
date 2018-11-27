import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Company } from './models/Company';
import { Seller } from './models/Seller';
import { Product } from './models/Product';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  companies: Company[] = [];
  sellers: Seller[] = [];

  title = 'dynamic-angular-crud';

  constructor(
    public ds: DataService
  ) { }

  ngOnInit(): void {
    const productObs = this.ds.readObs(Product);
    const companyObs = this.ds.readObs(Company);
    const sellerObs = this.ds.readObs(Seller);

    forkJoin([productObs, companyObs, sellerObs])
      .subscribe(
        (res: any) => {
          this.products = res[0];
          this.companies = res[1];
          this.sellers = res[2];
        },
        err => console.error(err)
      )
  }
}
