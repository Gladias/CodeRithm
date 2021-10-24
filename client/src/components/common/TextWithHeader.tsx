import React from 'react';
import styled from 'styled-components';

type Props = {
    welcome?: string,
    header: string,
    description: string,
    link: {
        value: string,
        caption: string
    }
    columnHeight: string
}

const StyledTextWithHeader = styled.div<{ columnHeight: string }>`
    height: ${(props) => props.columnHeight || '40%'};
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .welcome {
      height: 10%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .coderithm {
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      color: #6AA31C;
      font-size: 3.2rem;
      font-family: 'Meedori BO';
    }

    .description {
      height: 40%;
      line-height: 130%;
      border-bottom: 4px dotted #EDEFEC;
      text-align: center;
    }

    .redirection-link {
      height: 20%;
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      a {
          color: #EDEFEC;
      }
    }
`;

const TextWithHeader: React.FC<Props> = ({
  welcome, header, description, link, columnHeight,
}) => (
  <StyledTextWithHeader columnHeight={columnHeight}>
    <span className="welcome">
      {welcome}
    </span>
    <span className="coderithm">
      {header}
    </span>
    <span className="description">
      {description}
    </span>
    <span className="redirection-link">
      <a href={link.value}>
        {link.caption}
      </a>
    </span>
  </StyledTextWithHeader>
);

TextWithHeader.defaultProps = {
  welcome: '',
};

export default TextWithHeader;
