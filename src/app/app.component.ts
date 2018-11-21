import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { TBCompany } from './models/TBCompany';
import { TBSeller } from './models/TBSeller';
import { TeddyBear } from './models/TeddyBear';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  teddyBearList: TeddyBear[] = [];
  teddyBearCompanies: TBCompany[] = [];
  teddyBearSellers: TBSeller[] = [];

  title = 'dynamic-angular-crud';

  constructor(
    public ds: DataService
  ) { }

  ngOnInit(): void {
    const tbListObs = this.ds.readObs(TeddyBear);
    const tbCompObs = this.ds.readObs(TBCompany);
    const tbSellObs = this.ds.readObs(TBSeller);

    forkJoin([tbListObs, tbCompObs, tbSellObs])
      .subscribe(
        (res: any) => {
          this.teddyBearList = res[0];
          this.teddyBearCompanies = res[1];
          this.teddyBearSellers = res[2];
        },
        err => console.error(err)
      )
  }
}
