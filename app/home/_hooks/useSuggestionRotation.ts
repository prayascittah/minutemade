import { useState, useEffect } from "react";
import { getRandomSuggestion } from "../_utils/suggestions";

export const useSuggestionRotation = (
  isListening: boolean,
  isClient: boolean
) => {
  const [currentSuggestion, setCurrentSuggestion] = useState("");
  const [isVisible, setIsVisible] = useState(true);

    // Initialize with random suggestion
  useEffect(() => {
    setCurrentSuggestion(getRandomSuggestion());
  }, []);

  // Rotate suggestions when not listening
  useEffect(() => {
    if (!isListening && isClient) {
      const interval = setInterval(() => {
        // Fade out
        setIsVisible(false);

        // After fade out completes, change text and fade in
        setTimeout(() => {
          setCurrentSuggestion(getRandomSuggestion());
          setIsVisible(true);
        }, 300); // Match the transition duration
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isListening, isClient]);

  return { currentSuggestion, isVisible, setIsVisible };
};
