export interface CharacterBody {
  bodyType: string;
  label: string;
  color: string;
}

export interface CharacterSelection {
  character: string;
  colorsCode: string[];
  bodyType: string[];
  body: CharacterBody[];
}

export interface Answer {
  questionId: number;
  textAnswer?: string;
  answerId?: number;
}

export interface FinderRequest {
  answers: Answer[];
  characterSelection: CharacterSelection[];
  page?: number;
  limit?: number;
}
