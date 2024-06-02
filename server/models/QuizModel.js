const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    answers: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    questionName: { type: String, required: true }
});

const commentSchema = new Schema({
    sentFromId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    posted: { type: Date, default: Date.now } // Add posted field to each comment
  });

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema], // Sử dụng schema nhúng
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mustBeSignedIn: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        required: false
    },
    comments: [commentSchema],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    scores: [{
         type: Schema.Types.ObjectId,
          ref: 'Score'
     }],
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Tính tổng số câu hỏi trong mỗi bài quiz
quizSchema.virtual('totalQuestions').get(function () {
    return this.questions.length;
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;