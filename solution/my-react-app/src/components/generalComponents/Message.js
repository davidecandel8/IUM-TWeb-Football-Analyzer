import React from 'react';

function Message({ user, text }) {
  return (
    <div className={`p-2 rounded-lg m-2 ${user === 'Me' ? 'bg-gray-200 text-black self-end' : 'bg-grey3 text-white self-start'} `}>
      {user !== 'Me' && <div className="font-semibold mb-1 text-myGreen">{user}</div>}
      <div className="text-sm">{text}</div>
    </div>
  );
}

export default Message;
