import api from './axiosClient';

const quizService = {
    getAll(){
        return api.get("/quizzes/all-quizzes");
    },
    getAllMyQuizzes(createdBy,page){
        return api.get(`/quizzes/my-quizzes/${createdBy}?page=${page}`);
    },
    getMyDashBoard(userId){
        return api.get(`/quizzes/my-dashboard/${userId}`);
    },
    getQuizDetails(quizId){
        return api.get(`/quizzes/get-quiz/${quizId}`);
    },
    updateOneQuestion(body){
        return api.put(`/quizzes/updateQuestion`,body);
    },
    addOneQuestion(body){
        return api.post(`/quizzes/addQuestion`,body);
    },
    addComment(body){
        return api.post(`/quizzes/add-comment`,body);
    },
    deleteOneQuestion(params, body) {
        return api.delete(`/quizzes/deleteQuestion`, { params, data: body });
      },
    deleteScores(body) {
        return api.delete('/quizzes/deleteScores', body);
      },
    create(body) {
        return api.post("/quizzes/create",body);
    },
    update(quizId,body) {
        return api.put(`/quizzes/updateQuiz/${quizId}`,body);
    },
    delete(id) {
        return api.delete(`/quizzes/delete/${id}`);
    },
    uploadImage(body){
        return api.post(`/upload`,body)
    }
};

export default quizService;


