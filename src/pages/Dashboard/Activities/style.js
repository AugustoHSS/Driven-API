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
  border: 1px solid #d7d7d7;

  padding: 0 10px 10px 10px;
`;

const EventPlace = styled.h2`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-size: 17px;
  line-height: 20px;

  text-align: center;
  margin: 60px 0 13px 0;
  color: #7b7b7b;
`;

const EventBox = styled.div`
  width: 288px;
`;

const Events = styled.div`
  display: flex;
`;

const ActivityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 10px solid white;

  padding: 10px;

  height: ${(props) => props.durationTime && `${props.durationTime * 40}px`};

  background: ${(props) => (props.userSubscribed ? '#D0FFDB' : '#f1f1f1')};
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100%;
  width: 180px;
`;

const ActivityName = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;

  color: #343434;
`;

const ActivityTime = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  margin-top: 6px;

  color: #343434;
`;

const ActivityDivider = styled.hr`
  border: ${(props) => (props.userSubscribed ? '1px solid #99E8A1' : '1px solid #cfcfcf')};;

  height: 100%;
`;

const ActivityIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  width: 50px;

  cursor: pointer;
  pointer-events: ${(props) => (props.capacity || props.userSubscribed ? 'auto' : 'none')};
`;

const CapacityCounter = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;

  margin-left: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.capacityColor !== 0 || props.userSubscribed ? '#078632' : '#CC6666')};

  width: 50px;
`;

export {
  Container,
  TitlePage,
  Content,
  NotPaid,
  EventDateButton,
  EventBorder,
  EventPlace,
  EventBox,
  Events,
  ActivityContainer,
  ActivityInfo,
  ActivityName,
  ActivityTime,
  ActivityDivider,
  ActivityIconContainer,
  CapacityCounter,
};
