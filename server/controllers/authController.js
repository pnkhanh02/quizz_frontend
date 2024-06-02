const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../config/cloudinary');
const Quiz = require('../models/QuizModel');
const Score = require('../models/ScoresModel');


exports.register = async (req,res,next) => {
    try{
        //req.body -name,email,password,confirmPassword
        const { name, email, password, confirmPassword } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        
        if(!name || !email || !password || !confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message:'The input is required'
            })
        }else if (!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message:'The input is email'
            })
        } else if (password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message:'The password not equal confirmPassword'
            })
        }
        console.log('isCheckEmail', isCheckEmail)
        const user = await User.create(req.body);
        const token = jwt.sign({userId : user._id},process.env.APP_SECRET);
        return res.json({
            status: 'success',
            data:{token,
                user}
        })
        
    }catch (error){
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'Internal server error'
    });
    }
}

exports.login = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            //Error : Email  is not correct
        }
        if (bcrypt.compareSync(req.body.password,user.password)){
            const token = jwt.sign({userId : user._id},process.env.APP_SECRET);
             return res.json({
                status : 'success',
                data: {
                    token,
                    user
                }
            })
        }else {
            //Error: Password is not correct
        }
    }catch (error){
        res.json(error);
    }
}

exports.getDetailsUser = async (req, res,next) => {
    try {
        User.findOne({ _id: req.params.id }).then(user => {
            res.json({ user, success: true })
        }).catch(er => {
            res.json({ success: false, message: er.message });
        })
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'Internal server error'
    });
    }
}

exports.updateAvatar = async (req, res, next) => {
    const { id } = req.params;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Avatar updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  }
  
  // Route handler
exports.getAllUsers = async (req, res, next) => {
    try {
        // Lấy tất cả người dùng
        const users = await User.find();
    
        // Lặp qua từng người dùng và đếm số lượng bài quiz mà họ đã tạo
        const usersWithQuizCount = await Promise.all(users.map(async (user) => {
          // Đếm số lượng bài quiz mà người dùng đã tạo
          const quizCount = await Quiz.countDocuments({ createdBy: user._id });
          const scoreCount = await Score.countDocuments({ userId: user._id });
    
          // Trả về đối tượng người dùng kèm số lượng bài quiz
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            quizCount: quizCount,
            scoreCount: scoreCount,
            avatar: user.avatar,
            createdAt: user.createdAt,
            isAdmin: user.isAdmin
          };
        }));
    
        // Gửi danh sách người dùng kèm số lượng bài quiz dưới dạng phản hồi JSON
        res.json({ success: true, data: usersWithQuizCount });
      } catch (error) {
        console.error('Failed to retrieve users with quiz count:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve users with quiz count' });
      }
  };
  




