import { 
  Container, 
  Category,
  Icon
} from "./styles"

interface Props {
  title: string;
}

const CategorySelect = ({title} : Props) => {
  return(
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down"/>
    </Container>
  )
}

export default CategorySelect