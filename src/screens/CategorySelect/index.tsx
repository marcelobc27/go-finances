import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import { Button } from "react-native";
import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles"

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory
} : Props) => {
  return(
    <Container >
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{flex: 1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon}/>
            <Name onPress={() => setCategory(item)}>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator/>}
        />
        <Footer>
          <Button title="Selecionar" onPress={closeSelectCategory}/>
        </Footer>
    </Container>
  )
}

export default CategorySelect