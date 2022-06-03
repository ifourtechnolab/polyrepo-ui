import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { DatePipe } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trendcapture',
  templateUrl: './trendcapture.component.html',
  styleUrls: ['./trendcapture.component.css'],
  providers: [DatePipe]
})
export class TrendcaptureComponent implements OnInit {

  userID = this.util.getUserId();
  interval : any;
  queryIDArr : any[] = [];
  queryID1 : any;
  queryID2 : any;
  queryID3 : any;
  trendResult1 : any[] = [];
  trendResult2 : any[] = [];
  trendResult3 : any[] = [];
  trendDetails1 : any;
  trendDetails2 : any;
  trendDetails3 : any;
  trendDate1 : any[] = [];
  trendDate2 : any[] = [];
  trendDate3 : any[] = [];
  public barChartLabels1 = null;
  public barChartLabels2 = null;
  public barChartLabels3 = null;
  public barChartData1 : ChartDataset[] = null;
  public barChartData2 : ChartDataset[] = null;
  public barChartData3 : ChartDataset[] = null;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  dataArray = new Array();
  constructor(private http: HttpService, private util:UtilService, private datepipe : DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.trendCaptureResult();
    this.trendList();
  }
  trendCaptureResult(){
    this.http.getTrendResult(this.userID).subscribe((result:any) => { 
      for(let i = 0; i < Object.values(result).length; i++){
        this.dataArray.push(Object.values(result)[i]);
        this.queryIDArr.push(Object.values(result)[i][1].queryId)
        if(i == 0){
          for(let j = 0; j < this.dataArray[i].length; j++){ 
            this.trendResult1.push(this.dataArray[i][j].result);
            let changedDate = this.datepipe.transform(this.dataArray[i][j].dateOfResult, 'dd/MM')
            this.trendDate1.push(changedDate);          
          }
          this.queryID1 = this.queryIDArr[i]
          this.barChartLabels1 = this.trendDate1
          this.barChartData1 = [{ 
          data: this.trendResult1, 
          label: 'Count', 
          backgroundColor: 'rgba(0, 175, 0,0.5)', 
          hoverBackgroundColor: 'rgba(0, 175, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
        if(i == 1){
          for(let j = 0; j < this.dataArray[i].length; j++){ 
            this.trendResult2.push(this.dataArray[i][j].result);
            let changedDate = this.datepipe.transform(this.dataArray[i][j].dateOfResult, 'dd/MM')
            this.trendDate2.push(changedDate);          
          }
          this.queryID2 = this.queryIDArr[i]
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
            let changedDate = this.datepipe.transform(this.dataArray[i][j].dateOfResult, 'dd/MM')
            this.trendDate3.push(changedDate);          
          }
          this.queryID3 = this.queryIDArr[i]
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

  removeTrendQuery(queryId){
    this.http.unsetTrendResult(queryId).subscribe((message : any) => {
      if(message.message == "Query Removed from Trend Capture"){
        this.toastr.success('', 'Trend query deleted', {
          positionClass: 'toast-top-center',
          closeButton: true,
          easeTime: 250,
        });
      }
    })
    this.interval = setInterval(() => {
      window.location.reload();
    }, 1000);  
  }
}
