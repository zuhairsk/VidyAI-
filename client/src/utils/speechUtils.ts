// Web Speech API utilities for text-to-speech and speech recognition

// Check if speech synthesis is available
const isSpeechSynthesisAvailable = () => {
  return 'speechSynthesis' in window;
};

// Check if speech recognition is available
const isSpeechRecognitionAvailable = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// Initialize speech recognition
const getSpeechRecognition = () => {
  // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    return new SpeechRecognition();
  }
  return null;
};

// Text-to-speech function
export const speakText = (text: string, lang: string = 'en-US'): void => {
  if (!isSpeechSynthesisAvailable()) {
    console.error('Speech synthesis is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.0; // Speed of speech
  utterance.pitch = 1.0; // Pitch of voice

  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a good voice for the specified language
  const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && !v.name.includes('Google'));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

// Stop ongoing speech
export const stopSpeaking = (): void => {
  if (isSpeechSynthesisAvailable()) {
    window.speechSynthesis.cancel();
  }
};

// Speech recognition (voice to text)
export const startSpeechRecognition = (
  callback: (transcript: string) => void,
  lang: string = 'en-US',
  continuous: boolean = false,
  interimResults: boolean = true
): void => {
  if (!isSpeechRecognitionAvailable()) {
    console.error('Speech recognition is not supported in this browser.');
    return;
  }

  const recognition = getSpeechRecognition();
  if (!recognition) return;

  recognition.lang = lang;
  recognition.continuous = continuous;
  recognition.interimResults = interimResults;

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const transcript = event.results[last][0].transcript;
    
    // Call the callback with the transcript
    callback(transcript);
    
    // Custom event for global listening
    const customEvent = new CustomEvent('speech-result', { 
      detail: { transcript, confidence: event.results[last][0].confidence }
    });
    window.dispatchEvent(customEvent);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    
    // Dispatch error event
    const customErrorEvent = new CustomEvent('speech-error', { 
      detail: { error: event.error }
    });
    window.dispatchEvent(customErrorEvent);
  };

  recognition.start();
};

// Stop speech recognition
export const stopSpeechRecognition = (): void => {
  const recognition = getSpeechRecognition();
  if (recognition) {
    recognition.stop();
  }
};

// Check if the browser can handle the speech language
export const checkLanguageSupport = (lang: string): boolean => {
  if (!isSpeechSynthesisAvailable()) return false;
  
  const voices = window.speechSynthesis.getVoices();
  return voices.some(voice => voice.lang.startsWith(lang.split('-')[0]));
};

// Map language code to voice language code
export const languageToSpeechCode = (languageCode: string): string => {
  const mapping: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'mr': 'mr-IN'
  };
  
  return mapping[languageCode] || 'en-US';
};

// Listen for speech commands globally
export const setupGlobalSpeechCommandListener = (
  commands: Record<string, () => void>,
  lang: string = 'en-US'
): () => void => {
  const handleSpeechResult = (event: CustomEvent) => {
    const transcript = event.detail.transcript.toLowerCase();
    
    for (const [command, action] of Object.entries(commands)) {
      if (transcript.includes(command.toLowerCase())) {
        action();
        break;
      }
    }
  };
  
  window.addEventListener('speech-result' as any, handleSpeechResult);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('speech-result' as any, handleSpeechResult);
  };
};

// Initialize voice synthesis (for better performance, call this early in app lifecycle)
export const initVoiceSynthesis = (): void => {
  if (isSpeechSynthesisAvailable()) {
    // This forces the browser to load voice data
    speechSynthesis.getVoices();
    
    // Some browsers need this event to properly load voices
    speechSynthesis.addEventListener('voiceschanged', () => {
      speechSynthesis.getVoices();
    });
  }
};
