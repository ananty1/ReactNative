import {View, Text, SafeAreaView, StyleSheet, Image, Pressable} from 'react-native';
import { Stack } from 'expo-router';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ImageEditor } from "expo-image-editor";
import { useFonts } from 'expo-font';

export default Crop = ()=>{

    const route = useRoute();
    const { uri , userEmail } = route.params;
    // console.log(uri);

    const navigation = useNavigation();

    const [editorVisible, setEditorVisible] = useState(false);
    const [imageUri, setImageUri] = useState(uri);

    const onCropImage = ()=>{
        setEditorVisible(true);
    }

    const onConfirmImage = ()=>{
        navigation.navigate('classification', {uri: imageUri , userEmail: userEmail});
    };

    const [isFontLoaded] = useFonts({
        'BubblegumSans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
    
    if (!isFontLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Adjust Image',
                    headerTitleStyle: {
                        fontFamily: 'BubblegumSans',
                    },
                }}
            />
            <Image
                source={{ uri: imageUri }}
                style={{
                    width: '85%',
                    height: 350,
                    marginVertical: 20,
                    //transform: [{rotate: `${rotate}deg`}]
                }}
            />
            <ImageEditor
                visible={editorVisible}
                onCloseEditor={() => setEditorVisible(false)}
                imageUri={imageUri}
                onEditingComplete={(result) => {
                    //console.log(result);
                    setImageUri(result.uri);
                }}
                allowedTransformOperations={['crop','rotate','contrast']}
                allowedAdjustmentOperations={['blur']}
                mode="full"
            /> 
           <View style={styles.btnContainer}>
                <Pressable onPress={onCropImage}>
                    <Text style={styles.btn}>Rotate & Crop Image</Text>
                </Pressable>
                <Pressable onPress={onConfirmImage}>
                    <Text style={styles.btn}>Confirm Image</Text>
                </Pressable>
            </View>
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#49108B',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    btn:{
        backgroundColor: 'black',
        width: 'auto',
        height: 'auto',
        borderRadius: 10,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        fontSize: 20,
        fontFamily: 'BubblegumSans',
        color: 'white',
    },
});