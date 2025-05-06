import axios from 'axios';
import authHeader from './authHeader';

const BASE_URL = 'http://20.0.106.212:8081';

const MyCalendarService = {
  getProjects: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  submitTimeSheet: async (projectName, projectId, description, duration,date1) => {
    try {
      const payload = {
        projectName,
        projectId,
        description,
        duration,
        date1,
      };

      const response = await axios.post(`${BASE_URL}/Manual/add`, payload, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      throw error;
    }
  },

  getManualSheet(){
    
    return axios.get(`${BASE_URL}/Manual/getAll`, { headers: authHeader() });
}
};

export default MyCalendarService;
