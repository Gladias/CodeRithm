/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../assets/styles/Challenge.scss';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import {
  AddComment,
  ChallengeDetails, ChallengeTests, CommentSection, SolutionStatistics, SolutionWindow,
} from '../components/challenges';
import {
  IChallenge, IComment, ISolutionRequest, ISolutionStatistics,
} from '../components/types/types';

type Props = {
  id: string;
}

const defaultChallenge:IChallenge = {
  id: 1,
  title: '',
  description: '',
  author: '',
  averageRating: 0,
  commentsNumber: 0,
  difficultyLevel: 'EASY',
  solutionStatus: 'InProgress',
  tags: [],
  availableLanguages: [],
  linesLimit: 120,
  executionTimeLimitInSeconds: 3,
  testCases: [],
};

const Challenge: React.FC<Props> = ({ id }) => {
  const [challenge, setChallenge] = React.useState<IChallenge>(defaultChallenge);
  const [comments, setComments] = React.useState<IComment[]>();
  const [showComments, setShowComments] = React.useState(false);
  const [commentWarningMessage, setCommentWarningMessage] = React.useState('Rules: 1. Don’t Post spoilers 2. Swear words not allowed');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/challenge/getOne?id=${id}`)
      .then((response) => {
        setChallenge(response.data);
      });

    axios.get(`http://localhost:8080/api/comment?challengeId=${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  const addNewComment = (content: string) => {
    axios.post(`http://localhost:8080/api/comment?challengeId=${id}`, {
      content,
    })
      .then((response) => {
        setComments(response.data);
        setCommentWarningMessage('Rules: 1. Don’t Post spoilers 2. Swear words not allowed');
      })
      .catch((error) => {
        setCommentWarningMessage(error.response.data.cause);
      });
  };

  const submitSolution = (language: string, code: string) => {
    const request:ISolutionRequest = {
      challengeId: challenge.id,
      content: code,
      languageOption: {
        name: language,
      },
    };

    axios.post('http://localhost:8080/api/solution/add', request)
      .then((response) => {
        console.log({ response });
        challenge.testCases = response.data;
        // TODO
        setChallenge(challenge);
      });
  };

  const handleSwitchClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="container">
      <div className="row">
        { showComments ? <CommentSection comments={comments!} onSwitchClick={handleSwitchClick} /> : <ChallengeDetails onSwitchClick={handleSwitchClick} challenge={challenge!} /> }
        <SolutionWindow availableLanguages={challenge.availableLanguages} handleSubmit={submitSolution} />
      </div>
      <div className="row">
        { showComments ? <AddComment handleSubmit={addNewComment} warningMessage={commentWarningMessage} /> : (
          <SolutionStatistics
            linesLimit={challenge.linesLimit}
            executionTimeLimitInSeconds={challenge.executionTimeLimitInSeconds}
            testCasesNumber={challenge.testCases.length}
          />
        ) }
        <ChallengeTests testCases={challenge.testCases} />
      </div>
    </div>
  );
};

export default Challenge;
