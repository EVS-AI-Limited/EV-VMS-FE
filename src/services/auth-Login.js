import axios from "axios";
//const API_URL ="http://192.168.187.41:8081/";
const API_URL ="http://20.0.106.212:8081/";

class LoginAuthService {
    async login(userName, password) {
    const response = await axios
        .post(API_URL + "authenticate", {
            userName,
            password
        });
    //console.log("response",response.data)
    if (response.data.token) {
        localStorage.setItem("employee", JSON.stringify(response.data));
    }
    return response.data;
}
}

export default new LoginAuthService();
