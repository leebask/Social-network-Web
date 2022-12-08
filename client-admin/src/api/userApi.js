import axiosClient from './axiosClient';
import api from '../api/API'
import queryString from "query-string";
const userApi = {
  signIn: async (payload) => {
    // Cái đường dẫn API này tuỳ thuộc vào BE của bạn cho cái nào thì dùng cái đó
    const url = '/auth/login';
    const response = axiosClient.post(
      url + "?" + queryString.stringify(payload)
    );
    return response;
  },
  getFriends: async (payload) => {
    // Cái đường dẫn API này tuỳ thuộc vào BE của bạn cho cái nào thì dùng cái đó
    const url = api.GET_FRIENDS+payload;
    const response =  axiosClient.get(url);
    return response;
  },
  getUser: async (payload) => {
    const url = api.GET_USER + payload;
    const response = await axiosClient.get(url);
    return response.data;
  },

  getUserAdmin: async (payload) => {
    const url =api.GET_USER_ADMIN;
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}`};
    const response =await axiosClient.get(url, {params:payload});
    return response;
  },
  blockUser: async (payload) => {
    const url =api.BLOCK_USER+payload?.userId;
    const response =  axiosClient.put(url);
    return response;
  },
};
  
  export default userApi;
  