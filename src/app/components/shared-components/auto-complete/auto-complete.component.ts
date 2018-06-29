import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutoCompleteService } from './shared/auto-complete.service';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html'
})

export class AutoCompleteTextboxComponent implements OnInit {
  searchString: any;
  @Input() componentName: string = '';
  @Output() searchTextEvent = new EventEmitter();
  results: string[];


  constructor(private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
    const event = { query: '' };
    this.searchEvent(event)
  }

  searchEvent(event) {
    this.autoCompleteService.callAutoComplete(this.componentName, (event.query)).subscribe(data => {
      this.results = data;
      if (this.results.length === 0) {
        this.onSelectEvent();
      }
    });
  }

  onSelectEvent() {
    this.searchTextEvent.emit(this.searchString);
  }

}