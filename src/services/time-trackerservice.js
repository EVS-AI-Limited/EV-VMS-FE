import axios from "axios";
import authHeader from './authHeader';

const API_URL = 'http://20.0.106.212:8081/';

class TimeTrackerService {
  addProject(taskTitle, duration, projectId, projectName, startTime, status, stopTime) {
    const data = {
      taskTitle,
      duration,
      projectName,
      startTime,
      status,
      stopTime
    };

    return axios.post(API_URL + 'timetracker/addProject', data, { headers: authHeader() });
  }
}

export default new TimeTrackerService();
