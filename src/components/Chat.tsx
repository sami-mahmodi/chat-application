'use client'

// components/Chat.tsx
import { useState, useEffect } from 'react';
import { firestore } from '../utils/firebase.utils';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const Chat: React.FC = () => {

    
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className='p-8 flex flex-col justify-center '>
      <div>
        {messages.map((message) => (
          <div key={message.id} className='p-4 rounded-md bg-sky-900 my-2 uppercase'>{message.text}</div>
        ))}
      </div>
      <input
      className='outline-none text-black py-2 px-2 rounded-md w-full my-4'
        type="text"
        placeholder='Write Your Message..'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <div className='flex justify-center'>

      <button onClick={sendMessage} className='bg-sky-500 hover:bg-sky-700 px-8 py-2 rounded-md w-28'>send</button>
      </div>
    </div>
  );
};

export default Chat;
