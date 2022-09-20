import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from "../../../services/gallery-service/image.service";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit,OnChanges {
  imageList : any[] | undefined;
  filteredArray : any[] | undefined;
  rowIndexArray : any[] | undefined;
  @Input("countryName")
  public Cname:string = 's';
  constructor(private imageSrvice:ImageService) {}


  ngOnInit(): void {
    this.getImages();
  }
  getImages(){
    this.imageSrvice.imageDetailList?.snapshotChanges().subscribe(
      list=>{
        this.imageList= list.map(item => {
          return item.payload.val();
        }); //returns json object containing properties(country,caption,imageUrl)
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
        this.filteredArray= this.imageList.filter(item => item.country === this.Cname);
        console.log(this.filteredArray);
      }
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.Cname);
    this.getImages();
  }

}
