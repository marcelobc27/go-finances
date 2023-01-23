import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator} from 'react-native'
import { useCallback, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";
import { useTheme } from "styled-components/native";
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
  LogoutButton,
  LoadContainer
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
    lastTransaction: ''
  },
  expenses: {
    amount: '0',
    lastTransaction: ''

  },
  total: {
    amount: '0',
    lastTransaction: ''
  }
}

function getLastTransactionDate (
    collection: DataListProps[], 
    type: 'positive' | 'negative'
  ){
    const lastTransaction = new Date(Math.max.apply(Math, collection
    .filter((transaction) => transaction.type === type)
    .map((transaction) => new Date(transaction.date).getTime())))

    return `
      ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}
    `
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>()
  const [highlightedData, setHighlightedData] = useState(highlightedDataInitialState)
  const theme = useTheme()
  
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
        } else {
          expensesTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

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

    const lastTransactionsIncomes = getLastTransactionDate(transactions, 'positive')
    const lastTransactionsExpenses = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 à ${lastTransactionsExpenses}`
    
    const total = incomesTotal - expensesTotal

    setHighlightedData({
      incomes: {
        amount: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada ${lastTransactionsIncomes}`
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída ${lastTransactionsExpenses}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading 
        ? 
        <LoadContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size="large"
          /> 
        </LoadContainer> 
        :
        <>
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
            lastTransaction={highlightedData.incomes.lastTransaction}
          />
          <HighlightCard
            type="down"
            title="Saídas"
            amount={highlightedData.expenses.amount}
            lastTransaction={highlightedData.expenses.lastTransaction}
          />
          <HighlightCard
            type="total"
            title="Entradas"
            amount={highlightedData.total.amount}
            lastTransaction={highlightedData.total.lastTransaction}
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
      </>
      }
    </Container>
  );
};

export default Dashboard;
