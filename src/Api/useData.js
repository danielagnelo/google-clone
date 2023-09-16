import { faker } from '@faker-js/faker';

export function generateAnimalList(props) {
    // Generate an array with a mocked number of animals
    /* I could have thought of some way to filter them instead of generating
    animals 'X' times and then filtering them.
    I could have filtered until I found the desired number of animals,
    but I would have to handle a possible error that would be caused if it didn't find any animal,
    which would result in an infinite loop and take more time.
    So, for now, I preferred to leave it this way. */
    const animalList = [...Array(1000)].map((_, index) => {
        const animalType = faker.animal.type();
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

        // Filter animals based on the search term
        const animalsFiltered = animalList.filter(animal => {
            return animal.name.toLowerCase().includes(term) || animal.type.toLowerCase().includes(term);
        });

        // If no matching animals are found, return the search term as an array
        if (animalsFiltered.length === 0) {
            return [props.Term];
        }

        // Return the filtered list of animals
        return animalsFiltered;
    }

    // Return an empty array if no search term is provided
    return [];
}
