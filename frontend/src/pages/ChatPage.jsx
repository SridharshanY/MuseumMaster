import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import back from '../assets/back.svg'

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const navigate = useNavigate()

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/chat", { message: input });
            const botReply = { text: response.data.reply, sender: "bot" };
            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Card className="w-100 shadow-lg" style={{ maxWidth: "600px" }}>
                <Card.Header className="bg-warning text-dark">
                    <h4 className="text-center">Chat with AI</h4>
                </Card.Header>
                <Card.Body className="chat-box overflow-auto" style={{ height: "400px" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                            <div className={`p-2 rounded shadow-sm ${msg.sender === "user" ? "bg-warning text-dark" : "bg-secondary text-light"}`} style={{ maxWidth: "75%" }}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </Card.Body>
                <Card.Footer className="bg-secondary rounded">
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button variant="warning" onClick={sendMessage} className="ms-2">
                            Send
                        </Button>
                    </Form>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default ChatPage;
