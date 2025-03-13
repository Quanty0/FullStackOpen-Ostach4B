import axios from 'axios'
<<<<<<< HEAD
const baseUrl = '/api/allPersons'
=======
const baseUrl = 'http://localhost:5000/persons'
>>>>>>> 1e230855cac99f9436e80e32b3779c15b206cd72

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }  

  const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
  };

const personServices = { getAll, create, update, remove }

export default  personServices 