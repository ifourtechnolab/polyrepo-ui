import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset, ChartConfiguration } from 'chart.js';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { ToastrService } from 'ngx-toastr';
import { NgChartsConfiguration } from 'ng2-charts';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-pinnedquery',
  templateUrl: './pinnedqueryresult.component.html',
  styleUrls: ['./pinnedqueryresult.component.css']
})
export class PinnedqueryComponent implements OnInit {

  pinnedData : any[] = [];
  queryIDArr: any[] = [];
  queryID1: any;
  queryID2: any;
  queryID3: any;
  queryID4: any;
  titleArr : any[] = [];
  title1 : any;
  title2 : any;
  title3 : any;
  title4 : any;
  demo1 : any[] = [];
  demo2 : any[] = [];
  demo3 : any[] = [];
  demo4 : any[] = [];
  total1 : any[] = [];
  total2 : any[] = [];
  total3 : any[] = [];
  total4 : any[] = [];
  repoName1 : any[] = [];  
  repoName2 : any[] = [];  
  repoName3 : any[] = [];  
  repoName4 : any[] = []; 
  
  public barChartLabels1 = null;
  public barChartLabels2 = null;
  public barChartLabels3 = null;
  public barChartLabels4 = null;
  public barChartData1 : ChartDataset[] = null;
  public barChartData2 : ChartDataset[] = null;
  public barChartData3 : ChartDataset[] = null;
  public barChartData4 : ChartDataset[] = null;
  // public barChartOptions = null;

  // public barChartOptions1: any = {
  //   // onClick: this.chartClicked1,
  //   responsive: true,
  //   scales: {
  //    yAxes: [
  //      {
  //       display: true,
  //      scaleLabel: {
  //       display: true,
  //       labelString: "Number of Reads",
  //      },
  //     },
  //    ],
  //    xAxes: [
  //     {
        
  //      scaleLabel: {
  //       display: true,
  //       labelString: "Date",
  //      },
  //     },
  //    ],
  //   },
  //  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  interval: any;
  noResult : boolean = false;
  pinnedResultData1:any;
  pinnedResultData2:any;
  pinnedResultData3:any;
  pinnedResultData4:any;

  constructor(private http: HttpService, private util:UtilService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.pinnedResult();
  }

