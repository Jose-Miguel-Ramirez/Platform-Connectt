import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_MESSAGES, Message } from "@/lib/mock-data-extended";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 201, // Mock sending as 'Me'
      receiverId: 101,
      content: inputValue,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
          {messages.filter(m => !m.read && m.receiverId === 201).length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 border-primary/20">
          <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row justify-between items-center rounded-t-xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=101" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">Chat de Soporte</CardTitle>
                <p className="text-xs opacity-80">En línea</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden bg-muted/5">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.senderId === 201;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          isMe 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-white border border-border shadow-sm rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                        <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="p-3 border-t bg-background flex gap-2">
              <Input 
                placeholder="Escribe un mensaje..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-muted/20"
              />
              <Button size="icon" onClick={handleSend} className="bg-primary">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
