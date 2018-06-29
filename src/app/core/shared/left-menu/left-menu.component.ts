import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeftMenuService } from './left-menu.service';
import { RoleEnum } from '../../../shared/enums';
import { CoreService } from '../service/core.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../shared/service/common.service';
import { SharedService } from '../service/shared.service';
import { Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit, OnDestroy {
    selectedIndex: Number = 0;
    imageSource = '';
    roleId = 0;
    leftMenuItems = [];
    selectedItem: any;
    finalUrL: string;
    private subscription: Subscription;

    constructor(protected router: Router,
        protected route: ActivatedRoute,
        public leftMenuService: LeftMenuService,
        private commonService: CommonService,
        public sharedService: SharedService,
        public coreService: CoreService) {
        this.sharedService.getUserDetail().subscribe(res => {
            const currentUser = res;
            this.roleId = currentUser.userRoleIds[0];
            this.getLeftMenu();
        });
        // this.roleId = currentUser.UserRoleIds[0];

        this.leftMenuService.gerUserImage().subscribe((res) => {
            this.imageSource = res.attachmentUrl;
        });

    }

    ngOnInit() {
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'setDisplayImage') {
                this.imageSource = res.value;
            }
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.finalUrL = event.url.slice(1) + '/';
                const index = this.leftMenuItems.findIndex(i => i.href === this.finalUrL);
                this.selectedIndex = index;

            }
        });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getLeftMenu() {
        this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
            this.setLeftMenu(leftMenu);
            localStorage.removeItem('leftMenuPermission');
            // localStorage.setItem('leftMenuPermission', JSON.stringify(leftMenu));
        });
    }

    setLeftMenu(leftMenu) {
        let menuDetails;
        leftMenu.map(menu => {
            if (this.roleId === RoleEnum.Admin || this.roleId === RoleEnum.SubAdmin) {
                let name = ''
                if (menu.id == 1 || menu.id == 2 || menu.id == 3)
                    name = 'user/';

                menuDetails = { id: menu.id, name: menu.name, href: 'admin/' + name + menu.routeUrl + '/' };
            }
            if (this.roleId === RoleEnum.PDU) {
                let name = ''
                if (menu.id == 1 || menu.id == 2 || menu.id == 3)
                    name = 'account/';

                menuDetails = { id: menu.id, name: menu.name, href: 'user/' + name + menu.routeUrl + '/' };
            }
            if (this.roleId === RoleEnum.Vendor) {
                let name = ''
                if (menu.id == 1 || menu.id == 2 || menu.id == 3)
                    name = 'shared/';

                menuDetails = { id: menu.id, name: menu.name, href: 'vendor/' + name + menu.routeUrl + '/' };
            }
            this.leftMenuItems.splice(this.leftMenuItems.length, -1, menuDetails);
        });
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'leftMenuItem') {
                this.selectedItem = res.value;
                const index = this.leftMenuItems.findIndex(i => i.id === this.selectedItem.id);
                this.selectedIndex = index;
            }
        });

        const selectedItem: any = JSON.parse(localStorage.getItem('selectedLeftMenu'));
        if (selectedItem && this.selectedIndex !== -1) {
            const index = this.leftMenuItems.findIndex(i => i.id === selectedItem.id);
            this.selectedIndex = index;
        } else {
            this.selectedIndex = 0;
        }
    }

    onLeftMenuSelect(leftMenuItem, selectedTabIndex) {
        localStorage.removeItem('selectedLeftMenu');
        this.selectedItem = leftMenuItem;
        this.commonService.notifyOther({ option: 'leftMenuItem', value: leftMenuItem });
        localStorage.setItem('selectedLeftMenu', JSON.stringify(leftMenuItem));
        this.selectedIndex = selectedTabIndex;
        this.router.navigate([leftMenuItem.href]);
    }



}
