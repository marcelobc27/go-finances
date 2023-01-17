import { useState } from "react";
import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelect from "../../components/Forms/CategorySelect";
import { Container, Title, Header, Form, Fields, TransactionTypes } from "./styles";

const Register = () => {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionsTypeSelect (type: 'up' | 'down'){
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Teste</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

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

          <CategorySelect title="Categoria"/>
        </Fields>
      <Button title="Enviar"/>
      </Form>
    </Container>
  );
};

export default Register;
