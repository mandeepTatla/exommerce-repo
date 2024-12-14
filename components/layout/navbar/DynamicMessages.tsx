'use client';

import { useEffect, useState } from 'react';

interface DynamicMessagesProps {
  messages: string[];
  intervalTime?: number;
}

const DynamicMessages = ({ messages, intervalTime = 2000 }: DynamicMessagesProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Set up a timer to change the message
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [messages, intervalTime]);

  return (
    <div className="flex justify-center bg-black p-1 text-white transition-opacity duration-500">
      {messages[currentMessageIndex]}
    </div>
  );
};

export default DynamicMessages;
