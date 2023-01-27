import { useContext } from "react"
import { Button } from "react-native"
import SignInSocialButton from "../../components/signInSocialButton"
import { useTheme } from "styled-components/native"
import { useAuth } from "../../hooks/auth"
import { 
  Container,
  Header,
  TitleWrapper,
  LogoImage,
  Title,
  SignInTitle,
  Footer,
  LogoText,
  FooterWrapper,
} from "./styled"

const SignIn = () => {
  const theme = useTheme()
  const { promptAsync } = useAuth()

  // function handleSignInWithGoogle(){
  //   try{
  //     SignInWithGoogle()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoImage name="coins"/>
          <LogoText>Go Finances</LogoText>
          <Title>
            Controle suas {'\n'} 
            finanças de forma {'\n'} 
            simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça login com {'\n'}
          uma das opções abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton color={theme.colors.primary} onPress={() => promptAsync()}  title="Entrar com Google" icon="google"></SignInSocialButton>
          <SignInSocialButton color={theme.colors.text_dark} title="Entrar com Apple" icon="apple"></SignInSocialButton>
        </FooterWrapper>
      </Footer>

    </Container>
  )
}

export default SignIn