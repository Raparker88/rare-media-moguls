import React, { useContext } from 'react';

import { UserContext } from './UserProvider';

export const UserImageForm = () => {

  const { addImage } = useContext(UserContext);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    getBase64(e.target.game_image.files[0], async imageBase64 => {
      await addImage(imageBase64);
    });
  };

  return (
    <div className="game-image-form-wrapper">
      <h3 className="game-image-form__header">Upload your own photo!</h3>
      <form className="game-image-form" onSubmit={handleSubmit}>
        <input className="game-image-form__file" type="file" id="game_image" />
        <button className="game-image-form__submit btn btn--create" type="submit">Upload</button>
      </form>
    </div>
  );
};