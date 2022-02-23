import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent {

  form: FormGroup;
  title:string;

  @Output() submitClicked = new EventEmitter<any>();
  
  constructor( 
    public dialogRef: MatDialogRef<DialogUserComponent>,
    private _userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){

    switch (data.type) {
      case 'add':
        this.title = 'Agregar usuario';
        break;
      case 'edit':
        this.title = 'Editar usuario';
        break;
      case 'view':
        this.title = data.name;
        break;
    }

    this.form = new FormGroup({
      id: new FormControl((data) ? data.id : this.randomId()),
      email: new FormControl((data) ? data.email : '', [Validators.email,Validators.required]),
      user: new FormControl((data) ? data.user : '', [Validators.required]),
      name: new FormControl((data) ? data.name : '', [Validators.required]),
      surnames: new FormControl((data) ? data.surnames : '', [Validators.required]),
      state: new FormControl((data) ? data.state : '', [Validators.required]),
    });

  }

  save(){

    if(this.data.type == "edit"){
      this._userService.updateUser(this.form.value).subscribe((data:any)=>{
        this.submitClicked.emit(data);
      });
    } else if(this.data.type == "add"){
      this._userService.saveUser(this.form.value).subscribe((data:any)=>{
        this.submitClicked.emit(data);
      });
    }

  }

  close() {
    this.dialogRef.close();
  }

  randomId(){
    return Math.random().toString(36).substr(2, 9);
  }

}

