import { useLocalStorage } from './useLocalStorage';
import { badges } from '../data/level-up/badges';

export interface LevelUpProgress {
  // Powers
  powersViewed: string[];

  // Myths
  mythsFlipped: string[];

  // Badges
  badgesEarned: string[];

  // Visit tracking
  firstVisit: string | null;
  lastVisit: string | null;
  visitDates: string[]; // Unique dates visited
}

const DEFAULT_PROGRESS: LevelUpProgress = {
  powersViewed: [],
  mythsFlipped: [],
  badgesEarned: [],
  firstVisit: null,
  lastVisit: null,
  visitDates: [],
};

const STORAGE_KEY = 'transition-level-up-progress';

export function useLevelUpProgress() {
  const [progress, setProgress] = useLocalStorage<LevelUpProgress>(
    STORAGE_KEY,
    DEFAULT_PROGRESS
  );

  // Track a visit (call this when Level Up is opened)
  const trackVisit = () => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const newVisitDates = prev.visitDates.includes(today)
        ? prev.visitDates
        : [...prev.visitDates, today];

      const updated: LevelUpProgress = {
        ...prev,
        firstVisit: prev.firstVisit || today,
        lastVisit: today,
        visitDates: newVisitDates,
      };

      // Check for comeback-kid badge (3 different days)
      if (newVisitDates.length >= 3 && !prev.badgesEarned.includes('comeback-kid')) {
        updated.badgesEarned = [...updated.badgesEarned, 'comeback-kid'];
      }

      return updated;
    });
  };

  // Mark a power as viewed
  const viewPower = (powerId: string) => {
    setProgress(prev => {
      if (prev.powersViewed.includes(powerId)) return prev;

      const newPowersViewed = [...prev.powersViewed, powerId];
      const updated: LevelUpProgress = {
        ...prev,
        powersViewed: newPowersViewed,
      };

      // Check for first-steps badge
      if (!prev.badgesEarned.includes('first-steps')) {
        updated.badgesEarned = [...updated.badgesEarned, 'first-steps'];
      }

      // Check for power-collector badge (all 8 powers)
      if (newPowersViewed.length >= 8 && !prev.badgesEarned.includes('power-collector')) {
        updated.badgesEarned = [...updated.badgesEarned, 'power-collector'];
      }

      return updated;
    });
  };

  // Mark a myth as flipped
  const flipMyth = (mythId: string) => {
    setProgress(prev => {
      if (prev.mythsFlipped.includes(mythId)) return prev;

      const newMythsFlipped = [...prev.mythsFlipped, mythId];
      const updated: LevelUpProgress = {
        ...prev,
        mythsFlipped: newMythsFlipped,
      };

      // Check for first-steps badge
      if (!prev.badgesEarned.includes('first-steps')) {
        updated.badgesEarned = [...updated.badgesEarned, 'first-steps'];
      }

      // Check for myth-buster badge (all 8 myths)
      if (newMythsFlipped.length >= 8 && !prev.badgesEarned.includes('myth-buster')) {
        updated.badgesEarned = [...updated.badgesEarned, 'myth-buster'];
      }

      return updated;
    });
  };

  // Manually award a badge
  const awardBadge = (badgeId: string) => {
    setProgress(prev => {
      if (prev.badgesEarned.includes(badgeId)) return prev;

      const newBadgesEarned = [...prev.badgesEarned, badgeId];
      const updated: LevelUpProgress = {
        ...prev,
        badgesEarned: newBadgesEarned,
      };

      // Check for level-up-champion badge (all badges except itself)
      const otherBadges = badges.filter(b => b.id !== 'level-up-champion');
      const hasAllOthers = otherBadges.every(b => newBadgesEarned.includes(b.id));
      if (hasAllOthers && !newBadgesEarned.includes('level-up-champion')) {
        updated.badgesEarned = [...updated.badgesEarned, 'level-up-champion'];
      }

      return updated;
    });
  };

  // Check if a badge is earned
  const hasBadge = (badgeId: string): boolean => {
    return progress.badgesEarned.includes(badgeId);
  };

  // Get progress stats
  const getStats = () => ({
    totalBadges: badges.length,
    earnedBadges: progress.badgesEarned.length,
    mythsFlipped: progress.mythsFlipped.length,
    totalMyths: 8,
    powersViewed: progress.powersViewed.length,
    totalPowers: 8,
    daysVisited: progress.visitDates.length,
  });

  // Reset all progress (for testing)
  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return {
    progress,
    trackVisit,
    viewPower,
    flipMyth,
    awardBadge,
    hasBadge,
    getStats,
    resetProgress,
  };
}
