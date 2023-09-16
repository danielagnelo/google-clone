import React from 'react'
import './Skeleton.css'

export default function Skeleton() {
    const skeletons = [];

    // Repetir o skeleton cinco vezes
    for (let i = 0; i < 5; i++) {
        skeletons.push(
            <a className="card" id="card-link" target="_blank" key={i}>
                <div className="card__header">
                    <div className="card__body body__img">
                        <img className="skeleton" alt="" id="cover-img" />
                    </div>
                    <h3 className="card__header header__title" id="card-title">
                        <div className="skeleton skeleton-text-top" style={{ width: '35%' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '50%', marginBottom: '0.2rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '70%', marginBottom: '0.2rem' }}></div>
                    </h3>
                    <div className="card__body body__img">
                        <img className="skeleton-header" alt="" id="cover-img" />
                    </div>
                </div>
            </a>
        );
    }

    return <>{skeletons}</>;
}
