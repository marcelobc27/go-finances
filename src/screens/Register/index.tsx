import { useEffect, useState } from "react";
// import Button from "../../components/Forms/Button";
import { Button } from "react-native";
import Input from "../../components/Forms/Input";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import CategorySelect from "../CategorySelect";
import { Container, Title, Header, Form, Fields, TransactionTypes } from "./styles";
import { Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  })
  
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  function handleTransactionsTypeSelect (type: 'positive' | 'negative'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal (){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal (){
    setCategoryModalOpen(false)
  }

  async function handleRegister(){
    if(!transactionType){
      return console.log("Selecione o tipo de transição")
    }

    if(category.key === 'category'){
      return console.log("Selecione a categoria")
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: name,
      amount: amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const datakey = '@gofinances:transactions';
      const data = await AsyncStorage.getItem(datakey)
      console.log("data", data)
      const currentData = data ? JSON.parse(data) : []
      console.log("currentdata", currentData)

      const formattedData = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(datakey, JSON.stringify(formattedData));

      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      setName('')
      setAmount('')

      navigation.navigate("Listagem");

    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   // async function loadData(){
  //   //   const data = await AsyncStorage.getItem(datakey)
  //   //   console.log("loadData function ", JSON.parse(data))
  //   // }

  //   // loadData();

  //   // async function removeAll() {
  //   //   const datakey = '@gofinances:transactions';
  //   //   await AsyncStorage.removeItem(datakey)
  //   // }

  //   // removeAll()
  // }, [])

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
            onChangeText={text => setName(text)}
            autoCapitalize="sentences"
            autoCorrect={false}
            clearTextOnFocus={true}
          />

          <Input
            placeholder="Preço" 
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
            clearTextOnFocus={true}
          />
          <TransactionTypes>
          <TransactionTypeButton
            title="Income"
            type="up"
            onPress={() => handleTransactionsTypeSelect('positive')}
            isActive={transactionType === 'positive'}
          />
          <TransactionTypeButton
            title="Outcome"
            type="down"
            onPress={() => handleTransactionsTypeSelect('negative')}
            isActive={transactionType === 'negative'}
          />
          </TransactionTypes>

          <CategorySelectButton title="Categoria" onPress={handleOpenSelectCategoryModal}/>
        </Fields>
      <Button title="Enviar" onPress={handleRegister}/>
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
