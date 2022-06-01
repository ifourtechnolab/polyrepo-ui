import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-pinnedquery',
  templateUrl: './pinnedqueryresult.component.html',
  styleUrls: ['./pinnedqueryresult.component.css']
})
export class PinnedqueryComponent implements OnInit {

  pinnedData : any[] = [];
  queryID: any = 1;
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

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor(private http: HttpService, private util:UtilService) { }

  ngOnInit(): void {
    this.pinnedResult();
  }

  AfterContentInit() : void{
    console.log("abc");
  }

  pinnedResult(){
    this.http.getPinnedResult(this.util.getUserId()).subscribe((result : any) => {
      console.log(Object.keys(result)[0]);
      
      for(let i = 0; i < Object.values(result).length-1; i++){
        let title = Object.values(result)[i];
        this.titleArr.push(Object.values(title)[0].title);       
      }
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
                for(let j = 0; j < Object.values(repos).length; j++){
                  this.demo1.push(Object.values(repos)[j])  
                }
                for(let k = 0; k < Object.values(this.demo1).length; k++){
                  this.repoName1.push(Object.values(this.demo1)[k].nodes[0].repository.name)
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
              for(let j = 0; j < Object.values(repos).length; j++){
                this.demo2.push(Object.values(repos)[j])  
              }
              for(let k = 0; k < Object.values(this.demo2).length; k++){
                this.repoName2.push(Object.values(this.demo2)[k].nodes[0].repository.name)
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
              for(let j = 0; j < Object.values(repos).length; j++){
                this.demo3.push(Object.values(repos)[j])  
              }
              for(let k = 0; k < Object.values(this.demo3).length; k++){
                this.repoName3.push(Object.values(this.demo3)[k].nodes[0].repository.name)
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
              for(let j = 0; j < Object.values(repos).length; j++){
                this.demo4.push(Object.values(repos)[j])  
              }
              for(let k = 0; k < Object.values(this.demo4).length; k++){
                this.repoName4.push(Object.values(this.demo4)[k].nodes[0].repository.name)
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

  removeQuery(){
    this.http.unsetPinnedResult(this.queryID).subscribe((message : any) => {
      console.log(message);
    })
    window.location.reload();
  }
}
