import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListCategory from './components/ListCategory';
import {
  addCategory,
  getListCategorys,
  deleteCategory,
  updateCategory,
} from './util/category';
import AddCategory from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory';
import CategoryDetail from './components/CategoryDetail';
const Category = () => {
  const [ListCategorys, setListCategorys] = useState(null);
  const [isAddCategory, setisAddCategory] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isCategoryDetail, setisCategoryDetail] = useState(false);
  const [Category_Detail, setCategory_Detail] = useState(null);
  const [NameCategoryUpdate, setNameCategoryUpdate] = useState('');
  const [idCategoryUpdate, setIdCategoryUpdate] = useState('');
  const [dateCategory, setdateCategory] = useState('');

  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, []);
  // hàm lấy dữ liệu danh mục
  async function getData() {
    const data = await getListCategorys();
    setListCategorys(data.reverse());
  }

  // hàm thêm danh mục
  async function addCategoryHandler(category) {
    const isAdd = await addCategory(category);
    if (isAdd) {
      ToastAndroid.show('Thêm danh mục mới thành công', ToastAndroid.SHORT);
      setisAddCategory(false);
      getData();
    } else {
      Alert.alert('Lỗi khi thêm danh mục mới vui lòng thử lại sau ');
    }
  }
  // hàm xóa danh mục
  function deleteCategoryHandler(id) {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa danh mục này?',
      [
        {
          text: 'Có',
          onPress: async () => {
            const isDelete = await deleteCategory(id);
            if (isDelete) {
              ToastAndroid.show('Xóa danh mục thành công', ToastAndroid.SHORT);
              setisAddCategory(false);
              getData();
            } else {
              Alert.alert('Lỗi khi xóa danh mục vui lòng thử lại sau ');
            }
          },
        },
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  // hàm thực hiện lấy dữ liệu khi click vào button update và đổ dữ liệu lên modal
  function onClickUpdate(category) {
    setisUpdate(true);
    setIdCategoryUpdate(category._id);
    setNameCategoryUpdate(category.nameCategory);
    setdateCategory(category.createdAt);
  }
  // hàm set text
  function onchangeTextNameCategory(text) {
    setNameCategoryUpdate(text);
  }

  // hàm cập nhật danh mục
  async function updateCategoryHandler() {
    const categoryUpdate = {
      nameCategory: NameCategoryUpdate,
      id_store: '66e2462d7265add6ee481b7b',
    };
    const isSuccess = await updateCategory(idCategoryUpdate, categoryUpdate);
    if (isSuccess) {
      ToastAndroid.show('Cập nhật danh mục mới thành công', ToastAndroid.SHORT);
      setisUpdate(false);
      getData();
    } else {
      Alert.alert('Lỗi khi Cập nhật danh mục vui lòng thử lại sau ');
    }
  }
  // hàm thiết lập trạng false thái hiện modal thêm danh mục
  function setStatusAdd() {
    setisAddCategory(false);
  }

  function setDetailCategory(item) {
    setCategory_Detail(item);
    setisCategoryDetail(true);
  }
  function setCloseDetail() {
    setisCategoryDetail(false);
  }
  // thực hiện đổi giao diện khi isAddCategory=true
  // if(isAddCategory)
  //     return (<AddCategory  onAdd={addCategoryHandler} onCanler={setStatusAdd}/>)

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.imgHeader, {justifyContent: 'center'}]}
        source={require('./components/src/img/backgrour.png')}>
        <View style={styles.viewSearch}>
          {/* Tìm kiếm */}
          <View style={styles.inputSearch}>
            <TextInput
              style={{width: '90%'}}
              value={search}
              onChangeText={text => {
                setSearch(text);
                if (text === '') {
                  getData();
                } else {
                  const filter = ListCategorys.filter(item =>
                    item.nameCategory.includes(text),
                  );
                  setListCategorys(filter);
                }
              }}
              placeholder="Tìm kiếm danh mục"
              placeholderTextColor={'#8391A1'}
            />

            <View style={{justifyContent: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('./components/src/img/search.png')}
              />
            </View>
          </View>
        </View>

        <View style={styles.viewBody}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'black',
              marginVertical: 15,
            }}>
            Danh sách danh mục
          </Text>

          <ListCategory
            onClickItem={setDetailCategory}
            onUpdate={onClickUpdate}
            onDeleteHandler={deleteCategoryHandler}
            data={ListCategorys}
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.position}
            onPress={() => {
              setisAddCategory(true);
            }}>
            <Image
              style={styles.iconadd}
              source={require('../ScreenCategory/components/src/img/add-square-02.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Modal animationType="slide" transparent={true} visible={isAddCategory}>
        <AddCategory onAdd={addCategoryHandler} onCanler={setStatusAdd} />
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isUpdate}>
        <UpdateCategory
          onUpdateHanderl={updateCategoryHandler}
          date={dateCategory}
          onChangeText={onchangeTextNameCategory}
          onCandel={() => {
            setisUpdate(false);
          }}
          Categoryname={NameCategoryUpdate}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCategoryDetail}>
        <CategoryDetail data={Category_Detail} onCloes={setCloseDetail} />
      </Modal>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgHeader: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    width: '100%',
    height: '10%',
  },
  iconadd: {
    height: 55,
    width: 55,
  },
  inputSearch: {
    width: '85%',
    marginHorizontal: 32,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 15,
  },
  viewSearch: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  viewBody: {
    height: '80%',
    backgroundColor: '#FFFFFE',
    borderRadius: 10,
    marginHorizontal: '5%',
  },
  position: {
    position: 'absolute',
    top: '10%',
    right: '4%',
  }
});
