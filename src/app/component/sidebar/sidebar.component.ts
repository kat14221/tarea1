import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule ,SidebarModule,ButtonModule,RippleModule,AvatarModule,StyleClassModule,RouterModule,ToggleButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  sidebarVisible: boolean = false;
  
  constructor(private router: RouterModule) {}
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;
    navigateTo(path: string) {
      this.sidebarVisible = false; 
      
    }
  closeCallback(e:Event): void {
      this.sidebarRef.close(e);
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  
}
