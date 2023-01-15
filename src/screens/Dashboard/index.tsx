import { RFValue } from "react-native-responsive-fontsize";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Title,
  Transactions,
  TransactionList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: String
}

const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de Sites",
      amount: "R$ 12.000,00",
      category: {
      name: 'Vendas',
      icon: 'dollar-sign' 
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
      name: 'Alimentação',
      icon: 'coffee' 
      },
      date: "27/03/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel de Apartamento",
      amount: "R$ 1.200,00",
      category: {
      name: 'Casa',
      icon: 'home' 
      },
      date: "10/03/2020"
    },
  ]
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/108136296?s=400&v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Marcelo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Entradas"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item}/>}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
