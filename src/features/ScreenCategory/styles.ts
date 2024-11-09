import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      width: '90%',  // Tăng độ rộng của input search
      marginHorizontal: 20,  // Giảm khoảng cách từ biên để tránh bó layout
      backgroundColor: '#F7F8F9',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 15,
      height: 45, // Tăng chiều cao để dễ thao tác
      shadowColor: '#000',  // Thêm shadow để input nổi bật
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,  // Thêm độ nổi cho Android
    },
    viewSearch: {
      width: '100%',
      height: '12%',  // Tăng chiều cao để chứa đủ nội dung
      justifyContent: 'center',
      alignItems: 'center', // Đảm bảo các item được căn giữa
      marginTop: 10, // Tạo khoảng cách nhỏ ở trên cùng
    },
    viewBody: {
      flex: 1,  // Để thành phần này chiếm đầy màn hình còn lại
      backgroundColor: '#FFFFFE',
      borderRadius: 10,
      marginHorizontal: '5%',
      paddingVertical: 10,  // Tạo thêm không gian trong thành phần chính
    },
    position: {
      position: 'absolute',
      top: '10%',
      right: '4%',
    },
  });
  