const express = require('express');
const api = express();
const server = require('http').createServer(api);
let io = require('socket.io')(server);
const dotenv = require('dotenv');
const cors = require('cors');
const MyConnectionDB = require('./config/ConfigDatabase');

dotenv.config();

//Enviroment variables
const { HOSTNAME_SERVER, PORT_SERVER, secret} = process.env;

/* Midllewars */
api.use(cors());
api.use(express.json()); //Parse the incomming request with json
api.use(express.urlencoded({ extended:false })); //url encode for get data form
api.use((request, response, next)=>{
    if (!request.session)
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/* Import routes from folder routes */
api.use('/', require('./routes/RouteAuth'));
api.use('/house', require('./routes/RouteHouse'));
//api.use('/job', require('./routes/RouteJob'));
api.use('/university', require('./routes/RouteUniversity'));

api.use(express.static('public'));

//*********************************************** */
//*********************************************** */
//*********************************************** */
//*********************************************** */

// Retornar o valor atualizado da base de dados para o front-end
io.on('connection', socket => {
    
    MyConnectionDB.query("SELECT * FROM Students WHERE StudentID = 2", (err, result) => {
        if (err) {
            socket.emit('error', { response: 'Server problem'});
        }
        let {Life, Emotion} = result[0];
        socket.emit('life', { life: Life, Emotion });
        console.log(Emotion)
        socket.on('rent', (data) => {
            let { money, idHouse, idStudent } = data;
            // Atualizar o valor na base de dados
            MyConnectionDB.query("UPDATE Students SET Money = ?, WHERE StudentID = ?", [money, idHouse, idStudent], (err, result) => {
                if (err) {
                    socket.emit('error', { response: 'Error'});
                }
                console.log("value updated");
            });
            // Retornar o valor atualizado para o front-end
            io.sockets.emit('money', { money });
        });

        if(Life >  0 || Emotion > 0){
            
            //Decrementar o valor armazenado na base de dados toda vez que o front-end envia uma requisição
            socket.on('decrement', () => {
                Life--;
                Emotion --;
                if (Life == 0 || Emotion == 0) {
                    io.sockets.emit('gameOver', { response: 'Game over' });
                    return;
                }
                // Atualizar o valor na base de dados
                MyConnectionDB.query("UPDATE Students SET Life = ?, Emotion = ? WHERE StudentID = 2", [Life, Emotion], (err, result) => {
                    if (err) {
                        socket.emit('error', { response: 'Error'});
                    }
                    //console.log("value updated");
                });
                // Retornar o valor atualizado para o front-end
                io.sockets.emit('life', { life: Life });
            });
        } else {
            // Atualizar o valor na base de dados
            MyConnectionDB.query("UPDATE Students SET Life = ?, Emotion = ? WHERE StudentID = 2", [0, 0], (err, result) => {
                if (err) {
                    socket.emit('error', { response: 'Error'});
                }
                console.log("value updated");
            });
            // Retornar o valor atualizado para o front-end
            io.sockets.emit('gameOver', { response: 'Game over' });
            return;
        };
    });
});

server.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${HOSTNAME_SERVER}:${PORT_SERVER}`);
});