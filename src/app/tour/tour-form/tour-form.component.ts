import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
// import { CalendarEvent } from 'angular-calendar';
// import { MonthViewDay } from 'calendar-utils';
import * as moment from 'moment';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TourService } from '../tour.service';
import { map } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { MainMenuService } from 'src/app/main-menu/main-menu.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss']
})
export class TourFormComponent implements OnInit {
  form: FormGroup;
  id: any;
  dayTitle: string = moment(new Date).format('DD/MM/YYYY');
  displayedColumns: string[] = [
    'code',
    'status',
    'paidStatus',
    'contact',
    'action',
    'checked'
  ];

  isEdit: boolean = false;

  dataSource = new MatTableDataSource();


  isView: boolean = false;
  isEditing: boolean = true;
  imageSrcs: SafeUrl[] = [];
  imageFiles: any[] = [];
  uploadQue: any[] = [];
  imageSequent: number = 0; 
  fileUrls: any[] = [];
  previousImagesName: string[] = [];

  forms: boolean[] = [
    true,
    false,
    false
  ];


  viewDate: Date;
  // events: CalendarEvent[] = [];

  countryOptions: any[] = [];
  provinceOptions: any[] = [];



  constructor(
    private location: Location,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tourService: TourService,
    private sharedService: SharedService
  ) {
    this.form = new FormGroup({
      tourName: new FormControl(),
      tourDesc: new FormControl(),
      endDate: new FormControl(),
      detail: new FormControl(),
      province: new FormControl(),
      country: new FormControl(),
      startDate: new FormControl(),
      companyId: new FormControl(),
      file: new FormControl(),
      // adultPrice: new FormControl(),
      // childPrice: new FormControl(),
      images: new FormControl([]),
    })
  }

  ngOnInit(): void {
    this.sharedService.getUserInfo().subscribe((response) => {
      console.log(response);
      if (response.tourId) {
        this.form.get('companyId').setValue(response.tourId);
      }
    });
    this.viewDate = new Date();
    this.route.params.subscribe((params: any) => {
      if (params.id === 'create') {
        this.id = params.id;
        this.isEdit = true;
      } else {
        this.tourService.getTour(params.id).pipe(
          map((res) => {
            res.startDate = moment(new Date(res.startDate)).format('yyyy-MM-DD');
            res.endDate = moment(new Date(res.endDate)).format('yyyy-MM-DD');
            return res;
          })
        ).subscribe((response) => {
          console.log(response);
          this.id = response.id;
          this.form.patchValue(response);
          if(response.images){
            response.images.forEach((img: FileObjForSave) => {
              this.imageSrcs.push(this.sanitizer.bypassSecurityTrustUrl(img.imgUrl));
              this.imageFiles.push(img.tourImg);
              this.previousImagesName.push(img.tourImg)
            });
          }
          this.form.disable();
        });
      }
    });

    this.sharedService.getCountries().subscribe((response) => {
      this.countryOptions = response;
    });

    this.form.get('country').valueChanges.subscribe((countryCode) => {
      this.sharedService.getProvinces(countryCode).subscribe((response) => {
        this.provinceOptions = response;
      });
    })
    // this.upload();
  }



  save(){
    this.uploadQue = this.imageFiles;
    this.doSave();
  }

  doSave() {
    // console.log(this.form.value);
    // console.log(this.imageFiles);
    if(this.uploadQue.length === 0){
      this.imageSequent = 0;
      this.fileUrls.forEach((file: FileObjForSave)=>{

      });
      console.log("SEND SAVE");
      this.form.get('images').setValue(this.fileUrls);
      this.imageFiles = this.previousImagesName = this.fileUrls.map((file: FileObjForSave)=> file.tourImg);
      this.fileUrls = []; // clear affter assigned
      this.form.get('file').setValue('');
      console.log(this.form.getRawValue());
      if (this.id === 'create') {
        this.tourService.createTour(this.form.getRawValue()).subscribe((response) => {
          this.matSnackBar.open(`Tour has been created.`);
          this.router.navigate(['tour']);
        });
      } else {
        this.tourService.updateTour(this.form.getRawValue(), this.id).subscribe(() => {
          this.matSnackBar.open(`Tour has been updated.`);
          this.router.navigate(['tour'])
        });
        this.form.get('detail').disable();
        this.form.get('file').disable();
        this.isEdit = true;
      }
    }else{
      this.imageSequent++;
      this.uploadFile();
    }
  }
  
