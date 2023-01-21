import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  height: 70%;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
`

export const TitleWrapper = styled.View`
  align-items: center;
`

export const LogoImage = styled(FontAwesome5)`
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.secondary};
  text-align: center;
`

export const LogoText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-top: 6px;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  text-align: center;
  margin-top: 45px;
  color: ${({theme}) => theme.colors.shape};
`

export const SignInTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 66px;
  color: ${({theme}) => theme.colors.shape};
`

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({theme}) => theme.colors.secondary};
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

  justify-content: space-between;
`
