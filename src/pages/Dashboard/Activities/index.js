import { useState } from 'react';
import useReservation from '../../../hooks/api/useReservation';
import { Container, TitlePage, Content, NotPaid, EventDateButton, EventBorder, EventPlace, EventBox, Events } from './style';

export default function Activities() {
  const { reservation } = useReservation();
  const [eventDate, setEventDate] = useState(
    [
      { id: 1, monthDay: '22/10', weekDay: 'Sexta' },
      { id: 2, monthDay: '23/10', weekDay: 'Sábado' },
      { id: 3, monthDay: '24/10', weekDay: 'Domingo' }
    ]);
  const [selectedDate, setSelectedDate] = useState(1);
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
          {eventDate.map((day) => (
            <EventDateButton
              key={day.id}
              isSelected={day.id === selectedDate}
              onClick={() => setSelectedDate(day.id)}>
              {day.weekDay}, {day.monthDay}
            </EventDateButton>
          ))}
          <Events>
            <EventBox>
              <EventPlace>Auditório Principal</EventPlace>
              <EventBorder></EventBorder>
            </EventBox>
            <EventBox>
              <EventPlace>Auditório Lateral</EventPlace>
              <EventBorder></EventBorder>
            </EventBox>
            <EventBox>
              <EventPlace>Sala de Workshop</EventPlace>
              <EventBorder></EventBorder>
            </EventBox>
          </Events>
        </>
      )}
    </Container>
  );
}
