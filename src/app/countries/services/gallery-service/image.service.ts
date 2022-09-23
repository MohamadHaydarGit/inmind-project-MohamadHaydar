import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any> | undefined;

  constructor(private firebase:AngularFireDatabase) { }
  getimageDetailList(){
    //get a reference to the imageDetails list of images in firebase realtime database
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  insertImageDetails(imageDetails:any){
    //add imageDetails to the list
    this.imageDetailList!.push(imageDetails);

  }
}
