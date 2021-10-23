import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/images/profile.svg';

const StyledImageArea = styled.div`
  height: 100%;
  width: calc(100% / 3);
  background-color: #EDEFEC;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .center {
    display: flex;
    height: 40%;
    flex-direction: column;
    justify-content: space-around;

    .caption {
      font-size: 3.2rem;
      font-family: 'Meedori BO';
      text-align: center;
      color: #6AA31C;
    }
    .image {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 90%;
        height: auto;
      }
    }
  }
`;

const ImageArea: React.FC = () => (
  <StyledImageArea>
    <div className="center">
      <div className="caption">
        <span>
          Account
          <br />
          Creation
        </span>
      </div>
      <div className="image">
        <img src={profile} alt="Account creation icon" />
      </div>
    </div>
  </StyledImageArea>
);

export default ImageArea;
