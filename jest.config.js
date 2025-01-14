module.exports = {
    roots: ['<rootDir>/src'],
    // testMatch: ['/tests//*.spec.ts'],
    transform: {
        '^.+\.ts?$': 'ts-jest'
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    },
}