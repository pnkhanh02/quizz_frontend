import api from './axiosClient';

const questionService = {
    getAll(params){
        return api.get("/questions",params);
    },
    create(body) {
        return api.post("/questions/create",body);
    },
    update(body) {
        return api.put("/questions/update",body);
    },
    delete(id) {
        return api.delete(`/questions/delete/${id}`);
    },
};

export default questionService;