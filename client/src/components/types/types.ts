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
    dataSets: IDataSet[];
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
    codeLineLimit: number,
    executionTimeLimit: number,
    difficultyLevel: string,
    languages: string[],
    tags: string[],
}

type IMultipleSelectOption = {
    name: string
}

type ISolutionStatisticsBase = {
    linesLimit: number,
    executionTimeLimitInSeconds: number,
    testCasesNumber: number,
}

type IComment = {
    id: number,
    author: string,
    content: string,
    creationTime: string,
}

export type {
  IAddChallengeInputs, IDataSet, ISolutionWindow, ISolutionRequest, IChallengeTests, ISolutionStatisticsBase, IMultipleSelectOption, IChallenge, IComment, ISolutionStatistics,
};
