import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, TextInput, Card } from 'flowbite-react';
import { HiPaperAirplane } from 'react-icons/hi';
import { io, Socket } from 'socket.io-client';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

interface ServerMessage {
    response: string;
}

interface ServerError {
    error: string;
}

const SOCKET_SERVER_URL = 'http://localhost:8080'; // Replace with your server URL

const TestChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        newSocket.on('message', (data: ServerMessage) => {
            addMessage(data.response, false);
        });

        newSocket.on('error', (data: ServerError) => {
            console.error('Error:', data.error);
            // You might want to display this error to the user
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const addMessage = useCallback((text: string, isUser: boolean) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), text, isUser }
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputMessage.trim() && socket) {
            socket.emit('message', inputMessage);
            addMessage(inputMessage, true);
            setInputMessage('');
        }
    }, [inputMessage, socket, addMessage]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    }, []);

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <Card className="w-full max-w-2xl mx-auto my-8 h-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                    Chat with หลานเอง
                </h5>
                <div className="flex-grow overflow-auto mb-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isUser
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={sendMessage} className="flex space-x-2">
                    <TextInput
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={handleInputChange}
                        className="flex-grow"
                    />
                    <Button type="submit" color="success">
                        <HiPaperAirplane className="mr-2 h-5 w-5" />
                        Send
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default TestChat;