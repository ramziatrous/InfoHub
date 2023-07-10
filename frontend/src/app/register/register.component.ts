import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user={
    name:'',
    lastname:'',
    email:'',
    password:''
  }

  constructor(private auth : AuthService,private router:Router ) { }
  ngOnInit(): void{
    }
    register(){
      let fd = new FormData()
      fd.append('name', this.user.name)
      fd.append('lastname', this.user.lastname)
      fd.append('email', this.user.email)
      fd.append('password', this.user.password)

      this.auth.register(this.user)
        .subscribe(
          res=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your account has been created',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/login']);
         },
         err=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please try again',
            showConfirmButton: false,
            timer: 1500
          })
        }
        );
    }

}
