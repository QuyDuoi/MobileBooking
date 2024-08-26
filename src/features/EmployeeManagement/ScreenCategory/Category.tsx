import { Alert, Image, ImageBackground, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListCategory from './components/ListCategory'
import { addCategory, getListCategorys,deleteCategory, updateCategory } from './util/category'
import AddCategory from './components/AddCategory'
import UpdateCategory from './components/UpdateCategory'
import CategoryDetail from './components/CategoryDetail'
const Category = () => {
    const [ListCategorys, setListCategorys] = useState(null)
    const [isAddCategory, setisAddCategory] = useState(false)
    const [isUpdate, setisUpdate] = useState(false)
    const [isCategoryDetail, setisCategoryDetail] = useState(false)
    const [Category_Detail, setCategory_Detail] = useState(null)
    const [NameCategoryUpdate, setNameCategoryUpdate] = useState('')
    const [idCategoryUpdate, setIdCategoryUpdate] = useState('')
    const [dateCategory, setdateCategory] = useState('')

    useEffect(() => {
        getData()
    }, [])
    // hàm lấy dữ liệu danh mục
    async function getData(){
        const data=  await getListCategorys()
        setListCategorys(data.reverse())
    }
    
    // hàm thêm danh mục
    async function addCategoryHandler(category){
        const isAdd =await addCategory(category)
        if(isAdd){
            ToastAndroid.show('Thêm danh mục mới thành công', ToastAndroid.SHORT)
            setisAddCategory(false);  
            getData(); 
        }else{
           Alert.alert('Lỗi khi thêm danh mục mới vui lòng thử lại sau ')
        }
    }
    // hàm xóa danh mục
    function deleteCategoryHandler(id){
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc muốn xóa danh mục này?',
            [
                {text: 'Có', onPress: async () =>{
                   const isDelete=await deleteCategory(id)
                   if(isDelete){
                    ToastAndroid.show('Xóa danh mục thành công', ToastAndroid.SHORT)
                    setisAddCategory(false);  
                    getData(); 
                }else{
                   Alert.alert('Lỗi khi xóa danh mục vui lòng thử lại sau ')
                }
                }},
                {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
    // hàm thực hiện lấy dữ liệu khi click vào button update và đổ dữ liệu lên modal
    function onClickUpdate(category){
        setisUpdate(true)
        setIdCategoryUpdate(category._id)
        setNameCategoryUpdate(category.nameCategory)
        setdateCategory(category.createdAt)
    }
    // hàm set text 
    function onchangeTextNameCategory(text) { 
        setNameCategoryUpdate(text)
    }

    // hàm cập nhật danh mục
    async function updateCategoryHandler(){
        const categoryUpdate={
            nameCategory:NameCategoryUpdate,
        }
        const isSuccess = await updateCategory(idCategoryUpdate,categoryUpdate)
        if(isSuccess){
            ToastAndroid.show('Cập nhật danh mục mới thành công', ToastAndroid.SHORT)
            setisUpdate(false)  
            getData(); 
        }else{
           Alert.alert('Lỗi khi Cập nhật danh mục vui lòng thử lại sau ')
        }

    }
    // hàm thiết lập trạng false thái hiện modal thêm danh mục
    function setStatusAdd(){
        setisAddCategory(false)
    }

    function setDetailCategory(item){
        setCategory_Detail(item)
        setisCategoryDetail(true)
    }
    function setCloseDetail(){
        setisCategoryDetail(false)
    }
    // thực hiện đổi giao diện khi isAddCategory=true
    // if(isAddCategory)
    //     return (<AddCategory  onAdd={addCategoryHandler} onCanler={setStatusAdd}/>)
   

    return (
        <View style={styles.container}>
            <ImageBackground
                style={[styles.imgHeader, {justifyContent: 'center'}]}
                source={require('./components/src/img/backgrour.png')}>
                    <TouchableOpacity style={styles.iconContainer} onPress={()=>{setisAddCategory(true)}}>
                        <Image
                            style={styles.iconadd}
                            source={require('../ScreenCategory/components/src/img/add-square-02.png')}
                        />
                    </TouchableOpacity>
                <ListCategory onClickItem={setDetailCategory} onUpdate={onClickUpdate} onDeleteHandler={deleteCategoryHandler} data={ListCategorys}/>
            </ImageBackground>
            
            <Modal  
                animationType='slide' 
                transparent={true}
                visible={isAddCategory}>
                <AddCategory  onAdd={addCategoryHandler} onCanler={setStatusAdd}/>
            </Modal>

            <Modal  
                animationType='slide' 
                transparent={true}
                visible={isUpdate}>
                <UpdateCategory onUpdateHanderl={updateCategoryHandler} date={dateCategory} onChangeText={onchangeTextNameCategory} onCandel={()=>{setisUpdate(false)}} Categoryname={NameCategoryUpdate}/>
            </Modal>
 
            <Modal
                 animationType='slide' 
                 transparent={true}
                 visible={isCategoryDetail}>
                <CategoryDetail data={Category_Detail} onCloes={setCloseDetail} />
            </Modal>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgHeader: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    iconContainer:{
        position: 'absolute',
        end: 40,
        bottom:50,
    },
    iconadd:{
        height: 45,
        width: 45,
    }
})