import { useEffect, useState } from 'react';
import useReservation from '../../../hooks/api/useReservation';
import useActivities from '../../../hooks/api/useActivities';
import dayjs from 'dayjs';
import { BiLogIn } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
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
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    if (activities) {
      setActivitiesDate(Object.keys(activities));

      setActivitiesDay(activities[activitiesDate[selectedDate]]);
    }
  }, [activities, selectedDate]);

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
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer>
                        {activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
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
              <EventPlace>Auditório Lateral</EventPlace>
              <EventBorder>
                {activitiesDay
                  ?.filter((activityDay) => activityDay.EventPlace.name === 'Auditório Lateral')
                  .map((activityDay) => (
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer>
                        {activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
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
                    <ActivityContainer key={activityDay.id} durationTime={activityDay.duration / 30}>
                      <ActivityInfo>
                        <ActivityName>{activityDay.name}</ActivityName>
                        <ActivityTime>
                          {dayjs(activityDay.startTime).add(3, 'h').format('HH:mm')} {' - '}
                          {dayjs(activityDay.startTime).add(activityDay.duration, 'm').add(3, 'h').format('HH:mm')}
                        </ActivityTime>
                      </ActivityInfo>

                      <ActivityDivider />

                      <ActivityIconContainer>
                        {activityDay.capacity - activityDay.ActivityReservation.length === 0 ? (
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
