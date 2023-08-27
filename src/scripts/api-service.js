import axios from "axios";
import * as CryptoJS from "crypto-js";
import * as Cookies from "js-cookie";
import { api_link } from "./api";
import { alertPop } from "./message";
import { errorHandle, checkRes } from "./error";

const secret = "$%sslWireless$$_SslCommerz44Ebuddy%$";

const alert = () => {
  alertPop("error", "Something went wrong");
};

export const getData = async (query) => {
  let temp = CryptoJS.AES.decrypt(Cookies.get("token"), secret);
  let token = temp.toString(CryptoJS.enc.Utf8);
  try {
    let data = await axios.get(`${api_link}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (checkRes(data.status)) {
      return data;
    } else {
      alert();
    }
  } catch (error) {
    if (error.response) checkRes(error.response.status);
    if (Array.isArray(error?.response?.data?.messages))
      error.response.data.messages.map((err) => {
        alertPop("error", err);
      });
    else errorHandle(error);
    return false;
  }
};
export const getDataWithEmpId = async (query) => {
  let temp = CryptoJS.AES.decrypt(Cookies.get("token"), secret);
  let temp_profile = CryptoJS.AES.decrypt(Cookies.get("profile"), secret);
  console.log(temp_profile);
  let token = temp.toString(CryptoJS.enc.Utf8);
  try {
    let data = await axios.get(`${api_link}${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        empid: `${1000}`
      },
    });
    if (checkRes(data.status)) {
      return data;
    } else {
      alert();
    }
  } catch (error) {
    if (error.response) checkRes(error.response.status);
    if (Array.isArray(error?.response?.data?.messages))
      error.response.data.messages.map((err) => {
        alertPop("error", err);
      });
    else errorHandle(error);
    return false;
  }
};

export const postData = async (query, data) => {
  let temp = CryptoJS.AES.decrypt(Cookies.get("token"), secret);
  let token = temp.toString(CryptoJS.enc.Utf8);
  let url = `${api_link}${query}`;
  try {
    let res = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `bearer ${token}`,
      },
      data: data,
    });
    if (checkRes(res.status)) {
      return res;
    } else {
      alert();
    }
  } catch (error) {
    if(error.response.status !== undefined) checkRes(error.response.status);
    if (Array.isArray(error?.response?.data?.messages))
      error.response.data.messages.map((err) => {
        alertPop("error", err);
      });
    else errorHandle(error);
    return false;
  }
};
