import { TouchableOpacityProps } from "react-native"
import { Container, Title } from "./styles"

interface Props extends TouchableOpacityProps{
  title: string
}

const Button = ({title, ...rest} : Props) => {
  return(
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

export default Button