import { useState, useCallback } from 'react';
import { callLLM } from '../services/llm';

const INITIAL_STATE = {
    phase: "init", // init, case_generation, turn1, turn2, final
    case: null,
    clues: [],
    deepClues: [],
    finalResult: null,
    history: [], // To keep track of conversation for context if needed, though the prompt says we send game_state
    loading: false,
    error: null,
};

export const useGameState = () => {
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || 'YLvpasFankFIoGSfrp9yARmxd8U5SMhus8WxE3U4PqevRnWzhMRr08XYPh2w_XxJI-6Lgz_i4cT3BlbkFJXemGTtVscYYeM7uD3M3FcaDIlbyVhXP8SIQiaTwbRVlhjp2x_4-LLpPSNyu-0xbvlvdUnHrkoA');

    const updateApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('openai_api_key', key);
    };

    const setPlayerName = (name) => {
        setGameState(prev => ({ ...prev, playerName: name }));
    };

    const startGame = async () => {
        setGameState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await callLLM(apiKey, [
                { role: "user", content: JSON.stringify({ phase: "init", action: "start_game" }) }
            ]);

            setGameState(prev => ({
                ...prev,
                phase: "case_generation",
                case: response.case,
                loading: false,
            }));
        } catch (error) {
            setGameState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    };

    const submitAction = async (action) => {
        setGameState(prev => ({ ...prev, loading: true, error: null }));

        // Construct the payload as requested: phase, action, game_state
        const payload = {
            phase: gameState.phase,
            action: action,
            game_state: {
                case: gameState.case,
                clues: gameState.clues,
                deepClues: gameState.deepClues,
            }
        };

        try {
            const response = await callLLM(apiKey, [
                { role: "user", content: JSON.stringify(payload) }
            ]);

            setGameState(prev => {
                const newState = { ...prev, loading: false };

                if (response.phase === 'turn1_clue') {
                    newState.phase = 'turn1';
                    newState.clues = [...prev.clues, response.new_clue];
                } else if (response.phase === 'turn2_clue') {
                    newState.phase = 'turn2';
                    newState.deepClues = [...prev.deepClues, response.deep_clue];
                } else if (response.phase === 'final_judgement') {
                    newState.phase = 'final';
                    newState.finalResult = response.result;

                    // Save score to Leaderboard
                    const newScore = {
                        date: new Date().toISOString(),
                        score: response.result.score,
                        caseTitle: prev.case?.case_title || "Unknown Case",
                        playerName: prev.playerName || "익명의 탐정"
                    };
                    const savedScores = JSON.parse(localStorage.getItem('rogue_detective_scores') || '[]');
                    savedScores.push(newScore);
                    localStorage.setItem('rogue_detective_scores', JSON.stringify(savedScores));
                }

                return newState;
            });
        } catch (error) {
            setGameState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    };

    const submitFinalAnswer = async (suspectName, reasoning) => {
        // Logic is same as submitAction, just different payload content if needed
        // The prompt says "final_answer" input.
        const action = `Final Answer: Suspect ${suspectName}. Reasoning: ${reasoning}`;
        await submitAction(action);
    };

    const resetGame = () => {
        setGameState(INITIAL_STATE);
    };

    return {
        gameState,
        apiKey,
        updateApiKey,
        setPlayerName,
        startGame,
        submitAction,
        submitFinalAnswer,
        resetGame
    };
};
