import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers(){
        return this.http.get('/api/users');
    }

    saveUser( user:User ){
        return this.http.post('/api/users', user);
    }

    updateUser( user:User ){
        return this.http.patch('/api/users/'+user.id, user);
    }

    filterUsers( search:any  ){
        return this.http.get('/api/users', { params: search });
    }
    
}