import { faker } from '@faker-js/faker';

const getRandomValue = () => Math.floor(Math.random() * 16) + 1;

export function generateAnimalList(props) {
    const animalList = [...Array(300)].map((_, index) => {
        const animalType = faker.animal.type()
        return {
            type: animalType,
            name: faker.animal[animalType](),
            image: faker.image.animals(644, 362, true),
            url: faker.internet.url(),
            text: faker.lorem.sentences(),
            title: faker.lorem.words(),
            key: index,
        };
    });

    if (props.Term) {
        const term = props.Term.toLowerCase();

        const animalsFiltered = animalList.filter(animal => {
            return animal.name.toLowerCase().includes(term) || animal.type.toLowerCase().includes(term);
        });

        return animalsFiltered;
    }
    return null;
}
