import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ClockFace from './ClockFace';
import Controls from './Controls';
import { generateSpeech, generateAlarm } from '../../utils/audioGenerator';

const SimulationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ClockContainer = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const ClockCasing = styled.div`
  background-color: #8b7156;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhonographArm = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 10px;
  background-color: #5a4a3a;
  transform-origin: 0 50%;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #333;
  }
`;

const Record = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #222;
  transform: translate(-50%, -50%);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #555;
    transform: translate(-50%, -50%);
  }
`;

const InstructionsPanel = styled.div`
  background-color: #f8f4e9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  border: 1px solid #d3c7b6;
`;

const InstructionsTitle = styled.h4`
  color: #4a3c31;
  margin-bottom: 1rem;
`;

const InstructionsList = styled.ol`
  margin-left: 1.5rem;
`;

const InstructionItem = styled.li`
  margin-bottom: 0.5rem;
`;

// Create audio objects for time announcements
const createTimeAnnouncement = (text) => {
  return {
    play: () => {
      console.log(`Playing audio: ${text}`);
      // Generate speech-like audio
      return generateSpeech(text).play();
    },
    stop: () => {
      console.log('Stopping audio');
      // Nothing to stop as the generateSpeech function handles its own cleanup
    }
  };
};

const ClockSimulation = () => {
  const [currentTime, setCurrentTime] = useState({ hours: 10, minutes: 30 });
  const [alarmTime, setAlarmTime] = useState({ hours: 7, minutes: 0 });
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");
  const recordRef = useRef(null);
  const armRef = useRef(null);

  // Time announcement audio objects
  const timeAnnouncements = {
    // Generate speech for each time announcement
    "10:00": createTimeAnnouncement("The time is 10 o'clock"),
    "10:15": createTimeAnnouncement("The time is quarter past 10"),
    "10:30": createTimeAnnouncement("The time is half past 10"),
    "10:45": createTimeAnnouncement("The time is quarter to 11"),
    "11:00": createTimeAnnouncement("The time is 11 o'clock"),
    "11:15": createTimeAnnouncement("The time is quarter past 11"),
    "11:30": createTimeAnnouncement("The time is half past 11"),
    "11:45": createTimeAnnouncement("The time is quarter to 12"),
    "12:00": createTimeAnnouncement("The time is 12 o'clock"),
    "1:00": createTimeAnnouncement("The time is 1 o'clock"),
    "1:15": createTimeAnnouncement("The time is quarter past 1"),
    "1:30": createTimeAnnouncement("The time is half past 1"),
    "1:45": createTimeAnnouncement("The time is quarter to 2"),
    "2:00": createTimeAnnouncement("The time is 2 o'clock"),
    "2:15": createTimeAnnouncement("The time is quarter past 2"),
    "2:30": createTimeAnnouncement("The time is half past 2"),
    "2:45": createTimeAnnouncement("The time is quarter to 3"),
    "3:00": createTimeAnnouncement("The time is 3 o'clock"),
    "3:15": createTimeAnnouncement("The time is quarter past 3"),
    "3:30": createTimeAnnouncement("The time is half past 3"),
    "3:45": createTimeAnnouncement("The time is quarter to 4"),
    "4:00": createTimeAnnouncement("The time is 4 o'clock"),
    "4:15": createTimeAnnouncement("The time is quarter past 4"),
    "4:30": createTimeAnnouncement("The time is half past 4"),
    "4:45": createTimeAnnouncement("The time is quarter to 5"),
    "5:00": createTimeAnnouncement("The time is 5 o'clock"),
    "5:15": createTimeAnnouncement("The time is quarter past 5"),
    "5:30": createTimeAnnouncement("The time is half past 5"),
    "5:45": createTimeAnnouncement("The time is quarter to 6"),
    "6:00": createTimeAnnouncement("The time is 6 o'clock"),
    "6:15": createTimeAnnouncement("The time is quarter past 6"),
    "6:30": createTimeAnnouncement("The time is half past 6"),
    "6:45": createTimeAnnouncement("The time is quarter to 7"),
    "7:00": createTimeAnnouncement("The time is 7 o'clock"),
    "7:15": createTimeAnnouncement("The time is quarter past 7"),
    "7:30": createTimeAnnouncement("The time is half past 7"),
    "7:45": createTimeAnnouncement("The time is quarter to 8"),
    "8:00": createTimeAnnouncement("The time is 8 o'clock"),
    "8:15": createTimeAnnouncement("The time is quarter past 8"),
    "8:30": createTimeAnnouncement("The time is half past 8"),
    "8:45": createTimeAnnouncement("The time is quarter to 9"),
    "9:00": createTimeAnnouncement("The time is 9 o'clock"),
    "9:15": createTimeAnnouncement("The time is quarter past 9"),
    "9:30": createTimeAnnouncement("The time is half past 9"),
    "9:45": createTimeAnnouncement("The time is quarter to 10"),
  };

  // Create alarm sound using the audio generator
  const alarmSound = {
    play: () => {
      console.log('Playing alarm sound');
      return generateAlarm().play();
    },
    stop: () => {
      console.log('Stopping alarm sound');
      // The generateAlarm function handles its own cleanup
    }
  };

  // Function to announce the current time
  const announceTime = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Animate the phonograph arm and record
    if (recordRef.current && armRef.current) {
      // Animation would go here
    }
    
    // Get the closest time announcement
    const hour = currentTime.hours;
    let minute = currentTime.minutes;
    // Round to nearest 15 minutes for our simulation
    minute = Math.round(minute / 15) * 15;
    if (minute === 60) minute = 0;
    
    const timeKey = `${hour}:${minute === 0 ? '00' : minute}`;
    const announcement = timeAnnouncements[timeKey] || timeAnnouncements["10:00"]; // Fallback
    
    // Play the announcement and get the text for visual display
    const message = announcement.play();
    setAudioMessage(message);
    
    // Stop after a few seconds
    setTimeout(() => {
      setIsPlaying(false);
      setAudioMessage("");
      announcement.stop();
    }, 3000);
  };

  // Function to trigger the alarm
  const triggerAlarm = () => {
    if (isAlarmPlaying) return;
    
    setIsAlarmPlaying(true);
    const message = alarmSound.play();
    setAudioMessage(message);
    
    // Stop after a few seconds
    setTimeout(() => {
      setIsAlarmPlaying(false);
      setAudioMessage("");
      alarmSound.stop();
    }, 5000);
  };

  // Update the clock time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        hours: now.getHours() > 12 ? now.getHours() - 12 : now.getHours(),
        minutes: now.getMinutes()
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Check if alarm should trigger
  useEffect(() => {
    if (isAlarmSet && 
        currentTime.hours === alarmTime.hours && 
        currentTime.minutes === alarmTime.minutes) {
      triggerAlarm();
    }
  }, [currentTime, alarmTime, isAlarmSet]);

  return (
    <div>
      <SimulationContainer>
        <ClockContainer>
          <ClockCasing>
            <ClockFace 
              currentTime={currentTime} 
              alarmTime={alarmTime}
              isAlarmSet={isAlarmSet}
            />
            <Record 
              ref={recordRef} 
              animate={isPlaying || isAlarmPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying || isAlarmPlaying ? { duration: 3, ease: "linear", repeat: Infinity } : {}}
            />
            <PhonographArm 
              ref={armRef}
              initial={{ rotate: -30 }}
              animate={isPlaying || isAlarmPlaying ? { rotate: 30 } : { rotate: -30 }}
              transition={isPlaying || isAlarmPlaying ? { duration: 0.5 } : { duration: 0.5, delay: 2.5 }}
            />
            {audioMessage && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                zIndex: 20,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: '1rem'
              }}>
                {audioMessage}
              </div>
            )}
          </ClockCasing>
        </ClockContainer>
        
        <Controls 
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          alarmTime={alarmTime}
          setAlarmTime={setAlarmTime}
          isAlarmSet={isAlarmSet}
          setIsAlarmSet={setIsAlarmSet}
          announceTime={announceTime}
          isPlaying={isPlaying}
          isAlarmPlaying={isAlarmPlaying}
        />
      </SimulationContainer>
      
      <InstructionsPanel>
        <InstructionsTitle>How to Use the Simulation</InstructionsTitle>
        <InstructionsList>
          <InstructionItem>Click the "Announce Time" button to hear the time announcement</InstructionItem>
          <InstructionItem>Use the time setting controls to adjust the current time</InstructionItem>
          <InstructionItem>Set the alarm time using the alarm controls</InstructionItem>
          <InstructionItem>Toggle the alarm on/off with the switch</InstructionItem>
          <InstructionItem>When the alarm time matches the current time, the alarm will sound</InstructionItem>
        </InstructionsList>
        
        <div style={{ marginTop: '1.5rem', backgroundColor: '#f8f4e9', padding: '1rem', borderLeft: '4px solid #8b7d6b' }}>
          <h4 style={{ color: '#4a3c31', marginBottom: '0.5rem' }}>Historical Audio Context</h4>
          <p style={{ marginBottom: '0.5rem' }}>
            The sounds in this simulation represent how a blind-accessible alarm clock would have functioned in the 1940s:
          </p>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Time Announcements:</strong> In a real 1940s device, these would have been actual human voice recordings on a small shellac record inside the clock. Each time position would have its own groove segment on the record.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Alarm Sounds:</strong> The alternating beeping pattern simulates what would have been a separate track on the phonograph record with a distinct sound pattern, typically a repeating bell or buzzer sound.
            </li>
            <li>
              <strong>Mechanical Production:</strong> All sounds would have been produced entirely through mechanical means, with no electricity required for basic models.
            </li>
          </ul>
          <p style={{ marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
            Note: This simulation uses the Web Audio API to generate tones that simulate the characteristic mechanical quality that phonograph playback would have had in the 1940s.
          </p>
        </div>
      </InstructionsPanel>
    </div>
  );
};

export default ClockSimulation;
