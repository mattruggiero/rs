const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(userRegistrationForm){
   let errors = {};

    for (let field in userRegistrationForm){
        userRegistrationForm[field] = validator.trim(userRegistrationForm[field]);
        if(field !== 'aptNumber' && isEmpty(userRegistrationForm[field])){
            errors.all = 'Missing required fields!!';
        }
    }
    const isLengthOptions  = {min:2, max:30};
    const isLengthMessage = "must be between 2 and 30 characters";

    //location fields not validated very well, hoping that I can remove them after paypal is added

    if(!validator.isLength(userRegistrationForm.firstName, isLengthOptions))
        errors.firstName = "First name "+isLengthMessage;
    if(!validator.isLength(userRegistrationForm.lastName, isLengthOptions))
        errors.lastName = "Last name "+isLengthMessage;
    if(!validator.isLength(userRegistrationForm.userName, isLengthOptions))
        errors.userName = "User name "+isLengthMessage;
    if(!validator.isLength(userRegistrationForm.password, {min:8,max:30}))
        errors.password = "Password must be between 8 and 30 characters";
    if(!validator.isEmail(userRegistrationForm.email))
        errors.email = "Not a valid email address";
    if(!validator.equals(userRegistrationForm.password,userRegistrationForm.confirmPassword))
        errors.password = "Password's do not match";
    console.log(errors);

    return {
        errors:errors, 
        isValid:isEmpty(errors), 
    }
    


    
}