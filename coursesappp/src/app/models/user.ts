export interface IUser {
    login: string;
    password: string;
}


export class User implements IUser {
    login: string;
    password: string;

    constructor(login: string, paswword: string) {
        this.login = login;
        this.password = paswword;
    }
}