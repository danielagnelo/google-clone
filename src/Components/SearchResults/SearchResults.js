import React, { useState, useEffect, useContext } from 'react';
import Classes from './Search.module.css';
import Skeleton from '../Ui/Skeleton/Skeleton';
import { generateAnimalList } from '../../Api/useData';
import QueryContext from '../../Context/QueryContext';
import Spinner from '../Ui/Spinner/Spinner';

export default function SearchResults() {
  const [clicked, setClicked] = useState(Array(10).fill(false));
  const Context = useContext(QueryContext);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(Array(10).fill(false)); // Estado para rastrear o carregamento de cada imagem
  const [animalList, setAnimalList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      const newAnimalList = generateAnimalList(Context);
      setAnimalList(newAnimalList);
      setLoading(false);
    }, 1800);

    return () => clearTimeout(delay);
  }, [Context]);

  const handleDivClick = (index) => {
    const newClicked = [...clicked];
    newClicked[index] = !newClicked[index];
    setClicked(newClicked);
  };

  useEffect(() => {
    // Esta função será executada sempre que clicked ou animalList mudar
    const loadImage = async (index) => {
      const img = new Image();
      img.src = animalList[index].image;
      img.onload = () => {
        const newImageLoaded = [...imageLoaded];
        newImageLoaded[index] = true;
        setImageLoaded(newImageLoaded);
      };
    };

    clicked.forEach((isOpen, index) => {
      if (isOpen && !imageLoaded[index]) {
        loadImage(index);
      }
    });
  }, [clicked, animalList, imageLoaded]);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        animalList.map((animal, index) => (
          <div
            className={Classes.Results__box}
            key={animal.key}
            onClick={() => handleDivClick(index)}
          >
            <span className={Classes.gridContainer}>
              <div className={Classes.Result__link}>
                <h6>{animal.url}</h6>
                <a href={animal.url}>{animal.name}</a>
                <div className='flex'>
                  <p className={Classes.animal__para}>{animal.text}</p>
                </div>
              </div>
              {clicked[index] && (
                <div className={Classes.popup}>
                  {imageLoaded[index] ? (
                    <>
                      <img
                        className={Classes.image}
                        src={animal.image}
                        alt={animal.type}
                      />
                      <div>
                        <h6>{animal.url}</h6>
                        <a href={animal.url}>{animal.name}</a>
                        <p className={Classes.animal__para}>{animal.text}</p>
                      </div>
                    </>
                  ) : (
                    // <div className={Classes.loading}>Carregando...</div>
                    <div className={`${Classes.spinner} ${!imageLoaded[index] ? Classes.spinnerVisible : ''}`}>
                      <Spinner />
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
