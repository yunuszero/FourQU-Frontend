import {
    View,
    Text,
    ScrollView,
    TextInput,
    Button,
    Pressable,
    Image,
    Alert,
    StyleSheet,
  } from 'react-native';
  
  import React from 'react';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import PinView from 'react-native-pin-view';
  import OTP_list from '../../components/pinComponent/OTP_list.js';
  import {useState, useEffect} from 'react';
  import {TouchableHighlight} from 'react-native';
  
  import logo from '../../assets/icon/logo.png';
  import back from '../../assets/icon/backGreen.png';
  import axios from 'axios';
  
  const VerifyOTP = ({navigation, route}) => {
    const [pin, setPin] = useState('');
    const onPress = value => {
      if (/^([0-9]){0,5}$/.test(pin) && /^([0-9])$/.test(value)) {
        setPin(val => val + value);
        console.log(pin);
        console.log(pin.length);
      }
    };
    const delClick = () => {
      if (pin.length == 0) return;
      setPin(val => val.slice(0, -1));
    };
  
    useEffect(() => {
      if (pin.length === 6) {
          console.log(route.params.id);
        axios
          .post('https://server-quplus.herokuapp.com/api/otp/check', {
            id: route.params.id,
            OtpNumber: pin,
          })
          .then(res => {
            console.log('then', res.data);
            saveRefresh(res.data.Refreshtoken);
  
            console.log('vaid PIN!!');
            navigation.navigate('NewPin');
          })
          .catch(err => {
            console.log('catch', err.response.data);
            setPin(val => val.slice(0, -6));
            console.log('Invaid PIN!!');
          });
      }
    }, [pin]);
  
    const saveRefresh = async value => {
      try {
        await AsyncStorage.setItem('@storage_refresh_token', value);
        console.log('save refresh_token complete');
      } catch (error) {
        console.log('error store refresh_token');
      }
    };
  //readRefresh()
    const readRefresh = async () => {
      try {
        return await AsyncStorage.getItem('@storage_refresh_token');
      } catch (error) {vaid
        console.log("error read refresh_token")
      }
    };
  
    return (
      <View style={{flex: 1}} className="bg-green-regis">
        <View
          style={{flex: 4}}
          className=" object-center w-full rounded-b-xl  bg-green-regis container">
          <View className=" w-full h-full  justify-between items-center ">
            <Image source={logo} className="w-32 h-32" />
            <Text
              style={{fontFamily: 'NotoSans-Bold'}}
              className="text-3xl text-egg">
              Please Enter OTP PIN
            </Text>
            <View className="w-5/6 h-10 bg-base rounded-sm mb-8">
              <Text
                style={{fontFamily: 'NotoSans-Bold'}}
                className="m-auto text-2xl">
                {pin}
              </Text>
            </View>
          </View>
        </View>
  
        <View
          style={{flex: 6}}
          className="flex flex-col h-fit justify-between px-7 py-7">
          <View className="flex justify-between flex-row w-full">
            <OTP_list num={'1'} onPress={onPress} />
            <OTP_list num={'2'} onPress={onPress} />
            <OTP_list num={'3'} onPress={onPress} />
          </View>
  
          <View className="flex justify-between flex-row w-full">
            <OTP_list num={'4'} onPress={onPress} />
            <OTP_list num={'5'} onPress={onPress} />
            <OTP_list num={'6'} onPress={onPress} />
          </View>
  
          <View className="flex justify-between flex-row w-full">
            <OTP_list num={'7'} onPress={onPress} />
            <OTP_list num={'8'} onPress={onPress} />
            <OTP_list num={'9'} onPress={onPress} />
          </View>
  
          <View className="flex justify-between flex-row w-full">
            <View className="flex  h-20 w-20 justify-center items-center flex-row rounded-full"></View>
            <OTP_list num={'0'} onPress={onPress} />
  
            <TouchableHighlight
              className="rounded-full"
              onPress={() => delClick()}>
              <View className="flex h-20 w-20 justify-center items-center flex-row rounded-full">
                <Image source={back} className="w-16 h-16 items-center" />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };
  
  export default VerifyOTP;
  