import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {ValidateService} from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import {RouterModule,Routes, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private valiadteService:ValidateService,
    private flashMessage:NgFlashMessageService ,
    private authService:AuthService,
    private router:Router)
     { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    alert("yes");
    
    const user={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    alert(user.name);
    if(!this.valiadteService.validateRegister(user)){
        this.flashMessage.showFlashMessage({messages:['please fill in all fields'],
        dismissible:true,
        timeout:10000,
       type:'danger'});
        return false;
    }
    if(!this.valiadteService.validateEmail(user.email)){
      this.flashMessage.showFlashMessage({messages:['please enter a valid email'],
        dismissible:true,
        timeout:10000,
       type:'danger'});
      return false;
    }
    //register user
    this.authService.registerUser(user).subscribe((data)=>{
      if(data.success){
        this.flashMessage.showFlashMessage({messages:['Registration Successful'],
        dismissible:true,
        timeout:10000,
       type:'success'});
       this.router.navigateByUrl('/login');
      }else{
        this.flashMessage.showFlashMessage({messages:['Registration Unsuccssful'],
        dismissible:true,
        timeout:10000,
       type:'danger'});
       this.router.navigateByUrl('/register');
      }
    });
  }

}
 