
let paypalKeys;
if(process.env.NODE_ENV === 'production'){
     paypalKeys = require('./paypal_keys_prod').KEYS_PROD;
}else{
     paypalKeys = require('./paypal_keys_dev').KEYS_DEV;
}

export const CLIENT = paypalKeys;




