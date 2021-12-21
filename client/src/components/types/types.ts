/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
type IChallenge = {
    id: number,
    title?: string,
    description?: string,
    author?: string,
    averageRating?: number,
    commentsNumber?: number,
    difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING',
    solutionStatus: 'New' | 'InProgress' | 'Completed',
    tags: string[],
    availableLanguages: string[],
    linesLimit: number,
    executionTimeLimitInSeconds: number,
    testCases: IDataSet[],
}

type ISolutionWindow = {
    handleSubmit: (language: string, code: string) => void,
    availableLanguages: string[],
}

type ISolutionRequest = {
    challengeId: number,
    content: string,
    languageOption: {
        name: string
    }
}

type IDataSet = {
    [key: string]: string | number | undefined,
    input: string,
    output: string,
    userOutput?: string,
}

type IChallengeTests = {
    testCases: IDataSet[],
}

type ISolutionStatistics = {
    tests: {
        limit: number;
        actual: number;
    }
    lines: {
        limit: number;
        actual: number;
    }
    executionTime: {
        limit: number;
        actual: number;
    }
}

type IAddChallengeInputs = {
    title: string,
    description: string,
    linesLimit: number,
    executionTimeLimitInSeconds: number,
    difficultyLevel: string,
    languages: string[],
    tags: string[],
}

type IMultipleSelectOption = {
    name: string
}

type IComment = {
    id: number,
    author: string,
    content: string,
    creationTime: string,
}

type ILanguage = {
    name: string,
    version: string,
}

type IProfile = {
    id: number,
    username: string,
    position?: number,
    challengesByDifficulty: {
        EASY: number,
        MEDIUM: number,
        HARD: number,
        CHALLENGING: number,
    }
    generalStats: {
        added: number,
        rated: number,
        commented: number,
    }
    challengesByLanguage: {
        python: number,
        java: number,
        csharp: number,
        javascript: number
    }
}

type INotesThumbnail = {
    id: number,
    name: string,
    thumbnail: string,
}

export type {
  IAddChallengeInputs, IDataSet, ISolutionWindow, ISolutionRequest, IChallengeTests, ILanguage, IMultipleSelectOption, IChallenge, IComment, ISolutionStatistics, IProfile, INotesThumbnail
};
