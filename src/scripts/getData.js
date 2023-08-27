import axios from "axios";
import * as CryptoJS from "crypto-js";
import * as Cookies from "js-cookie";
import { api_link } from "./api";

export const getData = async query => {
  // document.cookie.split('=')[1]
  let temp = CryptoJS.AES.decrypt(
    Cookies.get("token"),
    "$%sslWireless$$_SslCommerz44Ebuddy%$"
  );
  let token = temp.toString(CryptoJS.enc.Utf8);
  try {
    let data = await axios.get(`${api_link}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data.messages : error;
  }
};
