
import { GameStats, Level } from "../types";
import { fetchApi } from './apiService';


export const getTypingFeedback = async (stats: GameStats): Promise<string> => {
    try {
        const data = await fetchApi<{ feedback: string }>('/api/feedback', 'POST', { stats });
        return data.feedback;
    } catch (error) {
        console.error("Failed to get AI feedback:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not retrieve AI feedback.";
        return `${errorMessage}\n\nDespite the comms issue, your performance was solid. Keep practicing to reach new heights!`;
    }
};

export const generateTypingChallenge = async (difficulty: Level['difficulty'], duration: number): Promise<string> => {
    try {
        const data = await fetchApi<{ text: string }>('/api/generate-challenge', 'POST', { difficulty, duration });
        return data.text;
    } catch (error) {
        console.error("Failed to generate AI challenge:", error);
        if (error instanceof Error) {
            throw new Error(error.message || "AI communication link severed. Challenge generation failed.");
        }
        throw new Error("An unknown error occurred during challenge generation.");
    }
};
