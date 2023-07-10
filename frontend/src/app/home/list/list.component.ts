import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: any;

  userData: any;

  constructor(private contact: ContactService,private auth: AuthService ) { }

  ngOnInit(): void {

    this.userData = this.auth.getDataFromToken();

    this.contact.getMyContact( this.userData._id ).subscribe({
      next: (res)=>{
        this.contacts = res;

      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  delete(id: any){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.contact.delete(id).subscribe({
          next: (res)=>{

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            this.ngOnInit();

          },
          error: (err)=>{
            console.log(err);
          }
        })

      }
    })


  }


}
