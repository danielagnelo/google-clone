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
  const [imageLoaded, setImageLoaded] = useState(Array(10).fill(false));
  const [animalList, setAnimalList] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showDarkOverlay, setShowDarkOverlay] = useState(false);

  // This useEffect is responsible for loading data when the 'Context' dependencies change.
  useEffect(() => {
    setLoading(true);

    // Use setTimeout to simulate a delay loading data from an API.
    const delay = setTimeout(() => {
      const newAnimalList = generateAnimalList(Context);

      setAnimalList(newAnimalList);
      setLoading(false);
    }, 1800);

    return () => clearTimeout(delay);
  }, [Context]);

  // This function handles the click event on a specific div based on the provided
  const handleDivClick = (index) => {
    const newClicked = [...clicked];
    newClicked[index] = !newClicked[index];
    setClicked(newClicked);

    if (newClicked[index]) {
      setPopupOpen(true);
      setShowDarkOverlay(true);
    } else {
      setPopupOpen(false);
      setShowDarkOverlay(false);
    }
  };

  useEffect(() => {
    // This function will be executed always that clicked or animalList changes.
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
  }, [clicked, animalList, imageLoaded, popupOpen]);

  return (
    <div className={Classes.Results__container}>
      <div className={Classes.Content}>
        {loading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            {Array.isArray(animalList) && animalList.length === 0 ? (
              // Case 1: Empty Array
              <div
                className={Classes.Results__box}
                style={{ fontSize: 12 }}
              >
                {/*I could have created a list with all possible animal types and passed it through the animalList, then mapped this list to render a <span> for each item in the list, but I found it unnecessary to do so for now, and I preferred to leave it mocked. */}
                <div>Try looking for: <b>insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird</b>.</div>
              </div>
            ) : (
              // Case 2: Object Array
              showDarkOverlay && (
                <div
                  className={Classes.darkOverlay}
                >

                </div>)
            )}

            {animalList.map((animal, index) => {
              return (
                <div
                  className={Classes.Results__box}
                  key={animal.key}
                  onClick={() => handleDivClick(index)}
                >
                  <span className={Classes.gridContainer}>
                    <div className={Classes.Result__link}>
                      <h6>{animal.url}</h6>
                      <a href={animal.url}>{animal.name}</a>
                      <div className={Classes.animal__text}>
                        <p className={Classes.animal__para}>{animal.text}</p>
                      </div>
                    </div>
                    {clicked[index] && (
                      <div className={Classes.popup} onClick={() => setPopupOpen(false)}>
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
                          <div className={`${Classes.spinner} ${!imageLoaded[index] ? Classes.spinnerVisible : ''}`}>
                            <Spinner />
                          </div>
                        )}
                      </div>
                    )}
                  </span>
                </div>
              );
            })}

            {typeof animalList[0] === 'string' ? (
              // Case 3: String
              <div
                className={Classes.Results__box}
                style={{ fontSize: 12 }}
              >
                <div>No results found for <b>'{animalList[0]}'</b>.</div>
                <div>Try looking for: <b>insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird</b>.</div>
              </div>
            )
              : null}
          </>
        )}
      </div>
    </div>
  );
}
