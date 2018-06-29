import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/service';
import { Router, ActivatedRoute,NavigationEnd  } from '@angular/router';
import { SharedService } from './core/shared/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  inBackground: any;
  userId: any;
  constructor(
    public sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.logOutTimeOut();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  logOutTimeOut() {
    let timeout;
    document.onmousemove = () => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('selectedLeftMenu');
        localStorage.removeItem('showMessage');
      }, 900000);
    };
  }
}
