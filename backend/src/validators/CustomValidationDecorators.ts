import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments
} from 'class-validator'

export function IsSameValue(property:string, validationOptions?:ValidationOptions){
    return function(
        target:Object,
        propertyName:string
    ){
        registerDecorator({
            name:'isSameValue',
            target:target.constructor,
            propertyName,
            constraints:[property],
            options:validationOptions,
            validator:{
                validate(val2:any, validationArguments?:ValidationArguments):Promise<boolean>|boolean{
                    // property 对应的值
                    
                    const val1 = validationArguments && (validationArguments.object as any)[property] 
                    return val2 === val1;
                }
            }
        })
    }
}