import axios from "axios"

import authHeader from './authHeader';

//const API_URL = 'http://ec2-54-65-68-33.ap-northeast-1.compute.amazonaws.com:8081/';
 const API_URL = 'http://20.0.106.212:8081/';


class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'getAll');
  }

  getUsers(){
    
    return axios.get(API_URL + 'v1/user/getAll', { headers: authHeader() });
}

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  // handleAdd(userName,firstName,lastName,password,email,mobile){
  //   return axios.post(API_URL +"v1/user/register", {
  //       userName,
  //       firstName,
  //       lastName,
  //       password,
  //       email,
  //       mobile  
  //   })
}
export default new UserService();
