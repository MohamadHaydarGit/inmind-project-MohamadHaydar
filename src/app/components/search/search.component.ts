import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  enteredSearchValue : string='';
  selectedRegion : string='Region';
  constructor() { }

  ngOnInit(): void {
  }
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  selectRegionChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
  onSelectChange(value:string){
    this.selectedRegion=value;
    this.selectRegionChange.emit(this.selectedRegion);

  }

}
