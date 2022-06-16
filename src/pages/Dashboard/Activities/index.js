/* eslint-disable indent */
import useReservation from '../../../hooks/api/useReservation';
import { Container, TitlePage, Content, NotPaid } from './style';

export default function Activities() {
  const { reservation } = useReservation();

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
        <>INSIRAM A PAGINA DE ATIVIDADES AQUI PESSOAL</>
      )}
    </Container>
  );
}
