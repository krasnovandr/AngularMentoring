export interface IUser {
    login: string;
    password: string;
}


export class UserLogin implements IUser {
    login: string;
    password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}

export class SignInResponse {
    token: string;
}

export class UserName {
    first: string;
    last: string;
}
export class UserInfo implements IUser {
    login: string;
    password: string;
    fakeToken: string;
    id: number;
    name: UserName;
}
