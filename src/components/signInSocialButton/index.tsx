import { TouchableOpacityProps } from "react-native"
import { 
  Button,
  ImageContainer,
  ButtonIcon,
  Title
} from "./styles"

interface Props extends TouchableOpacityProps {
  title: string;
  icon: string;
  color: string;
  onPress: ()=>{};
}

const SignInSocialButton = ({title, icon, color, onPress, ...rest} : Props) => {
  return(
    <Button activeOpacity={0.5} onPress={onPress}>
      <ImageContainer>
        <ButtonIcon name={icon} color={color}/>
      </ImageContainer>
      <Title>
        {title}
      </Title>
    </Button>
  )
}

export default SignInSocialButton