/**
 * Initializes the socket.io server.
 *
 * @param {Object} io - The socket.io server instance.
 */
exports.init = function(io) {

    /**
     * Handles the 'connection' event.
     *
     * @param {Object} socket - The socket that connected.
     */
    const chat = io.on('connection', function (socket) {
        console.log('someone connected');
        try {
            /**
             * Handles the 'join' event.
             *
             * @param {string} room - The room to join.
             * @param {string} user - The user who is joining.
             */
            socket.on('join', function (room, user) {
                socket.join(room);
                io.to(room).emit('joined', room, user);
                console.log(user + ' joined room ' + room);
            });

            /**
             * Handles the 'chat' event.
             *
             * @param {string} room - The room where the chat message was sent.
             * @param {Object} message - The chat message.
             */
            socket.on('chat', function (room, message) {
                io.to(room).emit('chat', room, message);
                console.log(message.user + ' sent a message in room ' + room + ': ' + message.text);
            });

            /**
             * Handles the 'disconnect' event.
             */
            socket.on('disconnect', function(){
                console.log('someone disconnected');
            });
        } catch (e) {
            console.error('Error:', e);
        }
    });
}