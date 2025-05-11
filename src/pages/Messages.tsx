import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavFooter from "../components/MobileNavFooter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const Messages: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟获取聊天列表
  useEffect(() => {
    const mockChats: Chat[] = [
      {
        id: "1",
        participant: {
          id: "user1",
          name: "绿色工坊",
          avatar: "/public/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png"
        },
        lastMessage: "您好，请问这个商品还在售吗？",
        lastMessageTime: "10:30",
        unreadCount: 2
      },
      {
        id: "2",
        participant: {
          id: "user2",
          name: "创意星球",
          avatar: "/public/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png"
        },
        lastMessage: "好的，我们可以约个时间见面交易",
        lastMessageTime: "昨天",
        unreadCount: 0
      }
    ];
    setChats(mockChats);
    setIsLoading(false);
  }, []);

  // 模拟获取消息历史
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: "1",
          sender: "user1",
          receiver: "me",
          content: "您好，请问这个商品还在售吗？",
          timestamp: "10:30",
          isRead: true
        },
        {
          id: "2",
          sender: "me",
          receiver: "user1",
          content: "是的，还在售的",
          timestamp: "10:31",
          isRead: true
        },
        {
          id: "3",
          sender: "user1",
          receiver: "me",
          content: "价格可以商量吗？",
          timestamp: "10:32",
          isRead: false
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      receiver: selectedChat,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");

    // 更新聊天列表中的最后一条消息
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, lastMessage: newMessage, lastMessageTime: "刚刚" }
        : chat
    ));
  };

  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 聊天列表 */}
            <Card className="md:col-span-1 h-[calc(100vh-12rem)]">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">消息</h2>
              </div>
              <ScrollArea className="h-[calc(100%-4rem)]">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedChat === chat.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={chat.participant.avatar}
                          alt={chat.participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">{chat.participant.name}</h3>
                          <span className="text-sm text-gray-500">{chat.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="bg-lowcarbonart-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </Card>

            {/* 聊天界面 */}
            <Card className="md:col-span-2 h-[calc(100vh-12rem)] flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={chats.find(c => c.id === selectedChat)?.participant.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">
                        {chats.find(c => c.id === selectedChat)?.participant.name}
                      </h3>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender === "me"
                                ? "bg-lowcarbonart-blue text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            <p>{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="输入消息..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  选择一个聊天开始对话
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <MobileNavFooter />
    </div>
  );
};

export default Messages;
