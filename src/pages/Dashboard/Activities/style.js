import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TitlePage = styled.h1`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;

  color: #000000;
`;

const Content = styled.div`
  width: 100%;
  height: 95%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotPaid = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8e8e8e;

  @media screen and (max-width: 650px) {
    font-size: 19px;
  }
`;

const EventDateButton = styled.button`
  border: none;
  width: 131px;
  height: 37px;

  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#E0E0E0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: 30px 17px 0 0;

`;

const EventBorder = styled.div`
  width: 100%;
  min-height: 391px;
  border: 1px solid #D7D7D7;
`;

const EventPlace = styled.h2`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-size: 17px;
  line-height: 20px;

  text-align: center;
  margin: 60px 0 13px 0;
  color: #7B7B7B;
`;

const EventBox = styled.div`
  width: 288px;
`;

const Events = styled.div`
  display: flex;
`;

export { Container, TitlePage, Content, NotPaid, EventDateButton, EventBorder, EventPlace, EventBox, Events };
