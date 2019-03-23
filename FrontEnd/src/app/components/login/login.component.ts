import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(private router:Router,
    private authService:AuthService, 
    private flashMessage:NgFlashMessageService ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user={
      username:this.username,
      password:this.password
    }
    this.authService.authenticateUser(user).subscribe((data)=>{
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.showFlashMessage({messages:['LogIn Sucessfull!!'],
        dismissible:true,
        timeout:10000,
       type:'success'});
       this.router.navigateByUrl('dashboard');
      }else{
        this.flashMessage.showFlashMessage({messages:[data.msg],
        dismissible:true,
        timeout:10000,
       type:'danger'});
       this.router.navigateByUrl('login');
      }
    });
  }

}
