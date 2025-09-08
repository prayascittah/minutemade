import { Mic, MicOff, X } from "lucide-react";
import { typography } from "../../styles/typography";
import Image from "next/image";

interface HomeContentProps {
  transcript: string;
  isListening: boolean;
  currentSuggestion: string;
  isVisible: boolean;
  resetTranscript: () => void;
  toggleListening: () => void;
  browserSupportsSpeechRecognition: boolean;
}

export default function HomeContent({
  transcript,
  isListening,
  currentSuggestion,
  isVisible,
  resetTranscript,
  toggleListening,
  browserSupportsSpeechRecognition,
}: HomeContentProps) {
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
          <div className="flex flex-col gap-4 items-center justify-center pt-16 min-h-[calc(100vh-12rem)]">
            <Image
              src="/assets/uh-oh.png"
              alt="Browser not supported"
              width={200}
              height={200}
              className="rounded-2xl shadow-lg"
            />
            <span className="text-black text-lg" style={typography.tagline}>
              Browser doesn&apos;t support speech recognition.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
        <div className="flex flex-col relative p-8 pt-24">
          {/* Text Display Area */}
          <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto min-h-[calc(100vh-12rem)]">
            <div className="text-center px-6">
              {transcript ? (
                <p
                  className="text-black text-2xl md:text-4xl leading-relaxed tracking-wide"
                  style={typography.tagline}
                >
                  {transcript}
                </p>
              ) : (
                <p
                  className={`text-gray-400 text-xl md:text-2xl transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={typography.status}
                >
                  {isListening ? "Listening..." : `"${currentSuggestion}"`}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
            {/* Clear button */}
            {transcript && (
              <button
                onClick={resetTranscript}
                className="group flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-full transition-all duration-200 text-sm hover:cursor-pointer"
                style={typography.button}
              >
                <X size={16} className="transition-transform duration-200" />
                Clear
              </button>
            )}

            {/* Microphone Button */}
            <button
              onClick={toggleListening}
              className={`
                w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl
                transition-all duration-300 ease-in-out
                ${
                  isListening
                    ? "bg-black scale-110 hover:cursor-pointer"
                    : "bg-white border-2 border-black hover:bg-gray-50"
                }
              `}
              style={{
                borderRadius: isListening ? "50%" : "0",
                transition:
                  "all 0.3s ease-in-out, border-radius 0.3s ease-in-out",
              }}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <MicOff size={28} className="text-white" />
              ) : (
                <Mic size={28} className="text-black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
