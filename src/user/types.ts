export interface UserProfile {
  isOnboarded: boolean;
  ideas: string[];
  affirmations: string[];
  dayStepProgress: DayStepProgress;
  isRitualCompleted: boolean;
  isAffirmationCompleted: boolean;
  isBoostCompleted: boolean;
  isStarted: boolean;
  timeLeft: number;
  dayCompletedAt: number;
}

export enum DayStepProgress {
  Ritual = 'Ritual',
  Affirmation = 'Affirmation',
  Boost = 'Boost',
}
