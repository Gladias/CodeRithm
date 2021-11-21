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

export type { IChallenge, ISolutionStatistics };
