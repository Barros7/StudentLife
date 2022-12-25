const { gameOver } = require('../service/gameOver');
const hashPassword = require('../service/passwordHash');
describe('Test game over function', () => {
    test('Test CSPRNG', () => {
        let testPass = hashPassword(12345);
        expect(testPass).toBe(testPass === '7b94fc0b65e2c515f3007d918c57e5ce95493084e00820ca5c2e84704114140d')
    });
});