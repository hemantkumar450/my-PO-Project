import { Component, OnInit , Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
  @Input() images:Array<any>=[]
  @ViewChild('myCarousel') myCarousel:ElementRef
  constructor(private ElementRef:ElementRef) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    
  }

  
}