  deleteImageOnCloud(previousImagesName: string[], newImagesName: string[]){
    let notIncludeOfNewImageList = previousImagesName.filter(x => !newImagesName.includes(x));
    notIncludeOfNewImageList.forEach((notInclude) => {
      this.sharedService.deleteFile(notInclude,'tours').subscribe((response)=>{
        console.log(`Delete imageName done.`);
      });
    });
  }
  

  // compressimage(file: string){
  //   return new Promise((resolve)=>{
  //     this.imageCompress.compressFile(file,)
  //     // this.imageCompress.uploadFile().then((singleFile: { image: string, fileName:string, orientation: number }) => {
  //     //   resolve(singleFile);
  //     // })  
  //   })
  // }

  back() {
    this.location.back()
  }

  // get f() {
  //   return this.form.controls;
  // }

  // onTemplateChange(event) {
  //   console.log("onTemplateChange : ", event);
  //   this.form.get("tourName").setValue("ดูปะการัง - High season");
  //   this.form.get("adultPrice").setValue("1000");
  //   this.form.get("childPrice").setValue("500");
  // }

  uploadFile() {
    console.log("Upload");
    if(typeof this.uploadQue[0] === 'string'){
      this.fileUrls.push({
        seq: this.imageSequent,
        tourImg: this.uploadQue[0]
      });
      this.uploadQue.splice(0,1);
      this.doSave();
    }else{
      this.sharedService.uploadFile(this.uploadQue[0],'tours').subscribe({
        next:(response)=>{
          console.log("Upload done");
          this.fileUrls.push({
            seq: this.imageSequent,
            tourImg: response.fileName
          });
          this.uploadQue.splice(0,1);
          this.doSave();
        },
        error:()=>{
          alert('Upload file error')
        }
      });
    }
  }

  onFileChange(event) {
    // this.imageSrcs = [];
    // this.imageFiles = [];
    // this.imageSrcs.forEach((img, index) => {
    //   this.deleteImage(index);
    // });

    if (event.target.files && event.target.files.length) {
      Array.from(event.target.files).forEach(async (file: File) => {

        const reader = new FileReader();

        reader.onload = async () => {
          let img = new Image;
          img.src = String(reader.result);
          img.onload = async () => {
            const ratio = Math.min(900 / img.width, 900 / img.height);
            console.log(ratio);
            const base64 = await fetch(await this.compressImage(img.src,  img.width * ratio, img.height * ratio));
            const pureBlob = await base64.blob();
            const objectUrl = await URL.createObjectURL(pureBlob);
            this.imageSrcs.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
            // this.imageFiles.push(file);
            this.imageFiles.push(new File([pureBlob], file.name,{
              type: pureBlob.type
            }))
          }
        };

        reader.readAsDataURL(file);
      });

    }
  }

  deleteImage(index: number) {
    URL.revokeObjectURL(String(this.imageSrcs[index]));
    this.imageSrcs.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }

  dropImage(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.imageSrcs, event.previousIndex, event.currentIndex);
    moveItemInArray(this.imageFiles, event.previousIndex, event.currentIndex);
  }


  compressImage(src, newX, newY): Promise<string> {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

  onEdit() {
    this.isEdit = true;
    this.form.get('detail').enable();
    this.form.get('file').enable();
    this.form.get('images').enable();
  }
}


export interface FileObjForSave{
  seq: number,
  tourImg: string,
  imgUrl: string
}