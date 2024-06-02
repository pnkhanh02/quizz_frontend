import api from './axiosClient';

const authService = {
    login(body){
        return api.post("auth/login",body);
    },
    register(body) {
        return api.post("auth/register",body);
    },
    getUserDetails(id){
        return api.get(`auth/${id}`);
    },
    update(id, avatarUrl){
        return api.post(`auth/update/${id}`, { avatar: avatarUrl });
    },
    getAllUsers(){
        return api.get(`auth/user/all`);
    },
    

};

export default authService;
