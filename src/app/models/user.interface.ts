export interface User extends Array<User> {
    id: string,
    user: string,
    email: string,
    name:string,
    surnames:string,
    state:boolean
}