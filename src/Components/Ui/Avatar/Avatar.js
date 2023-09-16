import React from 'react';
import './Avatar.css';

export default function Avatar(props) {
    const { imageUrl, altText } = props; // Extrai as propriedades imageUrl e altText do objeto props

    return (
        <div className="avatar-container">
            <img className="avatar-image" src={imageUrl} alt={altText} />
        </div>
    );
}
