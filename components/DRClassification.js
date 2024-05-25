import { View, Text,  SafeAreaView, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const baseURL = 'http://10.0.2.2:3000/';  // node server endpoint for accessing mongodb database
const apiurl =  'http://10.0.2.2:8000/';  // Ml model api endpoint

export default DRClassification = ()=>{

    const route = useRoute();
    const { uri, userEmail } = route.params;
    const navigation = useNavigation();

    const [isFontLoaded] = useFonts({
        'BubblegumSans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
      });
      
    const [classificationResult, setClassificationResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const classifyImage = async () => {
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: uri,
            type: 'image/jpeg', // Adjust the type according to the image type
            name: 'image.jpg',
          });
           const response = await axios.post( apiurl + 'predict', formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          // console.log('Received response:', response.data);

          await axios.post(baseURL + 'api/classify', {
            email: userEmail,
            imageClass: response.data.class,
            confidence: response.data.confidence,
          });

          setClassificationResult(response.data);
          setIsLoading(false);

        } catch (error) {
          alert("Image height and width should be below 512 x 512 ");
          setTimeout(()=>{
            navigation.navigate('feed' , {userEmail: userEmail}); 
          },1000);
          console.error('Error classifying image:', error.message);
          console.log('Server response data:', error.response?.data);
          setIsLoading(false);

        }
      };
    classifyImage();
  }, [uri]);


    if (!isFontLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'DR Classification',
                    headerTitleStyle: {
                        fontFamily: 'BubblegumSans',
                    },
                }}
            />
            <Image
                source={{ uri }}
                style={styles.pickedImage}
            />

          {isLoading ? (
             <ActivityIndicator size="large" color="#00ff00" />
           ) : (
             classificationResult && (
                <Text style={styles.resultText}>
                     Class: {classificationResult.class} {"\n"}
                     Confidence: {classificationResult.confidence}

                </Text>
             )
            )} 

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#49108B',
    },
    pickedImage: {
        width: '85%',
        height: 350,
        marginVertical: 20,
    },
    resultText: {
        fontFamily: 'BubblegumSans',
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
      },
});