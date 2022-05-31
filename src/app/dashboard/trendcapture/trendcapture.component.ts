import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartDataset } from 'chart.js';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';


@Component({
  selector: 'app-trendcapture',
  templateUrl: './trendcapture.component.html',
  styleUrls: ['./trendcapture.component.css']
})
export class TrendcaptureComponent implements OnInit {

  userID = this.util.getUserId();
  trendResult1 : any[] = [];
  trendResult2 : any[] = [];
  trendResult3 : any[] = [];
  trendDetails1 : any;
  trendDetails2 : any;
  trendDetails3 : any;
  trendDate1 : any[] = [];
  trendDate2 : any[] = [];
  trendDate3 : any[] = [];
  public barChartLabels1 = [];
  public barChartLabels2 = [];
  public barChartLabels3 = [];
  public barChartData1 : ChartDataset[] = [];
  public barChartData2 : ChartDataset[] = [];
  public barChartData3 : ChartDataset[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  dataArray = new Array();

  constructor(private http: HttpService, private util:UtilService) { }

  ngOnInit(): void {
    console.log("user id : ",this.userID);
    this.trendCaptureResult();
    this.trendList();
  }
  
  trendCaptureResult(){
    this.http.getTrendResult(this.userID).subscribe((result:any) => { 
      for(let i=0; i < Object.values(result).length; i++){
        this.dataArray.push(Object.values(result)[i]);
      }      
      for(let i = 0; i < Object.values(result).length; i++){
        if(i == 0){
          for(let j = 0; j < this.dataArray[i].length; j++){ 
            debugger
            this.trendResult1.push(this.dataArray[i][j].result);
            this.trendDate1.push(this.dataArray[i][j].dateOfResult);
          }
          this.barChartLabels1 = this.trendDate1
          this.barChartData1 = [{ 
          data: this.trendResult1, 
          label: 'Count', 
          backgroundColor: 'rgba(255, 0, 0,0.5)', 
          hoverBackgroundColor: 'rgba(255, 0, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
        if(i == 1){
          for(let j = 0; j < this.dataArray[i].length; j++){ 
            this.trendResult2.push(this.dataArray[i][j].result);
            this.trendDate2.push(this.dataArray[i][j].dateOfResult);
          }
          this.barChartLabels2 = this.trendDate2
          this.barChartData2 = [{ 
          data: this.trendResult2, 
          label: 'Count', 
          backgroundColor: 'rgba(0, 175, 0,0.5)', 
          hoverBackgroundColor: 'rgba(0, 175, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
        if(i == 2){
          for(let j = 0; j < this.dataArray[i].length; j++){ 
            this.trendResult3.push(this.dataArray[i][j].result);
            this.trendDate3.push(this.dataArray[i][j].dateOfResult);
          }
          this.barChartLabels3 = this.trendDate3
          this.barChartData3 = [{ 
          data: this.trendResult3, 
          label: 'Count', 
          backgroundColor: 'rgba(0, 0, 255,0.5)', 
          hoverBackgroundColor: 'rgba(0, 0, 255,0.7)', 
          borderColor: '#664983',
         }];
        }
      }
    });
  }

  trendList(){
    this.http.getTrendList(this.userID).subscribe((list : any) => {
      this.trendDetails1 = Object.values(list)[0]      
      this.trendDetails2 = Object.values(list)[1]      
      this.trendDetails3 = Object.values(list)[2]      
    })
  }
}
