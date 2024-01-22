import axios from 'axios'

axios.defaults.baseURL = "http://localhost:9091"
axios.defaults.headers.post['Content-Type'] = "application/json"
if(localStorage.getItem('currentUser')){
    axios.defaults.headers['Authorization'] = "Bearer_"+JSON.parse(localStorage.getItem('currentUser'))['token']
}

axios.interceptors.request.use((config) => {
    console.log('request intercept config',config);
    return config;
});

const postData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        
        return response;
    } catch (error) {
        throw error;
    }
};

const updateData = async (url,data) => {
    try {
        const response = await axios.put(url, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateDataOnlyById = async (url,id) => {
    try {
        const response = await axios.put(url, id);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteData = async (url) => {
    try {
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        throw error;
    }
};

export { postData, fetchData ,updateData,deleteData ,updateDataOnlyById};