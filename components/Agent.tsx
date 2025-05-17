"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/actions/general.action";
import { interviewer } from "@/constants";
import {PhoneOff} from "lucide-react";

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type?: "generate" | "interview";
  questions?: string[];
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = (reason?: string) => {
      console.log("Call ended. Reason:", reason || "Unknown");
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/assistant/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/interview");
      } else {
        handleGenerateFeedback(messages);

      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);


  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start( "9481d81d-8313-4941-9ea8-22afc7cec0c8", {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div
        className={
          "flex sm:flex-row flex-col gap-10 items-center p-3 justify-between w-full h-full"
        }
      >
        <div
          className={
            "flex  items-center justify-center flex-col gap-2 p-7 h-[400px] rounded-lg dark:bg-black/70 bg-white/60  shadow-xl flex-1 sm:basis-1/2 w-full"
          }
        >
          <div
            className={
              " z-10 flex items-center justify-center rounded-full size-[120px] relative"
            }
          >
            <Image
              alt={"ai assistant"}
              className={`object-cover  ${isSpeaking ? "animate-pulse" : ""}`}
              height={100}
              src={"/ai.gif"}
              width={100}
            />
            {isSpeaking && (
              <div className="absolute w-10 h-10 bg-green-600 rounded-full backdrop-blur animate-ping" />
            )}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div
          className={
            "bg-white dark:bg-black p-0.5 rounded-2xl flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden shadow-xl"
          }
        >
          <div
            className={
              "flex flex-col gap-2 justify-center items-center p-7 dark-gradient rounded-2xl min-h-full"
            }
          >
            <Image
              alt={"user"}
              className={"rounded-full object-cover size-[120px]"}
              height={540}
              src={"/user-avatar.png"}
              width={540}
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-full">
          <div className="bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100",
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className={"w-full flex justify-center"}>
        {callStatus !== "ACTIVE" ? (
          <Button
            className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-green-600 hover:bg-green-500 min-w-28 cursor-pointer items-center justify-center overflow-visible"
            onPress={() => handleCall()}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden",
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </Button>
        ) : (
          <Button
            className=" px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-red-400 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-red-300 hover:bg-red-500 min-w-28"
            onClick={() => handleDisconnect()}
            color={"danger"}
            variant={"bordered"}

          >
            <PhoneOff className={" rotate-90"}/>

          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
