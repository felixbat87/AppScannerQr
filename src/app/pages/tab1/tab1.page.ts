import { Component } from '@angular/core';


import { register } from 'swiper/element/bundle';
register();
@Component({
 
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
 
  
})
export class Tab1Page {
Scanner:any;
  constructor() {}


 
  ionViewDidEnter(){
    //console.log('viewDidEnter')
  }

  ionViewDidLeave(){
   // console.log('viewDidLeave')
  }

  ionViewDidLoad(){
  //  console.log('viewDidLoad')
  }
 

  ionViewWillEnter(){
   
    
  }

  ionViewWillLeave(){
    window.document.querySelector('ion-button')?.classList.remove('texto');
    window.document.querySelector('ion-content')?.classList.remove('scanner-active');
   // console.log('viewWillLeave')
  }

}
