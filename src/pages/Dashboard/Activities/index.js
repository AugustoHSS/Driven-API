import { useEffect, useState, useContext } from 'react';
import useReservation from '../../../hooks/api/useReservation';
import useActivities from '../../../hooks/api/useActivities';
import useToken from '../../../hooks/useToken';
import UserContext from '../../../contexts/UserContext';
import * as activityApi from '../../../services/activityApi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { BiLogIn } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import {
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
} from './style';

export default function Activities() {
  const { reservation } = useReservation();
  const { activities } = useActivities();
  const [activitiesDate, setActivitiesDate] = useState(['Sábado, 22/10']);
  const [activitiesDay, setActivitiesDay] = useState(null);
  const [userActivities, setUserActivities] = useState({});
  const [selectedDate, setSelectedDate] = useState(0);
  const { userData } = useContext(UserContext);
  const token = useToken();

  useEffect(() => {
    if (activities) {
      setActivitiesDate(Object.keys(activities));
      setActivitiesDay(activities[activitiesDate[selectedDate]]);
      handleIsUserSubscribed(activities);
    }
  }, [activities, selectedDate]);

  async function handleActivitySelection(activityId) {
    userActivities[activityId] = !(userActivities[activityId]);
    
    try {
      await activityApi.updateActivity(token, activityId);
      setUserActivities({ ...userActivities });
    } catch (error) {
      console.log(error.response);

      if (error.response.data.message === 'activities time conflict')
        toast('Você já possui uma atividade neste horário!');
      
      userActivities[activityId] = !(userActivities[activityId]);
    }
  }

  function handleIsUserSubscribed(activitiesRaw) {
    const activitiesDays = [];
    for (const date in activitiesRaw)
      activitiesDays.push(activitiesRaw[date]);
    
    const userActivitiesRaw = {};
    activitiesDays.forEach(activities => {
      for (let i = 0; i < activities.length; i++) {
        userActivitiesRaw[activities[i].id] = activities[i].ActivityReservation;
      }
    });

    userActivitiesLoop: for (const activityReservations in userActivitiesRaw) {
      if (userActivitiesRaw[activityReservations].length === 0) {
        userActivitiesRaw[activityReservations] = false;
        continue;
      }

      for (let i = 0; i < userActivitiesRaw[activityReservations].length; i++) {
        const { userId, activityId } = userActivitiesRaw[activityReservations][i];
        if (userId === userData.user.id) {
          userActivitiesRaw[activityId] = true;
          continue userActivitiesLoop;
        }
      }
    }
    setUserActivities({ ...userActivities, ...userActivitiesRaw });
  }

  return (
    <Container>
      <TitlePage>Escolha de atividades</TitlePage>
      {!reservation ? (
        <Content>
          <NotPaid>
            Você precisa ter confirmado pagamento antes <br />
            de fazer escolha de atividades
          </NotPaid>
        </Content>
      ) : reservation.Transaction[0].modalitySelected === 'Online' ? (
        <Content>
          <NotPaid>
            Sua modalidade de ingresso não necessita escolher <br />
            atividade. Você terá acesso a todas as atividades.
          </NotPaid>
        </Content>
      ) : (
        <>
          {activitiesDate?.map((day, index) => (
            <EventDateButton key={index} isSelected={index === selectedDate} onClick={() => setSelectedDate(index)}>
              {day}
            </EventDateButton>
          ))}
          <Events>
            <EventBox>
              <EventPlace>Auditório Principal</EventPlace>
              <EventBorder>
                {activitiesDay
                  ?.filter((activityDay) => activityDay.EventPlace.name === 'Auditório Principal')
                  .map((activityDay) => (
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30} userSubscribed={userActivities[activityDay.id]}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer 
                        capacity={activityDay.capacity - activityDay.ActivityReservation.length}
                        onClick={() => handleActivitySelection(activityDay.id)}
                      >
                        {
                          userActivities[activityDay.id] ?
                            <FaRegCheckCircle size={23} color="#078632" />
                            :
                            activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
                              <MdOutlineCancel size={23} color="#CC6666" />
                            ) : (
                              <BiLogIn size={23} color="#078632" />
                            )}

                        <CapacityCounter capacityColor={activityDay.capacity - activityDay.ActivityReservation.length}>
                          {userActivities[activityDay.id] ?
                            'Inscrito'
                            :
                            activityDay.capacity - activityDay.ActivityReservation.length === 0
                              ? 'Esgotado'
                              : activityDay.capacity - activityDay.ActivityReservation.length + ' vagas'}
                        </CapacityCounter>
                      </ActivityIconContainer>
                    </ActivityContainer>
                  ))}
              </EventBorder>
            </EventBox>
            <EventBox>
              <EventPlace>Auditório Lateral</EventPlace>
              <EventBorder>
                {activitiesDay
                  ?.filter((activityDay) => activityDay.EventPlace.name === 'Auditório Lateral')
                  .map((activityDay) => (
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30} userSubscribed={userActivities[activityDay.id]}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer 
                        capacity={activityDay.capacity - activityDay.ActivityReservation.length}
                        onClick={() => handleActivitySelection(activityDay.id)}
                      >
                        {
                          userActivities[activityDay.id] ?
                            <FaRegCheckCircle size={23} color="#078632"/>
                            :
                            activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
                              <MdOutlineCancel size={23} color="#CC6666" />
                            ) : (
                              <BiLogIn size={23} color="#078632" />
                            )}

                        <CapacityCounter capacityColor={activityDay.capacity - activityDay.ActivityReservation.length}>
                          {activityDay.capacity - activityDay.ActivityReservation.length === 0
                            ? 'Esgotado'
                            : activityDay.capacity - activityDay.ActivityReservation.length + ' vagas'}
                        </CapacityCounter>
                      </ActivityIconContainer>
                    </ActivityContainer>
                  ))}
              </EventBorder>
            </EventBox>
            <EventBox>
              <EventPlace>Sala de Workshop</EventPlace>
              <EventBorder>
                {activitiesDay
                  ?.filter((activityDay) => activityDay.EventPlace.name === 'Sala de Workshop')
                  .map((activityDay) => (
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30} userSubscribed={userActivities[activityDay.id]}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer 
                        capacity={activityDay.capacity - activityDay.ActivityReservation.length}
                        onClick={() => handleActivitySelection(activityDay.id)}
                      >
                        {
                          userActivities[activityDay.id] ?
                            <FaRegCheckCircle size={23} color="#078632"/>
                            :
                            activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
                              <MdOutlineCancel size={23} color="#CC6666" />
                            ) : (
                              <BiLogIn size={23} color="#078632" />
                            )}

                        <CapacityCounter capacityColor={activityDay.capacity - activityDay.ActivityReservation.length}>
                          {activityDay.capacity - activityDay.ActivityReservation.length === 0
                            ? 'Esgotado'
                            : activityDay.capacity - activityDay.ActivityReservation.length + ' vagas'}
                        </CapacityCounter>
                      </ActivityIconContainer>
                    </ActivityContainer>
                  ))}
              </EventBorder>
            </EventBox>
          </Events>
        </>
      )}
    </Container>
  );
}
