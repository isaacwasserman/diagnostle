// Star rating based on number of turns used
export function getStarRating(turns: number): number {
  if (turns <= 2) return 5;
  if (turns <= 4) return 4;
  if (turns <= 6) return 3;
  if (turns <= 8) return 2;
  return 1;
}

export const MAX_TURNS = 10;
