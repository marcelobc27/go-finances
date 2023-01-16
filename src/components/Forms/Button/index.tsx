import { TouchableOpacityProps } from "react-native"
import { Container, Title } from "./styles"

interface Props extends TouchableOpacityProps{
  title: String
}

const Button = ({title, ...rest} : Props) => {
  return(
    <Container>
      <Title>Teste</Title>
    </Container>
  )
}

export default Button