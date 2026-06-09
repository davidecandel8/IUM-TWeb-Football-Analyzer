var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const db = require('./databases/football_analyzer_db')

var appearancesRouter = require('./routes/appearances')
var gamesRouter = require('./routes/games')
var gameEventsRouter = require('./routes/gameEvents')
var gameLineupsRouter = require('./routes/gameLineups')

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/appearances', appearancesRouter)
app.use('/games', gamesRouter)
app.use('/game_events', gameEventsRouter)
app.use('/game_lineups', gameLineupsRouter)

module.exports = app;
