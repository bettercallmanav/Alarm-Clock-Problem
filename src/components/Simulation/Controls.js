import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  background-color: #e8e0d0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-family: 'Georgia', serif;
  color: #4a3c31;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #b9a89a;
  padding-bottom: 0.5rem;
`;

const TimeControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TimeDisplay = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a3c31;
  background-color: #f5f3e9;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #b9a89a;
  min-width: 100px;
  text-align: center;
`;

const ControlButton = styled.button`
  background-color: #8b7156;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #6b5b4b;
  }
  
  &:disabled {
    background-color: #b9a89a;
    cursor: not-allowed;
  }
`;

const AdjustmentControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AdjustmentRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const AdjustmentLabel = styled.span`
  font-family: 'Georgia', serif;
  color: #4a3c31;
  width: 70px;
`;

const AdjustmentButton = styled.button`
  background-color: #6b5b4b;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4a3c31;
  }
`;

const AlarmSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SwitchLabel = styled.span`
  font-family: 'Georgia', serif;
  color: #4a3c31;
`;

const SwitchTrack = styled.div`
  width: 50px;
  height: 24px;
  background-color: ${props => props.isOn ? '#5cb85c' : '#b9a89a'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const SwitchThumb = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const TactileIndicator = styled.div`
  width: 100%;
  height: 20px;
  background-color: #d3c7b6;
  border-radius: 5px;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    background-color: #4a3c31;
    left: ${props => (props.value / props.max) * 100}%;
    transform: translateX(-50%);
  }
`;

const formatTime = (hours, minutes) => {
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

const Controls = ({
  currentTime,
  setCurrentTime,
  alarmTime,
  setAlarmTime,
  isAlarmSet,
  setIsAlarmSet,
  announceTime,
  isPlaying,
  isAlarmPlaying
}) => {
  // Handlers for adjusting current time
  const incrementHour = () => {
    setCurrentTime(prev => ({
      ...prev,
      hours: (prev.hours + 1) % 12 || 12
    }));
  };
  
  const decrementHour = () => {
    setCurrentTime(prev => ({
      ...prev,
      hours: (prev.hours - 1 + 12) % 12 || 12
    }));
  };
  
  const incrementMinute = () => {
    const newMinutes = (currentTime.minutes + 1) % 60;
    const newHours = newMinutes === 0 ? (currentTime.hours + 1) % 12 || 12 : currentTime.hours;
    
    setCurrentTime({
      hours: newHours,
      minutes: newMinutes
    });
  };
  
  const decrementMinute = () => {
    const newMinutes = (currentTime.minutes - 1 + 60) % 60;
    const newHours = newMinutes === 59 ? (currentTime.hours - 1 + 12) % 12 || 12 : currentTime.hours;
    
    setCurrentTime({
      hours: newHours,
      minutes: newMinutes
    });
  };
  
  // Handlers for adjusting alarm time
  const incrementAlarmHour = () => {
    setAlarmTime(prev => ({
      ...prev,
      hours: (prev.hours + 1) % 12 || 12
    }));
  };
  
  const decrementAlarmHour = () => {
    setAlarmTime(prev => ({
      ...prev,
      hours: (prev.hours - 1 + 12) % 12 || 12
    }));
  };
  
  const incrementAlarmMinute = () => {
    const newMinutes = (alarmTime.minutes + 1) % 60;
    const newHours = newMinutes === 0 ? (alarmTime.hours + 1) % 12 || 12 : alarmTime.hours;
    
    setAlarmTime({
      hours: newHours,
      minutes: newMinutes
    });
  };
  
  const decrementAlarmMinute = () => {
    const newMinutes = (alarmTime.minutes - 1 + 60) % 60;
    const newHours = newMinutes === 59 ? (alarmTime.hours - 1 + 12) % 12 || 12 : alarmTime.hours;
    
    setAlarmTime({
      hours: newHours,
      minutes: newMinutes
    });
  };
  
  // Toggle alarm
  const toggleAlarm = () => {
    setIsAlarmSet(!isAlarmSet);
  };

  return (
    <ControlsContainer>
      <ControlSection>
        <SectionTitle>Time Announcement</SectionTitle>
        <ControlButton 
          onClick={announceTime} 
          disabled={isPlaying || isAlarmPlaying}
        >
          Announce Time
        </ControlButton>
      </ControlSection>
      
      <ControlSection>
        <SectionTitle>Current Time</SectionTitle>
        <TimeControls>
          <TimeDisplay>
            {formatTime(currentTime.hours, currentTime.minutes)}
          </TimeDisplay>
        </TimeControls>
        
        <AdjustmentControls>
          <AdjustmentRow>
            <AdjustmentLabel>Hours:</AdjustmentLabel>
            <AdjustmentButton onClick={decrementHour}>-</AdjustmentButton>
            <AdjustmentButton onClick={incrementHour}>+</AdjustmentButton>
          </AdjustmentRow>
          
          <AdjustmentRow>
            <AdjustmentLabel>Minutes:</AdjustmentLabel>
            <AdjustmentButton onClick={decrementMinute}>-</AdjustmentButton>
            <AdjustmentButton onClick={incrementMinute}>+</AdjustmentButton>
          </AdjustmentRow>
          
          <TactileIndicator value={currentTime.hours} max={12} />
          <TactileIndicator value={currentTime.minutes} max={60} />
        </AdjustmentControls>
      </ControlSection>
      
      <ControlSection>
        <SectionTitle>Alarm Settings</SectionTitle>
        <TimeControls>
          <TimeDisplay>
            {formatTime(alarmTime.hours, alarmTime.minutes)}
          </TimeDisplay>
          
          <AlarmSwitch onClick={toggleAlarm}>
            <SwitchTrack isOn={isAlarmSet}>
              <SwitchThumb 
                animate={{ x: isAlarmSet ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </SwitchTrack>
            <SwitchLabel>{isAlarmSet ? "Alarm On" : "Alarm Off"}</SwitchLabel>
          </AlarmSwitch>
        </TimeControls>
        
        <AdjustmentControls>
          <AdjustmentRow>
            <AdjustmentLabel>Hours:</AdjustmentLabel>
            <AdjustmentButton onClick={decrementAlarmHour}>-</AdjustmentButton>
            <AdjustmentButton onClick={incrementAlarmHour}>+</AdjustmentButton>
          </AdjustmentRow>
          
          <AdjustmentRow>
            <AdjustmentLabel>Minutes:</AdjustmentLabel>
            <AdjustmentButton onClick={decrementAlarmMinute}>-</AdjustmentButton>
            <AdjustmentButton onClick={incrementAlarmMinute}>+</AdjustmentButton>
          </AdjustmentRow>
          
          <TactileIndicator value={alarmTime.hours} max={12} />
          <TactileIndicator value={alarmTime.minutes} max={60} />
        </AdjustmentControls>
      </ControlSection>
    </ControlsContainer>
  );
};

export default Controls;
