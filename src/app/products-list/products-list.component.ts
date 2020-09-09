import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  saveDashboardUrl  = environment.apiUrl + 'launches?limit=100';
  loadding = false;
  dataList:any = [];
  dataYear = [];
  apiParams:any = {
    limit : 100,
    launch_year : 2014,
    launch_success : true,
    land_success : true
  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformID: Object) {  
    for(let i = 2006; i<=2020; i++){
       this.dataYear.push(i);
    }
  }

  ngOnInit(): void {
    this.listDashboards(this.apiParams);
  }

  listDashboards(apiParams:any) {
    //if (isPlatformBrowser(this.platformID)) {
      this.loadding = true;
      this.http.get(this.saveDashboardUrl, { params : apiParams }).subscribe((res)=>{
        this.loadding = false;
        this.dataList = res;
      });
    //}
  }

  filterDataList(key, val) {
    this.dataList = [];
    this.apiParams[key] = val;
    this.listDashboards(this.apiParams);
  }
}
