import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import 'tailwindcss/tailwind.css';
import useFetchChat from '../hooks/useFetchChat';
import Message from '../components/generalComponents/Message';
import { inputStyleChat, inputStyle } from '../utils/commons'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { MdSend } from "react-icons/md";

function ChatScreen() {

  const { roomList, selectedRoom, handleLogin, handleSelectRoom, handleSendMessage } = useFetchChat();
  const [isLogged, setIsLogged] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {!isLogged ? (
        <div className="flex flex-col items-center text-center my-auto">
        <Input 
          value={username}
          className="p-2 mb-8 w-[300px] h-[50px]"
          classNames={inputStyle}
          color='success' 
          variant='faded' 
          radius='full' 
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin(username);
              setIsLogged(true);
            }
          }}
        />
      <Button onClick={() => {handleLogin(username); setIsLogged(true);}} className='h-[55px] bg-myGreen' variant='solid' radius='full'>Login</Button>
      </div>
      ) : (
      <div className="flex flex-grow">
        {/* Lista delle room sulla destra */}
        <div className="w-1/4">
          <div className="border-b-1 border-grey3">
            <h1 className="text-lg font-semibold m-4 text-center text-white">Room List</h1>
          </div>
          <div> 
            <ul>
              {roomList.map((room) => (
                <li
                  key={room.name}
                  onClick={() => handleSelectRoom(room)}
                  className={`cursor-pointer p-4 border-1 rounded-full m-2 border-grey3 ${
                    selectedRoom && selectedRoom.name === room.name ? 'bg-myGreen text-black' : 'text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    {room.name}
                    <span className='text-white'>{room.joined ? <RiCheckboxBlankCircleFill /> : <RiCheckboxBlankCircleLine />}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat aperta sulla sinistra */}
        <div className=" w-3/4 flex flex-grow flex-col border-l-1 border-grey3">
          
          {selectedRoom ? (
            <>
              {/* Nome della room*/}
              <div className="border-b-1 border-grey3">
                <h1 className="text-lg font-semibold m-4 text-white">{selectedRoom.name}</h1>
              </div>

              {/* Lista dei messaggi */}
              <div className="h-[calc(100vh-500px)] overflow-y-auto flex-grow flex flex-col">
                {roomList.find(room => room.name === selectedRoom.name)?.messages.map((message, index) => (
                  <Message key={index} user={message.user} text={message.text} />
                ))}
              </div>

              {/* Input e Button*/}
              <div className="flex border-t-1 border-grey3 p-2">
                <Input value={messageText} 
                  className='flex-grow w-9/10 mr-2' 
                  classNames={inputStyleChat}
                  color='success' 
                  variant='faded' 
                  radius='full' 
                  placeholder='Type a message...'
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (messageText.trim() !== "") {
                        handleSendMessage(messageText); 
                        setMessageText(""); 
                      }
                    }
                  }}
                />
                <Button 
                  className='w-1/10 h-[55px] bg-myGreen' 
                  variant='solid' 
                  radius='full'
                  onClick={() => {
                    if (messageText.trim() !== "") {
                        handleSendMessage(messageText); 
                        setMessageText(""); 
                    }
                }}
                >
                  Send<MdSend />
                </Button>
              </div>
            </>
          ) : (
          <div className="text-center my-auto">
            <p className="text-white">Select a room from the list on the right to start messaging</p>
          </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default ChatScreen;
