import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor( private auth: AuthService, private _contact: ContactService ,private router: Router){}

contact={
  name: '',
  lastname: '',
  email: '',
  tel: '',
  address: ''
}


  image: any;

  select(e:any){
    this.image = e.target.files[0];
  }

  userData: any;
  ngOnInit(): void {
    this.userData = this.auth.getDataFromToken();
  }


  create(){

    let fd = new FormData();
    fd.append('name', this.contact.name);
    fd.append('lastname', this.contact.lastname);
    fd.append('email', this.contact.email);
    fd.append('tel', this.contact.tel);
    fd.append('address', this.contact.address);
    fd.append('idUser', this.userData._id );
    fd.append('image', this.image);
console.log(this.userData._id);

    this._contact.create( fd ).subscribe({
      next: (res)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })

        this.router.navigate(['/home/list']);

      },
      error: (error)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please try again!!',
          showConfirmButton: false,
          timer: 1500
        })

      }
    })



  }

}
