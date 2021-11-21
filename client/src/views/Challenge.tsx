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
import { IChallenge, ISolutionStatistics } from '../components/types/types';

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
};

const defaultStatistics:ISolutionStatistics = {
  tests: {
    limit: 5,
    actual: 0,
  },
  lines: {
    limit: 120,
    actual: 0,
  },
  executionTime: {
    limit: 30,
    actual: 0,
  },
};

const Challenge: React.FC<Props> = ({ id }) => {
  const [challenge, setChallenge] = React.useState<IChallenge>(defaultChallenge);
  const [showComments, setShowComments] = React.useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/challenge/getOne?id=${id}`)
      .then((response) => {
        setChallenge(response.data);
      });
  }, []);

  const handleSwitchClick = () => {
    setShowComments(!showComments);
  };

  // <CommentSection onSwitchClick={handleSwitchClick} /> : <ChallengeDetails onSwitchClick={handleSwitchClick} {...challenge} /> }
  return (
    <div className="container">
      <div className="row">
        { showComments ? <CommentSection onSwitchClick={handleSwitchClick} /> : <ChallengeDetails onSwitchClick={handleSwitchClick} challenge={challenge!} /> }
        <SolutionWindow />
      </div>
      <div className="row">
        { showComments ? <AddComment /> : <SolutionStatistics {...defaultStatistics} /> }
        <ChallengeTests />
      </div>
    </div>
  );
};

export default Challenge;
