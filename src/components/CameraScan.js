import React,{useState,useEffect} from 'react';
import * as CryptoJS from 'crypto-js'
import {StyleSheet, Text} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Pressable,
  SectionList,
  Image,
  Alert,
  Dimensions,
  RefreshControl
} from 'react-native';

export default function CameraScan({navigation,route}) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);
  async function decryption(hexString) {
    const KEY_SIZE = 128 / 8
    const IV_KEY = CryptoJS.enc.Utf8.parse('sefoekfij+95*fthhfthulikeergrtjyy@eggfhtht-wefhsbjwaiwj')
    const KEY = CryptoJS.enc.Utf8.parse('sefoekfij+95*wdufhuh@erfehe90ri03nf-wefhsbjwaiwj')
    const decrypted = CryptoJS.AES.decrypt(hexString, KEY, {
      keySize: KEY_SIZE,
      iv: IV_KEY,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted;
}
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if(barcodes && barcodes.length>0){
        console.log(barcodes[0].displayValue)
    }
  },[barcodes])

  return (
    device != null &&
    hasPermission && (
      <>
      <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          orientation='portrait'
        />
        
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
            decryption(barcode);
            
          </Text>
          navigation.navigate('Home');
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});