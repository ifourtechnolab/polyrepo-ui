import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-repository',
  templateUrl: './show-repository.component.html',
  styleUrls: ['./show-repository.component.css']
})
export class ShowRepositoryComponent implements OnInit {

  dropdownList:any= [];
  selectedItems:any = [];
  dropdownSettings = {};
  tokenValue:any;
  products:any;

  constructor() {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Repo1' },
      { item_id: 2, item_text: 'Repo2' },
      { item_id: 3, item_text: 'Repo3' },
      { item_id: 4, item_text: 'Repo4' },
      { item_id: 5, item_text: 'Repo5' },
      { item_id: 6, item_text: 'Repo6' },
      { item_id: 7, item_text: 'Repo7' },
      { item_id: 8, item_text: 'Repo8' },
      { item_id: 9, item_text: 'Repo9' },
      { item_id: 10, item_text: 'Repo10' }
    ];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
