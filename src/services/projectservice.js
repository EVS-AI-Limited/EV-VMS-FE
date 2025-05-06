import axios from "axios"

import authHeader from './authHeader';

//const API_URL = 'http://ec2-54-65-68-33.ap-northeast-1.compute.amazonaws.com:8081/';
 const API_URL = 'http://localhost:8081/';


class ProjectService {

  getProjects(){
    
    return axios.get(API_URL + 'projects', { headers: authHeader() });
}
createProject(projectName,projectId) {
  const data = [projectName,projectId];
    return axios.post(API_URL + 'projects/createProject',
      projectName, { headers: authHeader() });
  }
 
}
export default new ProjectService();