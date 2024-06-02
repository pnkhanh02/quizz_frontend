import React, { useReducer, useState } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import { useNavigate } from 'react-router';
import { useStateValue } from '../contex/AppContext';

const Profile = () => {

  const { state, dispatch } = useStateValue();
  const { user, quizzes } = state;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_AVATAR':
        return { ...state, avatar: action.payload };
      default:
        return state;
    }
  };

  const [avatarState, avatarDispatch] = useReducer(reducer, { avatar: user.user.avatar });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return; // No image selected

    const formData = new FormData();
    formData.append('avatar', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/uploadAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const avatarUrl = response.data.image_url;
      console.log('Uploaded avatar URL:', avatarUrl, user.user._id);

      // Update user's avatar
      await authService.update(user.user._id, avatarUrl);
      console.log('Avatar updated successfully');
      
      // Update sidebar avatar
      dispatch({ type: "UPDATE_AVATAR", payload: avatarUrl });

      navigate('/homepage');

      // Perform any additional actions after updating the avatar

    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div className='h-full w-full bg-gray-100 flex items-center justify-center'>
      <div className="profile-wrapper">
        <div className="body">
          <div className="cards">
            <div className="left">
              <div className="img-uploader">
                <div>Upload Avatar Image</div>
                <div className="upload-box">
                  <input type="file" onChange={handleImageChange} />
                  {previewImage && <img className="display-image" src={previewImage} alt="Preview" />}
                </div>
                <div style={{ fontSize: '.8em', margin: '20px 0'}}></div>
                <button className="image-btn" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;