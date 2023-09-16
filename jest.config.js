module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/empty-file.js',
        '\\.(css)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};