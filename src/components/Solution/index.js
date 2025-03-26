import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  text-align: justify;
`;

const TechnicalSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #4a3c31;
  margin-bottom: 1rem;
  border-bottom: 1px solid #d3c7b6;
  padding-bottom: 0.5rem;
`;

const FeatureList = styled.ul`
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
`;

const DiagramContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const DiagramCaption = styled.p`
  font-style: italic;
  color: #6b5b4b;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const MaterialsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
`;

const TableHeader = styled.th`
  background-color: #e8e0d0;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #d3c7b6;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #d3c7b6;
`;

const SolutionDetails = () => {
  return (
    <Container>
      <Paragraph>
        Our solution is an Audio-Centric Talking Clock that leverages phonograph technology—well-established by the 1940s—to provide blind users with an accessible way to tell time and set alarms.
      </Paragraph>

      <TechnicalSection>
        <SectionTitle>Core Mechanism</SectionTitle>
        <Paragraph>
          The heart of our design is a phonograph-based time announcement system. When the user presses a button, the clock plays a pre-recorded message from a small record inside the device. The recording announces the current hour and approximate minutes (in 15-minute increments).
        </Paragraph>
        
        <Paragraph>
          The clock uses a system of mechanical linkages to position the phonograph needle at different starting points on the record based on the current time. This is achieved through a series of gears and cams connected to the clock movement.
        </Paragraph>

        <DiagramContainer>
          <div style={{ width: '100%', height: '300px', backgroundColor: '#e8e0d0', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <svg width="90%" height="90%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
              {/* Clock Movement */}
              <g transform="translate(150, 200)">
                <circle cx="0" cy="0" r="80" fill="#d3c7b6" stroke="#8b7156" strokeWidth="3" />
                <circle cx="0" cy="0" r="70" fill="none" stroke="#8b7156" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="0" cy="0" r="10" fill="#4a3c31" />
                
                {/* Clock Gears */}
                <g>
                  <circle cx="0" cy="0" r="50" fill="none" stroke="#4a3c31" strokeWidth="2" />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line 
                      key={i}
                      x1="0" 
                      y1="0" 
                      x2={50 * Math.cos(i * Math.PI / 6)} 
                      y2={50 * Math.sin(i * Math.PI / 6)} 
                      stroke="#4a3c31" 
                      strokeWidth="2" 
                    />
                  ))}
                </g>
                
                {/* Hour Hand */}
                <line x1="0" y1="0" x2="30" y2="-40" stroke="#4a3c31" strokeWidth="4" strokeLinecap="round" />
                
                {/* Minute Hand */}
                <line x1="0" y1="0" x2="50" y2="10" stroke="#4a3c31" strokeWidth="3" strokeLinecap="round" />
                
                {/* Text Label */}
                <text x="-70" y="-100" fill="#4a3c31" fontFamily="Georgia" fontSize="16">Clock Movement</text>
              </g>
              
              {/* Mechanical Linkage */}
              <g>
                {/* Main Connecting Rod */}
                <path d="M230,200 C350,150 450,250 570,200" fill="none" stroke="#5a4a3a" strokeWidth="6" />
                
                {/* Gears and Cams */}
                <circle cx="350" cy="150" r="20" fill="#8b7156" stroke="#4a3c31" strokeWidth="2" />
                <circle cx="350" cy="150" r="15" fill="none" stroke="#4a3c31" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="350" cy="150" r="5" fill="#4a3c31" />
                
                <circle cx="450" cy="250" r="25" fill="#8b7156" stroke="#4a3c31" strokeWidth="2" />
                <circle cx="450" cy="250" r="18" fill="none" stroke="#4a3c31" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="450" cy="250" r="6" fill="#4a3c31" />
                
                {/* Cam Mechanism */}
                <path d="M450,250 C480,230 500,270 530,250" fill="none" stroke="#5a4a3a" strokeWidth="4" />
                
                {/* Text Labels */}
                <text x="330" y="120" fill="#4a3c31" fontFamily="Georgia" fontSize="14">Gear</text>
                <text x="440" y="290" fill="#4a3c31" fontFamily="Georgia" fontSize="14">Cam</text>
                <text x="400" y="180" fill="#4a3c31" fontFamily="Georgia" fontSize="16">Mechanical Linkage</text>
              </g>
              
              {/* Phonograph */}
              <g transform="translate(650, 200)">
                <rect x="-80" y="-80" width="160" height="160" rx="10" fill="#d3c7b6" stroke="#8b7156" strokeWidth="3" />
                
                {/* Record */}
                <circle cx="0" cy="0" r="60" fill="#333" stroke="#222" strokeWidth="2" />
                <circle cx="0" cy="0" r="20" fill="#555" stroke="#444" strokeWidth="1" />
                <circle cx="0" cy="0" r="5" fill="#222" />
                
                {/* Grooves */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <circle 
                    key={i}
                    cx="0" 
                    cy="0" 
                    r={25 + i * 5} 
                    fill="none" 
                    stroke="#222" 
                    strokeWidth="1" 
                    opacity="0.5" 
                  />
                ))}
                
                {/* Needle Arm */}
                <line x1="-40" y1="-60" x2="20" y2="10" stroke="#5a4a3a" strokeWidth="3" strokeLinecap="round" />
                <circle cx="20" cy="10" r="3" fill="#222" />
                
                {/* Text Label */}
                <text x="-50" y="-90" fill="#4a3c31" fontFamily="Georgia" fontSize="16">Phonograph</text>
              </g>
              
              {/* Arrows showing movement */}
              <g>
                <path d="M230,160 C250,140 270,140 290,160" fill="none" stroke="#4a3c31" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M570,160 C590,140 610,140 630,160" fill="none" stroke="#4a3c31" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </g>
              
              {/* Arrow Marker Definition */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4a3c31" />
                </marker>
              </defs>
            </svg>
          </div>
          <DiagramCaption>Figure 1: Mechanical linkage system connecting clock movement to phonograph needle positioning</DiagramCaption>
        </DiagramContainer>
      </TechnicalSection>

      <TechnicalSection>
        <SectionTitle>Alarm Function</SectionTitle>
        <Paragraph>
          The alarm function uses a separate track on the phonograph record. When the alarm time is reached, the mechanism automatically engages the phonograph to play the alarm sound. The alarm can be set using tactile indicators and a system of notched dials that provide feedback through touch.
        </Paragraph>
      </TechnicalSection>

      <TechnicalSection>
        <SectionTitle>Audio System</SectionTitle>
        <Paragraph>
          The audio system is the heart of this blind-accessible design, using phonograph technology that was well-established by the 1940s. Here's how the audio would have functioned in its historical context:
        </Paragraph>
        
        <FeatureList>
          <FeatureItem>
            <strong>Time Announcements</strong> - Pre-recorded human voice announcements on a small shellac record inside the clock. Each time position (hour + 15-minute increment) would have its own groove segment on the record. When the user pressed the time button, a mechanical system would position the needle at the correct spot to play the appropriate announcement (e.g., "The time is ten o'clock").
          </FeatureItem>
          
          <FeatureItem>
            <strong>Phonograph Mechanism</strong> - A miniaturized version of standard phonograph technology, with a small turntable, needle, and acoustic amplification system. The record would rotate using energy from a spring mechanism, which would be wound either manually or automatically by the clock's main spring.
          </FeatureItem>
          
          <FeatureItem>
            <strong>Alarm Sounds</strong> - A separate track on the phonograph record with a distinct sound pattern, typically a repeating bell or buzzer sound that would be recognizable as an alarm. In higher-end models, possibly a voice announcement such as "Wake up, it's seven o'clock."
          </FeatureItem>
          
          <FeatureItem>
            <strong>Mechanical Production</strong> - All sounds would be produced entirely through mechanical means. The clock movement would trigger the phonograph mechanism at the set alarm time, and a spring-loaded mechanism would provide the energy to spin the record. The vibrations from the record groove would be amplified through an acoustic horn or chamber.
          </FeatureItem>
          
          <FeatureItem>
            <strong>No Electricity Required</strong> - Basic models would operate without electricity, making them reliable even during power outages. This was particularly important in the 1940s when electrical service was less reliable in many areas.
          </FeatureItem>
        </FeatureList>
        
        <Paragraph>
          The characteristic audio quality of these announcements would have had the slightly mechanical timbre typical of phonograph recordings of the era, with some natural warble and pitch variations. This distinctive sound would have been immediately recognizable to users of the time.
        </Paragraph>
      </TechnicalSection>

      <TechnicalSection>
        <SectionTitle>Materials and Components</SectionTitle>
        <MaterialsTable>
          <thead>
            <tr>
              <TableHeader>Component</TableHeader>
              <TableHeader>Material</TableHeader>
              <TableHeader>Purpose</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Case</TableCell>
              <TableCell>Bakelite or wood</TableCell>
              <TableCell>Housing for all components, period-appropriate materials</TableCell>
            </tr>
            <tr>
              <TableCell>Clock Movement</TableCell>
              <TableCell>Brass and steel</TableCell>
              <TableCell>Accurate timekeeping mechanism</TableCell>
            </tr>
            <tr>
              <TableCell>Phonograph</TableCell>
              <TableCell>Steel, brass, rubber</TableCell>
              <TableCell>Audio playback system</TableCell>
            </tr>
            <tr>
              <TableCell>Record</TableCell>
              <TableCell>Shellac</TableCell>
              <TableCell>Storage medium for time announcements</TableCell>
            </tr>
            <tr>
              <TableCell>Control Knobs</TableCell>
              <TableCell>Bakelite with tactile indicators</TableCell>
              <TableCell>User interface for setting time and alarm</TableCell>
            </tr>
          </tbody>
        </MaterialsTable>
      </TechnicalSection>

      <TechnicalSection>
        <SectionTitle>Advantages</SectionTitle>
        <FeatureList>
          <FeatureItem>
            <strong>Precise Time Information</strong> - Provides exact time through audio without requiring tactile interpretation
          </FeatureItem>
          <FeatureItem>
            <strong>Independent Use</strong> - Allows blind users to check time and set alarms without assistance
          </FeatureItem>
          <FeatureItem>
            <strong>Reliability</strong> - Uses proven mechanical technology of the 1940s era
          </FeatureItem>
          <FeatureItem>
            <strong>Durability</strong> - Mechanical components designed for long-term use with minimal maintenance
          </FeatureItem>
        </FeatureList>
      </TechnicalSection>

      <TechnicalSection>
        <SectionTitle>Manufacturing Considerations</SectionTitle>
        <Paragraph>
          While more complex than standard clocks of the era, the talking clock could be manufactured using existing production techniques from the 1940s. The most challenging aspect would be the precision required for the mechanical linkage between the clock movement and the phonograph positioning system.
        </Paragraph>
        <Paragraph>
          The records would need to be custom-produced with time announcements, but the phonograph technology itself was well-established and could be miniaturized for this application using techniques already available in the 1940s.
        </Paragraph>
      </TechnicalSection>
    </Container>
  );
};

export default SolutionDetails;
