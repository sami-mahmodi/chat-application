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
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <input
      className='text-black'
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
