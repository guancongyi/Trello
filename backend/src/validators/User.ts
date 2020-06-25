import { Length, IsNotEmpty } from 'class-validator';
import {IsSameValue} from './CustomValidationDecorators'

class UserBody{
    @Length(1,50, {
        message:'Username should be between 1 and 50 characters'
    })
    name:string;

    @IsNotEmpty({
        message:'Password cannot be empty'
    })
    password:string;
}

export class RegisterBody extends UserBody{
    

    // need custom decorator
    @IsSameValue('password', {
        message:'Password should be same'
    })
    rePassword:string;
}

export class LoginBody extends UserBody{
}