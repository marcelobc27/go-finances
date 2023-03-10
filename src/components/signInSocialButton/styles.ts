import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity`
  height: ${RFValue(56)}px;
  flex-direction: row;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
`

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
  `

export const ButtonIcon = styled(FontAwesome5)`
  font-size: ${RFValue(24)}px;
`

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

`
