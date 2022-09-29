import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isWithinPackage} from "@angular/compiler-cli/ngcc/src/analysis/util";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ImageService} from "../../../services/gallery-service/image.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit,OnChanges {
  @Input("countryName")
  public Cname:string = 's';
  formTemplate: any;

  imgSrc : string = "/assets/images/image_placeholder.jpg";
  selectedImage : any = null;
  isSubmitted : boolean = false;
  constructor(private storage:AngularFireStorage,private service : ImageService) {}

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=>this.imgSrc=e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = "/assets/images/image_placeholder.jpg";
      this.selectedImage = null;
    }

  }

  onSubmit(formValue:any){
    this.isSubmitted=true;
    if(this.formTemplate.valid){
      var filePath = ''+this.Cname+'/'+this.selectedImage.name.split('.').slice(0,-1).join('.')+'_'+new Date().getTime();
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageUrl']=url;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          })
        }),
      ).subscribe();
    }

  }

get formControls(){
    return this.formTemplate['controls'];
  }

  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:'',
      country:this.Cname
    });
    this.imgSrc="/assets/images/image_placeholder.jpg";
    this.isSubmitted=false;
    this.selectedImage=null;
  }



  ngOnInit(): void {

     this.formTemplate = new FormGroup({
      caption: new FormControl('',Validators.required),
      country: new FormControl({value: this.Cname}),
      imageUrl: new FormControl('',Validators.required),
    });

     this.resetForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.Cname);
    this.formTemplate.patchValue({
      country: this.Cname,
    });
   // this.getImages();
  }

}
