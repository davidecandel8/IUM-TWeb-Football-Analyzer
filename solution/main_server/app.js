var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const openApiDocumentation = require('./swagger/swaggerDocumentationMainServer.json')

var playersRouter = require('./routes/players')
var gamesRouter = require('./routes/games')
var gameEventsRouter = require('./routes/gameEvents')
var gameLineupsRouter = require('./routes/gameLineups')
var clubsRouter = require('./routes/clubs')
var competitionsRouter = require('./routes/competitions')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../my-react-app/build')));
//app.use(express.static('build'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))

app.use('/players', playersRouter)
app.use('/games', gamesRouter)
app.use('/game_events', gameEventsRouter)
app.use('/game_lineups', gameLineupsRouter)
app.use('/clubs', clubsRouter)
app.use('/competitions', competitionsRouter)


module.exports = app;
