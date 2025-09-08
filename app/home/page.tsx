"use client";

import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import HomePageSkeleton from "./_components/HomePageSkeleton";
import HomeContent from "./_components/HomeContent";
import { useSuggestionRotation } from "./_hooks/useSuggestionRotation";

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Use extracted suggestion rotation hook
  const { currentSuggestion, isVisible, setIsVisible } = useSuggestionRotation(
    isListening,
    isClient
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading skeleton during hydration
  if (!isClient) {
    return <HomePageSkeleton />;
  }

  const startListening = () => {
    setIsListening(true);
    setIsVisible(true); // Ensure visibility when listening
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    setIsVisible(true); // Reset visibility when stopping
    SpeechRecognition.stopListening();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <HomeContent
      transcript={transcript}
      isListening={isListening}
      currentSuggestion={currentSuggestion}
      isVisible={isVisible}
      resetTranscript={resetTranscript}
      toggleListening={toggleListening}
      browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
    />
  );
}
