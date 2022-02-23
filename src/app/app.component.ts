import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test'; 
  animal: string;
  name: string;
  dataSource:any;
  form: FormGroup;

  displayedColumns: string[] = ['user', 'email', 'name', 'surnames','state','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public matDialog: MatDialog,
    private _userService:UserService
  ) {
    this.getAll();
    this.form = new FormGroup({
      email_like: new FormControl(),
      user_like: new FormControl(),
      name_like: new FormControl(),
      surnames_like: new FormControl()
    });
  }

  getAll(){
    this._userService.getUsers().subscribe( (data:any) =>{
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog( type:string = 'add', user?:User ){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = (user) ? Object.assign(user,{type: type }):{type: type };
    this.matDialog.open(DialogUserComponent, dialogConfig).componentInstance.submitClicked.subscribe(data =>{
      this.getAll();
      this.matDialog.closeAll();
    });
  }

  search(){
    let formData = this.form.value;
    formData = Object.entries(formData);
    let filter = formData.filter(([key,value]:any) => value !== null && value !== "");
    filter = Object.fromEntries(filter);
    this._userService.filterUsers(filter).subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource<User>(data);
    });
  }

}

