'use client';

import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { askGemini } from '@/lib/gemini';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function GeminiVoiceChat() {
    const { speak } = useSpeechSynthesis();
    const [chat, setChat] = useState<{ user: string; ai: string }[]>([]);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });
    };

    const stopListening = async () => {
        SpeechRecognition.stopListening();
        const userInput = transcript;
        const response = await askGemini(`Act as a visa officer. Interview me. Question: ${userInput}`);
        setChat(prev => [...prev, { user: userInput, ai: response }]);
        speak({ text: response });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">🎤 Gemini Visa Interview</h2>
            <div className="my-4 space-y-3">
                {chat.map((c, i) => (
                    <div key={i}>
                        <p><strong>You:</strong> {c.user}</p>
                        <p><strong>Gemini:</strong> {c.ai}</p>
                    </div>
                ))}
            </div>
            <button onClick={listening ? stopListening : startListening} className="btn btn-primary">
                {listening ? 'Stop & Submit' : 'Speak'}
            </button>
        </div>
    );
}
