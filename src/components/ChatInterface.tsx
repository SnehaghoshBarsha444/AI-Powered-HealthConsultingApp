import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  role?: "user" | "assistant" | "system";
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get the current user's session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('You must be logged in to send messages');
      }

      // Format messages for the API
      const formattedMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.role || (msg.sender === "user" ? "user" : "assistant"),
          content: msg.text
        }));

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: formattedMessages,
          doctorSpecialty: "Medical Professional",
        },
      });

      if (error) throw error;

      const aiResponse = data.choices[0].message.content;
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        role: "assistant",
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Store the conversation in Supabase with the user_id
      const { error: dbError } = await supabase
        .from('questions')
        .insert([
          {
            question: userMessage.text,
            category: "general",
            user_id: session.user.id, // Set the user_id from the session
          }
        ]);

      if (dbError) {
        console.error('Error storing message:', dbError);
        throw dbError;
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your medical question..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};