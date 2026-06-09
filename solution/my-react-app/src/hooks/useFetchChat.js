import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useFetchChat = () => {

    const [roomList, setRoomList] = useState([
        { name: 'Players', messages: [{ user: 'System', text: 'Welcome to the Players room!' }], joined: false},
        { name: 'Clubs', messages: [ { user: 'System', text: 'Welcome to the Clubs room!' }], joined: false},
        { name: 'Games', messages: [ { user: 'System', text: 'Welcome to the Games room!' }], joined: false},
        { name: 'Competitions', messages: [ { user: 'System', text: 'Welcome to the Competitions room!' }], joined: false},
    ]);
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Connessione stabilita con successo al server Socket.IO');
            });

            socket.on('chat', function (room, message) {
                console.log(`${message.user} sent a message in room ${room}: ${message.text}`);
                const sender = message.user === user ? 'Me' : message.user;
                setRoomList(prevRoomList => prevRoomList.map(roomItem => {
                    if (roomItem.name === room) {
                        return {
                            ...roomItem,
                            messages: [...roomItem.messages, { ...message, user: sender }],
                        };
                    }
                    return roomItem;
                }));
            });

            return () => {
                console.log('Chiusura della connessione al server Socket.IO');
                socket.disconnect();
            };
        }
    }, [socket]);

    const handleLogin = (username) => {
        if (username.trim() !== '') {
            setUser(username);
            const socket_io = io.connect('http://localhost:3000');
            setSocket(socket_io);
        } else {
            alert('Please enter a valid username');
        }
    };

    const handleSelectRoom = (room) => {
        setSelectedRoom(room); 
        if (socket && !room.joined) {
            socket.emit('join', room.name, user);
            socket.on('joined', function(room, user) {
                setRoomList(prevRoomList => prevRoomList.map(roomItem => {
                    if (roomItem.name === room) {
                        return {
                            ...roomItem,
                            joined: true,
                        };
                    }
                    return roomItem;
                }));
                console.log(`User ${user} joined room ${room}`);
            });
        }
    };

    const handleSendMessage = (messageText) => {
        if (socket && selectedRoom && user) {
            const message = {
                user: user,
                text: messageText,
            };
            socket.emit('chat', selectedRoom.name, message);
        }
    };

    return { roomList, selectedRoom, handleLogin, handleSelectRoom, handleSendMessage };
};

export default useFetchChat;
