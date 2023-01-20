import React, { useState, useEffect, useCallback } from 'react'
import HistoryCard from "../../components/HistoryCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { VictoryPie } from 'victory-pie'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { 
  Container, 
  Header, 
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer
} from "./styles"
import { categories } from '../../utils/categories'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'

interface TransactionData {
  type: 'positive' | 'negative'
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  formattedTotal: string; 
  color: string;
  percent: string;
}

// const categoryDataInitialState = [{
//   name: 'teste',
//   total: 'teste'
// }]

const Resume = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true)
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expenses = formattedResponse
      .filter((expense: TransactionData) => 
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
        )
        ;

    const expensesTotal = expenses.reduce((accumulator: number, expense: TransactionData) => {
      return accumulator + Number(expense.amount)
    }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if(expense.category === category.key){
          categorySum += Number(expense.amount)
        }
      })
      
      if(categorySum > 0){
        const formattedTotal = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          formattedTotal,
          percent,
        })
      }
    })
    
    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading ? 
        <LoadContainer>
        <ActivityIndicator 
          color="#5636D3"
          size="large"
        /> 
      </LoadContainer> 
      :      
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left"/>
          </MonthSelectButton>
          <Month>
            { format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
          </Month>
          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { 
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: "#FFFFFF"
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {
          totalByCategories.map(item => {
            return(
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.formattedTotal}
                color={item.color}
              />
            )
          })
        }
      </Content>
      }
    </Container>
  )
}

export default Resume