import axios from 'axios';
import authHeader from './authHeader';


//const API_URL ="http://ec2-54-65-68-33.ap-northeast-1.compute.amazonaws.com:8081/"
const API_URL ="http://20.0.106.212:8081/";;
class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL +"authenticate",{
        userName,
        password,
      })

      .then(response => {
            //console.log("response",response.data)
            //console.log("response",response.data.token)
            if (response.data.token) {
              localStorage.setItem("user",JSON.stringify(response.data));
              // console.log("userdetails=========",localStorage.getItem('user'))
            }
    
            return response.data;
          })
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(userName,firstName,lastName,password,email,mobile) {
    return axios.post(API_URL +"v1/user/register", {
      userName,
      firstName,
      lastName,
      password,
      email,
      mobile,
    }, { headers: authHeader() });
   }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
