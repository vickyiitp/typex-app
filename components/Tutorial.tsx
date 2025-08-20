

import React from 'react';
import { HandPostureIcon } from './icons/HandPostureIcon';
import Keyboard from './Keyboard';
import { AIBrainIcon, ReplayIcon, ShareIcon } from './icons/ActionIcons';
import { WpmIcon, AccuracyIcon, XPIcon, BrainIcon, RocketIcon } from './icons/GuideIcons';


const GuideSection: React.FC<{ title: string; children: React.ReactNode, id: string }> = ({ title, children, id }) => (
  <div id={id} className="bg-cyber-surface/50 backdrop-blur-md border border-cyber-primary/20 rounded-lg p-6 w-full animate-fadeIn">
    <h3 className="font-orbitron text-2xl text-cyber-primary mb-4">{title}</h3>
    <div className="space-y-4 text-cyber-text-dark leading-relaxed">
      {children}
    </div>
  </div>
);

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20">
        <div className="flex items-center gap-3 mb-2">
            <div className="text-cyber-secondary">{icon}</div>
            <h4 className="font-bold text-cyber-text text-lg">{title}</h4>
        </div>
        <div className="text-sm sm:text-base pl-8 border-l-2 border-cyber-secondary/20 ml-3">{children}</div>
    </div>
);


const Tutorial: React.FC = () => {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">Operator's Manual</h2>
        <p className="text-center text-cyber-text-dark">Welcome to TypeX 2025. This guide will calibrate you for peak performance.</p>
      </div>

      <GuideSection id="mission-hub" title="1. The Mission Hub: Selecting a Challenge">
        <p>This is your main dashboard. From here, you select the test (or "mission") you want to attempt. Missions are divided into two categories:</p>
        <InfoCard title="Standard Practice vs. Pro Challenges" icon={<RocketIcon />}>
            <p className="mb-2">Use the tabs at the top to switch between modes.</p>
            <ul className="list-disc list-inside space-y-1">
                <li><span className="font-bold text-cyber-primary">Standard Practice:</span> Perfect for warming up and improving your core skills. These range from beginner to expert.</li>
                <li><span className="font-bold text-cyber-secondary">Pro Challenges:</span> For seasoned operators. These feature complex text, tongue-twisters, and technical jargon for maximum XP rewards.</li>
            </ul>
        </InfoCard>
         <InfoCard title="Understanding a Mission Card" icon={<BrainIcon />}>
            <p>Each mission card gives you key intel:</p>
            <ul className="list-disc list-inside space-y-1">
                <li><span className="font-bold">Title:</span> The name of the test.</li>
                <li><span className="font-bold">Description:</span> What to expect in the text.</li>
                <li><span className="font-bold">Difficulty:</span> A rating from Beginner to Expert, shown in the top-right corner.</li>
            </ul>
        </InfoCard>
      </GuideSection>

      <GuideSection id="cockpit" title="2. The Cockpit: Your Typing Interface">
        <p>Once you select a mission, you enter the cockpit. This is where the action happens.</p>
         <InfoCard title="The Heads-Up Display (HUD)" icon={<WpmIcon />}>
            <p>At the top of the screen, you'll find three critical stats:</p>
             <ul className="list-disc list-inside space-y-1">
                <li><span className="font-bold text-cyber-secondary">WPM:</span> Words Per Minute. This measures your typing speed in real-time.</li>
                <li><span className="font-bold text-cyber-primary">SECONDS:</span> The time remaining in your test.</li>
                <li><span className="font-bold text-cyber-secondary">ACCURACY:</span> The percentage of characters you've typed correctly.</li>
            </ul>
        </InfoCard>
         <InfoCard title="The Typing Field" icon={<AccuracyIcon />}>
            <p>This is where you type. Pay attention to the colors:</p>
             <ul className="list-disc list-inside space-y-1">
                <li><span className="text-cyber-primary">Green Text:</span> Correctly typed characters.</li>
                <li><span className="text-red-500">Red Background:</span> Incorrectly typed characters.</li>
                <li><span className="text-cyber-text-dark">Gray Text:</span> Untyped characters.</li>
                <li><span className="text-cyber-primary animate-blink">Blinking Caret (|):</span> Your current position.</li>
            </ul>
        </InfoCard>
      </GuideSection>

       <GuideSection id="report" title="3. After-Action Report: The Results Screen">
        <p>After completing a test, you'll receive a full performance breakdown.</p>
        <InfoCard title="Experience Points (XP)" icon={<XPIcon />}>
            <p>Your XP gain is based on your speed, accuracy, and the mission's difficulty. Completing tests contributes to the global average!</p>
        </InfoCard>
        <InfoCard title="AI Debriefing" icon={<AIBrainIcon />}>
            <p>Our onboard AI coach analyzes your performance and provides personalized, actionable tips to help you improve on your next run.</p>
        </InfoCard>
        <div className="grid md:grid-cols-2 gap-4">
            <InfoCard title="New Test" icon={<ReplayIcon />}>
                <p>Click this to return to the Mission Hub and select a new challenge.</p>
            </InfoCard>
            <InfoCard title="Share" icon={<ShareIcon />}>
                <p>Proud of your score? Click this to share your results on social media.</p>
            </InfoCard>
        </div>
      </GuideSection>

      <GuideSection id="fundamentals" title="4. Foundational Skills">
        <p>All elite skills are built on a solid foundation. Master these fundamentals to unlock your true potential.</p>
         <div className="flex flex-col md:flex-row items-center gap-6 bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20">
          <HandPostureIcon className="w-32 h-32 md:w-48 md:h-48 text-cyber-primary flex-shrink-0" />
          <div>
            <h4 className="font-bold text-cyber-text text-lg mb-2">Correct Posture</h4>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                <li>Sit up straight, with your back against the chair.</li>
                <li>Keep your feet flat on the floor.</li>
                <li>Position your monitor at or slightly below eye level.</li>
                <li>Your elbows should be at a 90-degree angle, with wrists straight.</li>
            </ul>
          </div>
        </div>
        <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20">
             <h4 className="font-bold text-cyber-text text-lg mb-2">Home Row Position</h4>
            <p>The "home row" is your base of operations. Your fingers should always start from and return to these keys.</p>
            <p className="font-bold text-cyber-text my-2">Left Hand: <span className="text-cyber-secondary">A, S, D, F</span> | Right Hand: <span className="text-cyber-secondary">J, K, L, ;</span></p>
            <p>Feel for the small bumps on the <span className="text-cyber-primary">'F'</span> and <span className="text-cyber-primary">'J'</span> keys to find your position without looking.</p>
            <div className="pt-4 overflow-x-auto">
              <Keyboard lastKeyPressed={null} />
            </div>
        </div>
      </GuideSection>
    </div>
  );
};

export default Tutorial;
