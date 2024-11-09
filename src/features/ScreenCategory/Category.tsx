import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListCategory from './components/ListCategory';
import AddCategory from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory';
import CategoryDetail from './components/CategoryDetail';
import removeAccents from 'remove-accents';
import {styles} from './styles';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch} from '../../store/store';
import {RootState} from '../../store/store';
import {
  fetchCategories,
  createCategory,
  modifyCategory,
  removeCategory,
} from '../../store/categorySlice';

function Category(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const {list: ListCategorys, loading} = useSelector(
    (state: RootState) => state.category,
  ); // Lấy danh mục từ Redux store
  const id_store = '66f4eced30557ca7844dd7c3';
  const [isAddCategory, setisAddCategory] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isCategoryDetail, setisCategoryDetail] = useState(false);
  const [Category_Detail, setCategory_Detail] = useState(null);
  const [NameCategoryUpdate, setNameCategoryUpdate] = useState('');
  const [idCategoryUpdate, setIdCategoryUpdate] = useState('');
  const [dateCategory, setdateCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Dispatch action để lấy danh mục từ store
    dispatch(fetchCategories(id_store));
  }, [dispatch]);

  const normalizeString = (str: string) => {
    return removeAccents(str).toLowerCase();
  };

  const filteredEmployees = search
    ? ListCategorys.filter(category =>
        normalizeString(category.nameCategory).includes(
          normalizeString(search),
        ),
      )
    : ListCategorys;

  // Hàm thêm danh mục
  const addCategoryHandler = async category => {
    try {
      const categoryData = {
        ...category,
        id_store: id_store, // Thêm id_store vào payload
      };

      await dispatch(createCategory(categoryData)).unwrap(); // Sử dụng unwrap để xử lý lỗi

      ToastAndroid.show('Thêm danh mục mới thành công', ToastAndroid.SHORT);
      setisAddCategory(false);
    } catch (error) {
      // Nếu có lỗi từ backend (như lỗi trùng lặp), sẽ xử lý tại đây
      if (error.message.includes('Danh mục đã tồn tại cho cửa hàng này')) {
        Alert.alert('Lỗi', 'Danh mục đã tồn tại cho cửa hàng này');
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm danh mục');
      }
    }
  };

  // Hàm xóa danh mục
  const deleteCategoryHandler = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa danh mục này?',
      [
        {
          text: 'Có',
          onPress: () => {
            dispatch(removeCategory(id))
              .then(() => {
                ToastAndroid.show(
                  'Xóa danh mục thành công',
                  ToastAndroid.SHORT,
                );
              })
              .catch(() => {
                Alert.alert('Lỗi khi xóa danh mục, vui lòng thử lại sau');
              });
          },
        },
        {
          text: 'Không',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  // Hàm thực hiện lấy dữ liệu khi click vào button update và đổ dữ liệu lên modal
  const onClickUpdate = category => {
    setisUpdate(true);
    setIdCategoryUpdate(category._id);
    setNameCategoryUpdate(category.nameCategory);
    setdateCategory(category.createdAt);
  };

  // Hàm cập nhật danh mục
  const updateCategoryHandler = async () => {
    try {
      const categoryUpdate = {
        nameCategory: NameCategoryUpdate,
        id_store: id_store, // Thêm id_store vào payload
      };

      await dispatch(
        modifyCategory({id: idCategoryUpdate, category: categoryUpdate}),
      ).unwrap(); // Sử dụng unwrap để xử lý lỗi

      ToastAndroid.show('Cập nhật danh mục thành công', ToastAndroid.SHORT);
      setisUpdate(false);
    } catch (error) {
      // Nếu có lỗi từ backend (như lỗi trùng lặp), sẽ xử lý tại đây
      if (error.message.includes('Danh mục đã tồn tại')) {
        Alert.alert('Lỗi', 'Danh mục đã tồn tại cho cửa hàng này');
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật danh mục');
      }
    }
  };

  // Hàm thiết lập trạng thái ẩn modal thêm danh mục
  const setStatusAdd = () => {
    setisAddCategory(false);
  };

  // Đặt thông tin chi tiết danh mục
  const setDetailCategory = item => {
    setCategory_Detail(item);
    setisCategoryDetail(true);
  };

  const setCloseDetail = () => {
    setisCategoryDetail(false);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              data={filteredEmployees}
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
            onChangeText={text => setNameCategoryUpdate(text)}
            onCandel={() => setisUpdate(false)}
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
    </KeyboardAvoidingView>
  );
}

export default Category;
