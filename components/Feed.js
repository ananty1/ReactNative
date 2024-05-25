import { View, Text,  SafeAreaView, StyleSheet, Image, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native'; 

export default Feed = ()=>{

    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [capturedImageURI, setCapturedImageURI] = useState(null);
    const [isFocused, setIsFocused] = useState(true);
    const route = useRoute();
    const { userEmail } = route.params;

    const navigation = useNavigation();

    const toggleCameraType = ()=> {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const onSelectImage = async()=>{
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              //aspect: [4, 3],
              quality: 1,
            });
            //console.log(result);
            if (result) {
              setCapturedImageURI(result?.assets[0]?.uri);
            }
        } 
        catch(error){
            //console.error('Error picking an image', error);
            //alert('Error in picking image!');
        }
    }

    const onCaptureImage = async()=>{
        try{
            if(isFocused && cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync();
                //console.log(photo);
                setCapturedImageURI(photo.uri);
            }
        }
        catch(error){
            //console.error('Error capturing an image', error);
            alert('Error in capturing image!');
        }
    }

    const onGrantPermission = async()=>{
        try{
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        }catch(error){
            alert('Permisson not granted.');
        }
    }

    const onProceed = ()=>{
        navigation.navigate('adjust', { uri: capturedImageURI , userEmail: userEmail});
    }

    useFocusEffect(
        useCallback(() => {
          setIsFocused(true);
          return () => {
            setIsFocused(false);
          };
        }, [])
    );
    
    useEffect(()=>{
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    const [isFontLoaded] = useFonts({
        'BubblegumSans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
    
    if (!isFontLoaded) {
        return null;
    }

    if(!hasPermission){
        return (
            <SafeAreaView style={styles.container}>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                />
                <View style={styles.header}>
                    <Image
                        source={require('../assets/Eye-care-logo-on-transparent-background-PNG.png')}
                        style={styles.iconImage}
                    />
                    <Text style={styles.headingText}>Retina Care</Text>
                </View>
                <Text style={styles.permissionText}>Oops! Camera Permission Not Granted.</Text>
                <Pressable onPress={onGrantPermission}>
                    <Text style={styles.btn}>Grant Permission</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />

            <View style={styles.header}>
                <Image
                    source={require('../assets/Eye-care-logo-on-transparent-background-PNG.png')}
                    style={styles.iconImage}
                />
                <Text style={styles.headingText}>Retina Care</Text>
            </View>

            {
                isFocused && 
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <Pressable onPress={toggleCameraType}>
                        <Image
                            source={require('../assets/cameraFlip.png')}
                            style={styles.flipCameraIcon}
                        />
                    </Pressable>
                </Camera>
            }

            <View style={styles.btnContainer}>
                <Pressable onPress={onSelectImage}>
                    <Text style={styles.btn}>Select Image</Text>
                </Pressable>
                <Pressable onPress={onCaptureImage}>
                    <Text style={styles.btn}>Capture Image</Text>
                </Pressable>
            </View>
            
            {
                capturedImageURI &&
                <>
                    <Image
                        source={{ uri: capturedImageURI }}
                        style={styles.pickedImage}
                    />
                    <Pressable onPress={onProceed}>
                        <Text style={styles.btnProceed}>Proceed</Text>
                    </Pressable>
                </>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: '#49108B',
    },
    iconImage: {
      width: 100,
      height: 100,
      margin: 20,
    },
    header: {
        width: '100%',
        height: 105,
        backgroundColor: '#49108B',
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    headingText: {
        marginTop: 50,
        color: 'white',
        fontSize: 35,
        fontFamily: 'BubblegumSans',
    },
    permissionText: {
        fontFamily: 'BubblegumSans',
        color: 'red',
        margin: 20,
    },
    camera: {
        width: '100%',
        height: 350,
    },
    flipCameraIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 2,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn:{
        backgroundColor: 'black',
        width: 'auto',
        height: 50,
        borderRadius: 10,
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        margin: 20,
        fontSize: 18,
        fontFamily: 'BubblegumSans',
        color: 'white',
    },
    pickedImage: {
        width: 150,
        height: 150,
    },
    btnProceed: {
        backgroundColor: 'black',
        width: 'auto',
        height: 45,
        borderRadius: 10,
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 5,
        fontSize: 16,
        fontFamily: 'BubblegumSans',
        color: 'white',
    }
});
  