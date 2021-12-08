import React from 'react';
import styled from 'styled-components';

type Props = {
  caption: string;
  image: string;
}

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

const ImageArea: React.FC<Props> = ({ caption, image }) => (
  <StyledImageArea>
    <div className="center">
      <div className="caption">
        <span>
          { caption }
        </span>
      </div>
      <div className="image">
        <img src={image} alt="" />
      </div>
    </div>
  </StyledImageArea>
);

export default ImageArea;
