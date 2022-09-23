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

  //each time the text in the input box is changed the searchTextEvent emitter is triggired and emits the current values
  //the trigger of the event will be caught in the parent component
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
  onSelectChange(value:string){
    this.selectedRegion=value;
    this.selectRegionChange.emit(this.selectedRegion);

  }

}
