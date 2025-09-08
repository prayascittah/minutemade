// Suggestion data
export const suggestedDialogues = [
  "Can you check my recent emails?",
  "Can you check my Slack for urgent messages?",
  "What's on my calendar for today?",
  "Draft a meeting summary for yesterday",
  "Check for any pending notifications",
  "Create a task list for this week",
  "Remind me to call the client at 3 PM",
];

// Get random suggestion utility function
export const getRandomSuggestion = (): string => {
  const randomIndex = Math.floor(Math.random() * suggestedDialogues.length);
  return suggestedDialogues[randomIndex];
};
