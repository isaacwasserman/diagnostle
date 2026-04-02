// Star rating based on number of turns used
export function getStarRating(turns: number): number {
  if (turns <= 1) return 5;
  if (turns <= 2) return 4;
  if (turns <= 3) return 3;
  if (turns <= 4) return 2;
  return 1;
}

export const MAX_TURNS = 6;
