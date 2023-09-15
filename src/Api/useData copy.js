import React from 'react';
import { faker } from '@faker-js/faker';

export default function AnimalDataComponent() {
    const animalFunctions = Object.values(faker.animal);
    const getImage = faker.image;
    const getUrl = () => faker.internet.url();
    const getText = () => faker.lorem.sentences();
    const getTitle = (type) => faker.lorem.words();

    const useData = [...new Array(10)].map((item, index) => {
        const randomNumber = Math.floor(Math.random() * animalFunctions.length);
        const animalFunction = animalFunctions[randomNumber];

        if (typeof animalFunction === 'function') {
            const type = animalFunction();
            const title = getTitle(type);

            return {
                type,
                id: index + 1,
                url: getUrl(),
                title,
                description: getText(),
                image: getImage.animals(644, 362, true),
            };
        } else {
            console.error(`Animal function at index ${randomNumber} is not a function.`);
            return null;
        }
    });

    return (
        <div>
            {/* Render the data or components that use the data here */}
        </div>
    );
};
