import { useState } from "react";
// import Button from "../../components/Forms/Button";
import { Button } from "react-native";
import Input from "../../components/Forms/Input";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import CategorySelect from "../CategorySelect";
import { Container, Title, Header, Form, Fields, TransactionTypes } from "./styles";
import { Modal } from "react-native";

const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)  
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  })

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  function handleTransactionsTypeSelect (type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal (){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal (){
    setCategoryModalOpen(false)
  }

  function handleRegister(){
    if(!transactionType){
      return console.log("Selecione o tipo de transição")
    }

    if(category.key === 'category'){
      return console.log("Selecione a categoria")
    }

    const data = {
      name: name,
      amount: amount,
      transactionType: transactionType,
      category: category.key
    }

    console.log(data)
  }

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
          />

          <Input
            placeholder="Preço" 
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
          />
            {console.log(name, amount)}
          <TransactionTypes>
          <TransactionTypeButton
            title="Income"
            type="up"
            onPress={() => handleTransactionsTypeSelect('up')}
            isActive={transactionType === 'up'}
          />
          <TransactionTypeButton
            title="Outcome"
            type="down"
            onPress={() => handleTransactionsTypeSelect('down')}
            isActive={transactionType === 'down'}
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
