import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import ProblemStatement from '../components/ProblemStatement';
import ClockSimulation from '../components/Simulation/ClockSimulation';
import SolutionDetails from '../components/Solution';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #8b7d6b;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4a3c31;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b5b4b;
  font-style: italic;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  border-bottom: 1px solid #d3c7b6;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  color: #6b5b4b;
  font-size: 0.9rem;
  border-top: 1px solid #d3c7b6;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>1940s Blind-Accessible Alarm Clock</title>
      </Head>
      
      <Main>
      <Header>
        <Title>Audio-Centric Talking Clock</Title>
        <Subtitle>A 1940s Blind-Accessible Alarm Clock Design</Subtitle>
        <Subtitle style={{ marginTop: '0.5rem', fontSize: '1rem' }}>Made by Manav Bhatia and Submitted to Muskan Handa</Subtitle>
      </Header>

        <Section>
          <SectionTitle>The Problem</SectionTitle>
          <ProblemStatement />
        </Section>

        <Section>
          <SectionTitle>Interactive Simulation</SectionTitle>
          <ClockSimulation />
        </Section>

        <Section>
          <SectionTitle>Technical Solution</SectionTitle>
          <SolutionDetails />
        </Section>

        <Footer>
          <p>© 2025 - Historical Assistive Technology Project</p>
        </Footer>
      </Main>
    </>
  );
}
