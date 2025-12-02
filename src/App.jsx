import React, { useState } from 'react';
import Layout from './components/Layout';
import StartScreen from './components/StartScreen';
import FinalView from './components/FinalView';
import GameDashboard from './components/GameDashboard';
import LeaderboardView from './components/LeaderboardView';
import TutorialModal from './components/TutorialModal';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    gameState,
    apiKey,
    updateApiKey,
    setPlayerName,
    startGame,
    submitAction,
    submitFinalAnswer,
    resetGame
  } = useGameState();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Show tutorial on first visit
  React.useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('rogue_detective_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('rogue_detective_tutorial_seen', 'true');
    }
  }, []);

  // The `renderContent` function is no longer used in the new structure,
  // but keeping it commented out for context if needed.
  /*
  const renderContent = () => {
    if (gameState.phase === 'init') {
      return (
        <StartScreen
          onStart={startGame}
          apiKey={apiKey}
          setApiKey={updateApiKey}
          loading={gameState.loading}
          error={gameState.error}
        />
      );
    }

    if (gameState.phase === 'case_generation') {
      return (
        <CaseView
          caseData={gameState.case}
          onNext={() => submitAction("Start Investigation")} // Transition to turn 1 logic handled by hook/LLM usually, but here we might need a dummy action or just state change.
        // Wait, the prompt says "Turn 1: Player chooses action".
        // So from case_generation, we should probably just show the case, and then let user enter action for Turn 1.
        // My hook logic for `submitAction` expects to send `phase` which is currently `case_generation`.
        // If I send an action now, it will generate Turn 1 clue.
        // So CaseView should probably have a "Start" button that just transitions UI to Investigation Mode?
        // Or better: The first action IS the start of Turn 1.
        // Let's adjust: CaseView shows case. User clicks "Start Investigation".
        // Then we show InvestigationView (Turn 1). User enters action.
        // But InvestigationView needs to know it's Turn 1.
        // `gameState.phase` is `case_generation` until the first action is submitted?
        // No, the LLM returns `turn1_clue` AFTER the first action.
        // So initially we are in `case_generation`.
        // If I render `InvestigationView` immediately after `CaseView`, the user enters an action.
        // The state is still `case_generation`.
        // The LLM receives `phase: case_generation` + `action: "Investigate kitchen"`.
        // The LLM should return `turn1_clue`.
        // My hook updates phase to `turn1` after receiving `turn1_clue`.
        // So actually, `CaseView` should probably just be the display for the Case.
        // And we can have a transition to "Investigation Mode".
        />
      );
    }

    // Small adjustment: We need a way to transition from "Reading Case" to "Inputting Action".
    // Let's make CaseView have a button "Begin Investigation" that changes a local UI state or just renders the InvestigationView below it?
    // Or maybe we treat `case_generation` phase as "Reading".
    // Once user clicks "Start", we can technically stay in `case_generation` phase for the API call,
    // but UI-wise we show the input.

    // Let's handle this in the render logic below.
  };
  */

  // Simplified render logic based on phase
  return (
    <>
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}

      <Layout>
        {showLeaderboard ? (
          <LeaderboardView onBack={() => setShowLeaderboard(false)} />
        ) : (
          <>
            {gameState.phase === 'init' && (
              <StartScreen
                onStart={startGame}
                apiKey={apiKey}
                setApiKey={updateApiKey}
                loading={gameState.loading}
                error={gameState.error}
                onShowLeaderboard={() => setShowLeaderboard(true)}
                playerName={gameState.playerName || ''}
                setPlayerName={setPlayerName}
                onShowTutorial={() => setShowTutorial(true)}
              />
            )}

            {/* Game Dashboard (Replaces CaseView & InvestigationView) */}
            {gameState.case && gameState.phase !== 'init' && gameState.phase !== 'final' && (
              <GameDashboard
                caseData={gameState.case}
                clues={gameState.clues}
                deepClues={gameState.deepClues}
                phase={gameState.phase === 'case_generation' ? 'turn1' : (gameState.phase === 'turn1' ? 'turn2' : 'turn2')}
                onSubmitAction={submitAction}
                loading={gameState.loading}
              />
            )}

            {/* Transition to Final View Logic */}
            {gameState.phase === 'turn2' && (
              <div className="mt-8 border-t border-gray-800 pt-8">
                <FinalView
                  onSubmit={submitFinalAnswer}
                  result={null}
                  loading={gameState.loading}
                />
              </div>
            )}

            {gameState.phase === 'final' && (
              <FinalView
                onSubmit={() => { }}
                result={gameState.finalResult}
                loading={gameState.loading}
                onReset={resetGame}
                onShowLeaderboard={() => setShowLeaderboard(true)}
              />
            )}

            {gameState.error && (
              <div className="fixed bottom-4 right-4 bg-red-900/80 text-white p-4 rounded border border-red-700 max-w-sm">
                <h4 className="font-bold mb-1">오류</h4>
                <p className="text-sm">{gameState.error}</p>
              </div>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default App;
