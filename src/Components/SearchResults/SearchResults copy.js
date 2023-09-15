import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Classes from './Search.module.css';
import Skeleton from '../Ui/Skeleton/Skeleton';

export default function SearchResults() {
  const getRandomValue = () => Math.floor(Math.random() * 16) + 1;
  const [clicked, setClicked] = useState(Array(10).fill(false));
  const [loading, setLoading] = useState(true);
  const [animalList, setAnimalList] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const animalFunctions = Object.values(faker.animal);

      const newAnimalList = [...Array(10)].map((_, index) => {
        const animalFunction = animalFunctions[getRandomValue()];

        return {
          name: animalFunction(),
          image: faker.image.animals(644, 362, true),
          url: faker.internet.url(),
          text: faker.lorem.sentences(),
          title: faker.lorem.words(),
          type: animalFunction(),
          key: index,
        };
      });

      setAnimalList(newAnimalList);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  const handleDivClick = (index) => {
    const newClicked = [...clicked];
    newClicked[index] = !newClicked[index];
    setClicked(newClicked);
  };

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
                </div>
              )}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
