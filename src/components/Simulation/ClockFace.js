import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ClockFaceContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f5f3e9;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const HourMarker = styled.div`
  position: absolute;
  width: 2px;
  height: ${props => props.isHour ? '15px' : '8px'};
  background-color: #4a3c31;
  transform-origin: bottom center;
  transform: rotate(${props => props.rotation}deg) translateY(-45%);
  top: 50%;
  left: calc(50% - 1px);
`;

const HourNumber = styled.div`
  position: absolute;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: #4a3c31;
  transform: rotate(${props => props.rotation}deg) translateY(-150px) rotate(${props => -props.rotation}deg);
  top: 50%;
  left: 50%;
`;

const ClockHand = styled(motion.div)`
  position: absolute;
  background-color: #4a3c31;
  transform-origin: bottom center;
  top: 50%;
  left: 50%;
  border-radius: 5px 5px 0 0;
`;

const HourHand = styled(ClockHand)`
  width: 6px;
  height: 60px;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
  z-index: 2;
`;

const MinuteHand = styled(ClockHand)`
  width: 4px;
  height: 90px;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
  z-index: 3;
`;

const CenterPin = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4a3c31;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;

const AlarmIndicator = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#d9534f' : '#6c757d'};
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const BrailleMarkers = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const BrailleMarker = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #4a3c31;
  transform: rotate(${props => props.rotation}deg) translateY(-170px);
  top: 50%;
  left: calc(50% - 4px);
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #4a3c31;
  }
  
  &::before {
    top: ${props => props.dots >= 1 ? '0' : '-10px'};
    left: 0;
  }
  
  &::after {
    top: ${props => props.dots >= 2 ? '0' : '-10px'};
    right: 0;
  }
`;

const ClockFace = ({ currentTime, alarmTime, isAlarmSet }) => {
  // Calculate rotation angles for clock hands
  const hourRotation = ((currentTime.hours % 12) * 30) + (currentTime.minutes * 0.5);
  const minuteRotation = currentTime.minutes * 6;
  
  // Create hour markers and numbers
  const hourMarkers = [];
  const hourNumbers = [];
  const brailleMarkers = [];
  
  for (let i = 0; i < 60; i++) {
    const rotation = i * 6;
    const isHour = i % 5 === 0;
    
    hourMarkers.push(
      <HourMarker 
        key={`marker-${i}`} 
        rotation={rotation} 
        isHour={isHour} 
      />
    );
    
    if (isHour) {
      const hourNum = i / 5 === 0 ? 12 : i / 5;
      hourNumbers.push(
        <HourNumber key={`hour-${hourNum}`} rotation={rotation}>
          {hourNum}
        </HourNumber>
      );
      
      // Add Braille markers for hours (simplified representation)
      brailleMarkers.push(
        <BrailleMarker 
          key={`braille-${hourNum}`} 
          rotation={rotation} 
          dots={hourNum <= 2 ? hourNum : 2} // Simplified for visualization
        />
      );
    }
  }

  return (
    <ClockFaceContainer>
      {hourMarkers}
      {hourNumbers}
      
      <BrailleMarkers>
        {brailleMarkers}
      </BrailleMarkers>
      
      <HourHand 
        rotation={hourRotation}
        animate={{ rotate: hourRotation }}
        transition={{ type: "tween", duration: 0.5 }}
      />
      
      <MinuteHand 
        rotation={minuteRotation}
        animate={{ rotate: minuteRotation }}
        transition={{ type: "tween", duration: 0.5 }}
      />
      
      <CenterPin />
      
      <AlarmIndicator isActive={isAlarmSet} />
    </ClockFaceContainer>
  );
};

export default ClockFace;
