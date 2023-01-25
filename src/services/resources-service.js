import axios from "axios";

const URL = 'https://media-content.ccbp.in/website/react-assignment/resources.json';
const POST_URL = 'https://media-content.ccbp.in/website/react-assignment/add_resource.json';
class ResourceService {

  getAllResources() {
    return axios.get(URL);
  }
  createResource() {
    return axios.get(POST_URL);
  }

}

export default new ResourceService();