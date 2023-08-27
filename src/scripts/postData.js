import axios from 'axios'
import * as CryptoJS from 'crypto-js'
import * as Cookies from 'js-cookie'
import { api_link } from './api'
import { alertPop } from "./message";
import { errorHandle, checkRes } from "./error";

export const postData = async (query, data)=> {
    let token ='';
    if(Cookies.get('token')){
        let temp = CryptoJS.AES.decrypt(Cookies.get('token'), '$%sslWireless$$_SslCommerz44Ebuddy%$');
        token = temp.toString(CryptoJS.enc.Utf8);
    }
    let res = {}
    try {
        res = await axios({
            method: 'post',
            url: `${api_link}${query}`,
            headers: {
                'Authorization' : `bearer ${token}`
            },
            data :  data
        }) 

        return res
    } catch (error) {
        // window.location = '/'
    // checkRes(error.response.status);
    // if (Array.isArray(error?.response?.data?.messages))
    //   error.response.data.messages.map((err) => {
    //     alertPop("error", err);
    //   });

        return error.response ? error.response.data.messages : error
    }

}

export const login = async (data) => {
    try {
        let res = await axios({
            method: 'post',
            url: `${api_link}accounts/v1/auth/login`,
            data :  data
        })
        return res
    } catch (error) {
        return error.response ? error.response.data.messages : error
    }
}