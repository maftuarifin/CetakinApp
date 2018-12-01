const Validation = (value, rules, formCopy) => {
    let valid = true;
    for(let rule in rules){
        switch (rule) {
            case "isRequired":
                valid = valid && validateRequired(value)
                break;
            case "isEmail":
                valid = valid && validateEmail(value)
                break;
            case "minLength":
                valid = valid && validateMinLength(value, rules[rule])
                break;
            case "confirmPass":
                valid = valid && validateConfirmPass(value, formCopy.password.value)
                break;
            default:
                valid = true
        }
    }
 
    return valid;
}

const validateRequired = value => {
    if(value !== ""){
        return true
    }
    return false
}

const validateEmail = value => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test(String(value).toLowerCase());
}

const validateMinLength = (value, minLength) => {
    if(value.length >= minLength){
        return true
    }
    return false
}

const validateConfirmPass = (value, password) => {
    if(value === password){
        return true
    }
    return false
}

export default Validation;