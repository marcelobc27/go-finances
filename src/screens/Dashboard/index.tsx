import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator} from 'react-native'
import { useCallback, useEffect, useState } from "react";
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
  TransactionList,
  LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

// interface HighlightedDataProps {
//   total: string
// }

const highlightedDataInitialState = {
  incomes: {
    amount: '0',
  },
  expenses: {
    amount: '0',
  },
  total: {
    amount: '0'
  }
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>()
  const [highlightedData, setHighlightedData] = useState(highlightedDataInitialState)
  
  async function loadTransactions(){
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : []
    
    let incomesTotal = 0;
    let expensesTotal = 0;

    const formattedtransactions: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if(item.type === 'positive'){
          incomesTotal += Number(item.amount)
          console.log("incomesTotal", incomesTotal)
        } else {
          expensesTotal += Number(item.amount)
          console.log("expensesTotal", expensesTotal)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        console.log(amount)

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return{
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      })

    setTransactions(formattedtransactions)
    console.log("incomes after map", incomesTotal)
    console.log("expenses after map", expensesTotal)

    const total = incomesTotal - expensesTotal

    setHighlightedData({
      incomes: {
        amount: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
    console.log(highlightedData)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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
          <LogoutButton onPress={() => {}}>
          <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightedData.incomes.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightedData.expenses.amount}
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Entradas"
          amount={highlightedData.total.amount}
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item}/>}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