  pinnedResult(){
    this.http.getPinnedResult(this.util.getUserId()).subscribe((result : any) => {
      // this.setChart1Data(result);
      if(result.message == "No Pinned Analysis"){
        this.noResult = true
      }
      // for title of charts
      for( let i = 0; i < Object.values(result).length-1; i++){
        let title = Object.values(result)[i]        
        this.titleArr.push(Object.values(title)[0].title)
      }
      
      // for queryID of charts
      for( let i = 0; i < Object.values(result).length-1; i++){
        this.queryIDArr.push(Object.keys(result)[i])
      }      
      // for label on x-axis on charts
      for(let i = 0; i < Object.values(result).length-1; i++){
        let allRepoDetail = Object.values(result)[i]
        let aaa = Object.values(allRepoDetail)[3]        
        if(i == 0){
          this.pinnedResultData1 = Object.values(result)[0];
          this.queryID1 = this.queryIDArr[i]
          for( let j = 0; j < Object.values(aaa).length; j++){
            let bbb = Object.values(aaa)[j]
            this.repoName1.push(Object.values(bbb)[1])
          }
        }
        if(i == 1){
          this.pinnedResultData2 = Object.values(result)[1];
          this.queryID2 = this.queryIDArr[i]
          for( let j = 0; j < Object.values(aaa).length; j++){
            let bbb = Object.values(aaa)[j]
            this.repoName2.push(Object.values(bbb)[1])
          }
        }
        if(i == 2){
          this.pinnedResultData3 = Object.values(result)[2];
          this.queryID3 = this.queryIDArr[i]
          for( let j = 0; j < Object.values(aaa).length; j++){
            let bbb = Object.values(aaa)[j]
            this.repoName3.push(Object.values(bbb)[1])
          }
        }
        if(i == 3){
          this.pinnedResultData4 = Object.values(result)[3];
          this.queryID4 = this.queryIDArr[i]
          for( let j = 0; j < Object.values(aaa).length; j++){
            let bbb = Object.values(aaa)[j]
            this.repoName4.push(Object.values(bbb)[1])
          }
        }
      }      

      // for bar values on charts
      for( let i = 0; i < Object.values(result.pin).length; i++){
        this.pinnedData.push(Object.values(result.pin)[i])
      }      
      for(let i = 0; i < Object.values(result.pin).length; i++){
        if(i == 0){
            this.title1 = this.titleArr[i]
            let abc = Object.values(this.pinnedData)[i]
            for( let i = 0; i < Object.values(abc).length; i++){
                let repos = Object.values(abc)[i]
                for(let j = 0; j < Object.values(repos).length; j++){
                  this.total1.push(Object.values(repos)[j].total)         
                }
            }
            this.barChartLabels1 = this.repoName1
            this.barChartData1 = [{ 
                                    data: this.total1, 
                                    label: 'Count', 
                                    backgroundColor: 'rgba(255, 0, 0,0.5)', 
                                    hoverBackgroundColor: 'rgba(255, 0, 0,0.7)', 
                                    borderColor: '#664983',

                                  }];
            
        }
        if(i == 1){
          this.title2 = this.titleArr[i]
          let abc = Object.values(this.pinnedData)[i]
          for( let i = 0; i < Object.values(abc).length; i++){
              let repos = Object.values(abc)[i]
              for(let j = 0; j < Object.values(repos).length; j++){
                this.total2.push(Object.values(repos)[j].total)         
              }
          }
          this.barChartLabels2 = this.repoName2
          this.barChartData2 = [{ 
          data: this.total2, 
          label: 'Count', 
          backgroundColor: 'rgba(255, 0, 0,0.5)', 
          hoverBackgroundColor: 'rgba(255, 0, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
        if(i == 2){
          this.title3 = this.titleArr[i]
          let abc = Object.values(this.pinnedData)[i]
          for( let i = 0; i < Object.values(abc).length; i++){
              let repos = Object.values(abc)[i]
              for(let j = 0; j < Object.values(repos).length; j++){
                this.total3.push(Object.values(repos)[j].total)         
              }
          }
          this.barChartLabels3 = this.repoName3
          this.barChartData3 = [{ 
          data: this.total3, 
          label: 'Count', 
          backgroundColor: 'rgba(255, 0, 0,0.5)', 
          hoverBackgroundColor: 'rgba(255, 0, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
        if(i == 3){
          this.title4 = this.titleArr[i]
          let abc = Object.values(this.pinnedData)[i]
          for( let i = 0; i < Object.values(abc).length; i++){
              let repos = Object.values(abc)[i]
              for(let j = 0; j < Object.values(repos).length; j++){
                this.total4.push(Object.values(repos)[j].total)         
              }
          }
          this.barChartLabels4 = this.repoName4
          this.barChartData4 = [{ 
          data: this.total4, 
          label: 'Count', 
          backgroundColor: 'rgba(255, 0, 0,0.5)', 
          hoverBackgroundColor: 'rgba(255, 0, 0,0.7)', 
          borderColor: '#664983',
         }];
        }
      }
    })
  }  

  removeQuery(queryID){
    this.http.unsetPinnedResult(queryID).subscribe((message : any) => {
      if(message.message == "Query Removed from Pinned"){
        this.toastr.success('', 'Your query is unpinned', {
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

  chartClicked1() {
    let Data1={
        title:this.pinnedResultData1.storedQuery.title,
        queryKey:this.pinnedResultData1.storedQuery.queryKey,
        id:this.pinnedResultData1.storedQuery.queryId,
        repoList:this.pinnedResultData1.queryRepoList,
        paramList:this.pinnedResultData1.queryParameterList,
        isPinned:this.pinnedResultData1.storedQuery.pinned,
        isTrend:this.pinnedResultData1.storedQuery.trendCaptured
      };
    
   this.router.navigate(['repo'],{state : {data: Data1}});
  }

  chartClicked2() {
    let Data1={
      title:this.pinnedResultData2.storedQuery.title,
      queryKey:this.pinnedResultData2.storedQuery.queryKey,
      id:this.pinnedResultData2.storedQuery.queryId,
      repoList:this.pinnedResultData2.queryRepoList,
      paramList:this.pinnedResultData2.queryParameterList,
      isPinned:this.pinnedResultData2.storedQuery.pinned,
      isTrend:this.pinnedResultData2.storedQuery.trendCaptured
    };
  
 this.router.navigate(['repo'],{state : {data: Data1}});
  }

  chartClicked3() {
    let Data1={
      title:this.pinnedResultData3.storedQuery.title,
      queryKey:this.pinnedResultData3.storedQuery.queryKey,
      id:this.pinnedResultData3.storedQuery.queryId,
      repoList:this.pinnedResultData3.queryRepoList,
      paramList:this.pinnedResultData3.queryParameterList,
      isPinned:this.pinnedResultData3.storedQuery.pinned,
      isTrend:this.pinnedResultData3.storedQuery.trendCaptured
    };
  
 this.router.navigate(['repo'],{state : {data: Data1}});
  }

  chartClicked4() {
    let Data1={
      title:this.pinnedResultData4.storedQuery.title,
      queryKey:this.pinnedResultData4.storedQuery.queryKey,
      id:this.pinnedResultData4.storedQuery.queryId,
      repoList:this.pinnedResultData4.queryRepoList,
      paramList:this.pinnedResultData4.queryParameterList,
      isPinned:this.pinnedResultData4.storedQuery.pinned,
      isTrend:this.pinnedResultData4.storedQuery.trendCaptured
    };
  
 this.router.navigate(['repo'],{state : {data: Data1}});
  }

}
