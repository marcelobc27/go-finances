import { Container, Icon, Title } from "./styles"

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const TransactionTypeButton = ({title, type, isActive, ...rest} : Props) => {
  return(
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type}/>
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default TransactionTypeButton