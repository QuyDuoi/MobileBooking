import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {styles} from './style';
import {login} from '../../services/api';

function DangNhap(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erEmail, setErEmail] = useState('');
  const [erPasword, setErPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [welcomeText, setWelcomeText] = useState('');

  const changeStatus = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkStoredUserData = async () => {
      try {
        const tenNhanVien = await EncryptedStorage.getItem('tenNhanVien');
        if (tenNhanVien) {
          setWelcomeText(`Welcome back ${tenNhanVien}`);
        } else {
          setWelcomeText('Welcome newbie');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra thông tin người dùng:', error);
      }
    };

    checkStoredUserData();
  }, []);

  const dangNhap = async () => {
    let check = true;
    if (!email.trim()) {
      setErEmail('Vui lòng nhập thông tin Email!');
      check = false;
    } else {
      setErEmail('');
    }

    if (!password.trim()) {
      setErPassword('Vui lòng nhập mật khẩu!');
      check = false;
    } else {
      setErPassword('');
    }

    if (check) {
      try {
        const data = await login(email, password);
        if (data && data.status === 200) {
          const {token, refreshToken, data: userData} = data;
          await EncryptedStorage.setItem('accessToken', token);
          await EncryptedStorage.setItem('refreshToken', refreshToken);
          await EncryptedStorage.setItem('tenNhanVien', userData.fullName);
          await EncryptedStorage.setItem('_id', userData._id || '');
          await EncryptedStorage.setItem('vaiTro', userData.userRole || '');
          setWelcomeText(`Welcome back ${userData.fullName}`);
          // navigation.navigate('Drawer', {vaiTro: userData.userRole});
          console.log("Đăng nhập thành công")
        } else {
          ToastAndroid.show(data.messenger, ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Image
        style={styles.hinhTron}
        source={require('../../images/background1.png')}
      />
      <View style={styles.box1}>
        <Text style={styles.textDangNhap}>Đăng nhập tài khoản</Text>
        <Image
          style={styles.imgUser}
          source={require('../../images/user.png')}
        />
      </View>
      <Text style={styles.textWc}>{welcomeText}</Text>
      <View style={styles.box2}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.tenCty}>
            Booking <Text style={styles.toMau}>Management</Text>
          </Text>
        </View>
        <TextInput
          style={styles.textInputTk}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email} 
        />
        {erEmail ? <Text style={styles.error}>{erEmail}</Text> : null}
        <View style={styles.textInputMk}>
          <TextInput
            style={{paddingLeft: 14}}
            placeholder="Mật khẩu"
            secureTextEntry={showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={changeStatus}>
            <Image
              source={
                showPassword
                  ? require('../../images/show.png')
                  : require('../../images/hide.png')
              }
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>
        {erPasword ? <Text style={styles.error}>{erPasword}</Text> : null}
        <TouchableOpacity onPress={dangNhap} style={styles.btnDangNhap}>
          <Text style={styles.loginButton}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.box3}>
          <Image source={require('../../images/Vector.png')} />
          <Text style={styles.text}>Or sign up with</Text>
          <Image source={require('../../images/Vector.png')} />
        </View>
        <View style={styles.box3}>
          <TouchableOpacity style={styles.box4}>
            <Image
              style={styles.box5}
              source={require('../../images/google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.box4}>
            <Image
              style={styles.box5}
              source={require('../../images/facebook.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default DangNhap;
