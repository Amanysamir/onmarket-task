import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UsersServiceService } from '../users-service.service';
import { user } from '../user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'email', 'role' , 'action' ,'modify'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users ?: user [];
  constructor(public dialog: MatDialog , private _UsersServiceService :UsersServiceService ) { }

  ngOnInit(): void {
    this._UsersServiceService.getusers().subscribe((users) => {
      console.log(users);
      this.users = users;
      this.dataSource =new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  editproduct(user :any){
     this.dialog.open(DialogComponent , {data:user});
     this._UsersServiceService.edituser(user);
    console.log("from users com" + user)
    console.log (user +"form")
  }
  deleteproduct(user:any){
    this._UsersServiceService.deleteuser (user);
    console.log(user)
  }
  /* editproduct(user :any){
    this.dialog.open(DialogComponent , {data:user});
    console.log(user)
  } */
  openDialog() {
    this.dialog.open(DialogComponent)
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
