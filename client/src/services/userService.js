import api from './axiosClient';

const userService = {
    getAll(){
        return api.get("/user");
    },
    create(body) {
        return api.post("/user/create",body);
    },
    update(body) {
        return api.put("/user/update",body);
    },
    delete(id) {
        return api.delete(`/user/delete/${id}`);
    },
};

export default userService;