const { gameOver } = require('../service/gameOver');
const hashPassword = require('../service/passwordHash');
describe('Test game over function', () => {
    test('Test CSPRNG', () => {
        let testPass = hashPassword(12345);
        expect(testPass).toBe(testPass === '7b94fc0b65e2c515f3007d918c57e5ce95493084e00820ca5c2e84704114140d')
    });
});

/*
    io.on('connection', function(socket) {
        socket.on('create', function(data) {
            // código para criar um novo registro usando os dados enviados pelo cliente
        });

        socket.on('read', function(id) {
            // código para ler um registro específico e enviar os dados de volta para o cliente
        });

        socket.on('update', function(data) {
            // código para atualizar um registro usando os dados enviados pelo cliente
        });

        socket.on('delete', function(id) {
            // código para deletar um registro
        });
    });
*/