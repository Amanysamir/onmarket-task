import { UsersServiceService } from './../users-service.service';
import { user } from './../user';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionbtn: string = 'save';
  userForm!: FormGroup;
  constructor(

    private _UsersServiceService: UsersServiceService,
    private _MatDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.fromdata();
  }

  fromdata() {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z][a-z0-9]{3,9}$'),
      ]),
      role: new FormControl(null, [Validators.required]),
      action: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
    if (this.editData) {
      this.actionbtn = 'update';
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['role'].setValue(this.editData.role);
      this.userForm.controls['action'].setValue(this.editData.action);
    }
  }

  adduser() {
    if (!this.editData) {
      if (this.userForm.invalid == false) {
        this._UsersServiceService.adduser(this.userForm.value);
        this.userForm.reset();
        this._MatDialogRef.close();
      }
    } else {
      this.edituser();
    }
  }

  edituser() {
    this._UsersServiceService.edituser(this.userForm.value);
    this.userForm.reset();
    this._MatDialogRef.close();

  }
}
