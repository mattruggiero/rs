import { SET_CART } from './types';
import store from '../store';
import axios from 'axios';

//comment

export function setCart(recordDBID){
    let url = '/cart';
    let postData = { recordDBID:recordDBID};

    axios({method:'post', url:url,data:postData})
        .then(response => {
            store.dispatch({
                type:SET_CART,
                payload:response.data,
            })
        })
}

export function removeFromCart(recordDBID){
    let url = '/cart/remove';
    let postData = { recordDBID:recordDBID};

    axios({method:'post', url:url,data:postData})
        .then(response=>{
            setCart()
        })

    }

export function addToCart(recordDBID){
    let url = '/cart/add';
    let postData = { recordDBID:recordDBID};

    axios({method:'post', url:url,data:postData})
        .then(response => {
            setCart();
        })

    
}

export function emptyCart(){
    let url = '/cart/empty';
    axios({method:'post', url:url})
        .then(response => {
            setCart();
        })
}