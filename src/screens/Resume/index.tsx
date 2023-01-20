import React, { useState, useEffect } from 'react'
import HistoryCard from "../../components/HistoryCard"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { 
  Container, 
  Header, 
  Title,
  Content
} from "./styles"
import { categories } from '../../utils/categories'

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
  total: string;
  color: string;
}

// const categoryDataInitialState = [{
//   name: 'teste',
//   total: 'teste'
// }]

const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  async function loadData() {
    const datakey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(datakey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expenses = formattedResponse
      .filter((expense: TransactionData) => expense.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if(expense.category === category.key){
          categorySum += Number(expense.amount)
        }
      })
      
      console.log(category.name, categorySum)

      if(categorySum > 0){
        const total = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        })
      }
    })
    
    setTotalByCategories(totalByCategory)
    console.log(totalByCategories)
  }

  useEffect(() => {
    loadData()
  }, [])

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      
      <Content>
        {
          totalByCategories.map(item => {
            return(
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.total}
                color={item.color}
              />
            )
          })
        }
      </Content>
    </Container>
  )
}

export default Resume