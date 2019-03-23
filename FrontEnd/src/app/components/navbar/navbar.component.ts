import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthService, 
    private flashMessage:NgFlashMessageService 
  ) { }

  ngOnInit() {
  }
  onLogoutClick(){
      this.authService.logout();
      this.flashMessage.showFlashMessage({messages:['Logged out!'],
        dismissible:true,
        timeout:4000,
       type:'success'});
      this.router.navigateByUrl('/login');
      return false;
  }
}
