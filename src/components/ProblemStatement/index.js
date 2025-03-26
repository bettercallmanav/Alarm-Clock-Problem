import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  text-align: justify;
`;

const HistoricalContext = styled.div`
  background-color: #f8f4e9;
  padding: 1.5rem;
  border-left: 4px solid #8b7d6b;
  margin: 1rem 0;
`;

const ContextTitle = styled.h3`
  color: #6b5b4b;
  margin-bottom: 0.5rem;
`;

const ChallengeList = styled.ul`
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const ChallengeItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ProblemStatement = () => {
  return (
    <Container>
      <Paragraph>
        In the 1940s, individuals with visual impairments faced significant challenges in performing daily tasks that sighted people took for granted. Telling time and setting alarms were particularly difficult, as most timepieces relied exclusively on visual interfaces.
      </Paragraph>

      <HistoricalContext>
        <ContextTitle>Historical Context</ContextTitle>
        <Paragraph>
          The 1940s was a period of significant technological advancement, particularly in mechanical and early electronic systems. World War II had accelerated innovation in many fields, including assistive technologies for wounded veterans. However, most consumer products were not designed with accessibility in mind.
        </Paragraph>
      </HistoricalContext>

      <Paragraph>
        Existing solutions for blind individuals to tell time in the 1940s were limited:
      </Paragraph>

      <ChallengeList>
        <ChallengeItem>
          <strong>Braille watches</strong> - Required tactile reading skills and could only be read by physically touching the watch face, making it difficult to check time discreetly or quickly.
        </ChallengeItem>
        <ChallengeItem>
          <strong>Raised numeral clocks</strong> - Similar to Braille watches, these required physical contact and could be difficult to interpret accurately.
        </ChallengeItem>
        <ChallengeItem>
          <strong>Chiming clocks</strong> - While these announced the hour with chimes, they didn't provide minute precision and weren't portable.
        </ChallengeItem>
      </ChallengeList>

      <Paragraph>
        The alarm function presented an even greater challenge. Most alarm clocks of the era used visual indicators for setting the alarm time, making them inaccessible to blind users. Those that did have tactile indicators were often imprecise and difficult to set accurately.
      </Paragraph>

      <Paragraph>
        What was needed was a solution that could:
      </Paragraph>

      <ChallengeList>
        <ChallengeItem>Announce the precise time on demand</ChallengeItem>
        <ChallengeItem>Allow for accurate and independent setting of both time and alarm</ChallengeItem>
        <ChallengeItem>Be reliable and durable with the technology available in the 1940s</ChallengeItem>
        <ChallengeItem>Be affordable and practical for everyday use</ChallengeItem>
      </ChallengeList>
    </Container>
  );
};

export default ProblemStatement;
