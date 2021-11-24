type IChallenge = {
    id: number,
    title?: string,
    description?: string,
    author?: string,
    averageRating?: number,
    commentsNumber?: number,
    difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING',
    solutionStatus: 'New' | 'InProgress' | 'Completed',
    tags: string[];
}

type IDataSet = {
    input: string,
    expectedOutput: string,
    actualOutput: string,
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

type IComment = {
    id: number,
    author: string,
    content: string,
    creationTime: string,
}

export type { IChallenge, IComment, ISolutionStatistics };
