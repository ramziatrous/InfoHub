import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  id: any;
  image: any;
  contact:any;

  constructor(
    private _act: ActivatedRoute,
    private _contact: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._act.snapshot.paramMap.get('id');

    this._contact.getById(this.id).subscribe({
      next: (res) => {
        this.contact = res;

      },
      error: (err) => {

      }
    });
  }

  select(e: any): void {
    this.image = e.target.files[0];
  }

  save(): void {
    let fd = new FormData();
    fd.append('name', this.contact.name);
    fd.append('lastname', this.contact.lastname);
    fd.append('email', this.contact.email);
    fd.append('tel', this.contact.tel);
    fd.append('address', this.contact.address);

    if (this.image) {
      fd.append('image', this.image);
    } else {
      fd.append('image', this.contact.image);
    }

    this._contact.update(this.id, fd).subscribe(
       res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been Updated',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/home/list']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
