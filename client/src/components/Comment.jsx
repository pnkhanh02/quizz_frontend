import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useStateValue } from '../contex/AppContext';
import quizService from '../services/quizService';

const Comment = () => {
    const { state, dispatch } = useStateValue();
    const { user, quizzes,comment } = state;
    const navigate = useNavigate();
    const [allComments, setAllComments] = useState(quizzes.comments);
    const [commentText, setCommentText] = useState('');
    const commentContainerRef = useRef(null);

    useEffect(() => {
        // Cuộn xuống dưới cùng của khung hiển thị comment mỗi khi allComments thay đổi
        if (commentContainerRef.current) {
            commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
        }
    }, [allComments]);

    const handlePostComment = async (e) => {
        e.preventDefault(); // Ngăn chặn việc reload trang khi submit form

        try {
            // Cập nhật formData trước khi gọi API
            const formData = {
                sentFromId: user.user._id,
                message: commentText,
                quizId: quizzes._id
            };

            // Gọi API để thêm comment mới
const response = await quizService.addComment(formData);


    // Tạo một bản sao mới của mảng allComments và thêm comment mới vào đó
    const res = await quizService.getQuizDetails(quizzes._id);
console.log("comments moi la",res.data.quiz.comments)
dispatch({ type: "UPDATE_COMMENT",payload: res.data.quiz.comments.length});
    // Cập nhật state allComments với mảng mới
    setAllComments(res.data.quiz.comments);
    
    // Xóa nội dung trong ô comment
    setCommentText('');


        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <section className="w-full rounded-lg border-2 border-purple-600 p-4 my-8 mx-auto max-w-xl h-[500px] ">
            <h3 className="font-os text-lg font-bold">Comments</h3>
            <div ref={commentContainerRef} className="overflow-y-auto overflow-x-hidden h-5/6">
            {allComments?.map((comment, index) => {
                const createdAt = new Date(comment.posted);
                const day = createdAt.getDate();
                const month = createdAt.getMonth() + 1;
                const year = createdAt.getFullYear();
                const formattedDate = `${year}/${month}/${day}`;
                return(
                <div key={index} className="flex mt-4">
                    <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
                        <img className="h-12 w-12 rounded-full object-cover" src={comment?.sentFromId?.avatar} alt="" />
                    </div>

                    <div className="ml-3">
                        <div className="font-medium text-purple-800">{comment?.sentFromId?.name}</div>
                        <div className="text-gray-600">Posted on {formattedDate}</div>
                        <div className="mt-2 text-purple-800">{comment?.message}</div>
                    </div>
                </div>
            )})}
            </div>

            <form className="mt-4" onSubmit={handlePostComment}>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-purple-800 font-medium">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        className="border-2 border-purple-600 p-2 w-full rounded"
                        required
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-600"
                >
                    Post Comment
                </button>
            </form>
        </section>
    );
}

export default Comment;
