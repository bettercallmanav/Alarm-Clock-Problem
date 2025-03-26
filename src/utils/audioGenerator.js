/**
 * Audio Generator Utility
 * 
 * This utility provides functions to generate audio for the talking clock simulation.
 * It uses the Web Audio API to create tones and speech-like sounds.
 */

// Create audio context (will be initialized on first use to avoid autoplay policy issues)
let audioContext = null;

// Initialize audio context (called on first user interaction)
const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Generate a simple tone
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {number} volume - Volume from 0 to 1
 * @returns {Object} - Object with play and stop methods
 */
const generateTone = (frequency, duration, volume = 0.5) => {
  let oscillator = null;
  let gainNode = null;
  
  const play = () => {
    const ctx = initAudioContext();
    
    // Create oscillator and gain node
    oscillator = ctx.createOscillator();
    gainNode = ctx.createGain();
    
    // Configure oscillator
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Configure gain (volume)
    gainNode.gain.value = volume;
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Start oscillator
    oscillator.start();
    
    // Stop after duration
    if (duration) {
      setTimeout(() => {
        stop();
      }, duration * 1000);
    }
  };
  
  const stop = () => {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }
    
    if (gainNode) {
      gainNode.disconnect();
      gainNode = null;
    }
  };
  
  return { play, stop };
};

/**
 * Generate a sequence of tones to simulate speech
 * @param {string} text - Text to be "spoken"
 * @returns {Object} - Object with play and stop methods
 */
const generateSpeech = (text) => {
  // We'll use a simple algorithm to convert text to a sequence of tones
  // This is not real speech synthesis, just a simulation
  
  let tones = [];
  let currentTone = null;
  
  const play = () => {
    const ctx = initAudioContext();
    
    // Generate a sequence of tones based on the text
    // Each character will influence the frequency and duration
    const baseFrequency = 220; // A3
    
    let timeOffset = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const charCode = text.charCodeAt(i);
      
      // Skip spaces with a pause
      if (char === ' ') {
        timeOffset += 0.15;
        continue;
      }
      
      // Calculate a frequency based on the character
      // This creates a speech-like pattern but is not actual speech
      const frequency = baseFrequency + (charCode % 20) * 10;
      
      // Duration varies slightly for each character
      const duration = 0.08 + (charCode % 5) * 0.01;
      
      // Schedule this tone
      setTimeout(() => {
        const tone = generateTone(frequency, duration, 0.3);
        tones.push(tone);
        tone.play();
      }, timeOffset * 1000);
      
      timeOffset += duration + 0.02;
    }
    
    // Return the text for visual display
    return text;
  };
  
  const stop = () => {
    // Stop all tones
    tones.forEach(tone => tone.stop());
    tones = [];
  };
  
  return { play, stop };
};

/**
 * Generate an alarm sound
 * @returns {Object} - Object with play and stop methods
 */
const generateAlarm = () => {
  let intervalId = null;
  let tones = [];
  
  const play = () => {
    const ctx = initAudioContext();
    
    // Create an alternating pattern for the alarm
    const highFreq = 880; // A5
    const lowFreq = 440;  // A4
    
    intervalId = setInterval(() => {
      // Stop previous tone
      if (tones.length > 0) {
        tones[tones.length - 1].stop();
      }
      
      // Alternate between high and low frequency
      const useHighFreq = tones.length % 2 === 0;
      const tone = generateTone(useHighFreq ? highFreq : lowFreq, 0.3, 0.5);
      tones.push(tone);
      tone.play();
    }, 350);
    
    // Return text for visual display
    return "ALARM! ALARM! ALARM!";
  };
  
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    
    // Stop all tones
    tones.forEach(tone => tone.stop());
    tones = [];
  };
  
  return { play, stop };
};

export { generateTone, generateSpeech, generateAlarm };
