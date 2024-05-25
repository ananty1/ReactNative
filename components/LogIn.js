import { useState } from 'react';
import { Text, Pressable, TextInput, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import { Link, Stack } from 'expo-router';
import axios from 'axios';
import validator from 'validator';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const baseURL = 'http://10.0.2.2:3000/';    // for localhost testing on android emulator
// const baseURL = 'http://localhost:3000/';    // for localhost testing on web browser
// const baseURL = 'http://device ip address:3000/';    // for localhost testing on android usb debugging 
//  find device ip using running ipconfig in cmd and then paste the ipv4 address in above
// const baseURL = 'https://retina-tuh0.onrender.com/';

export default LogIn = ()=>{

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const handlePress = async() =>{
        if(!email || !validator.isEmail(email)){
            alert('Error! Enter a valid email.');
            return;
        }
        else if(!password){
            alert('Error! Password is missing.');
            return;
        }
        const data = {
            email,
            password
        };
        //console.log(data);
        try{
            setIsLoading(true);
            const res = await axios.post(baseURL+'api/user/login', data);
            // console.log(res?.data);
            setIsLoading(false);
            alert(res?.data?.message);
            // alert('Logged In Successfully!');
            setTimeout(()=>{
                navigation.navigate('feed', { userEmail: email }); 
            },1000);
        }catch(err){
            setIsLoading(false);
            //console.log(err?.response?.data?.message);
            alert(err?.response?.data?.message);
        }
    }

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
                    title: 'User Login',
                    headerTitleStyle: {
                        fontFamily: 'BubblegumSans',
                    },
                }}
            />
            <Text style={styles.text}>Log In</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setEmail(text)}
            value={email}
            placeholder="Email Id"
            placeholderTextColor='white'
            />
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor='white'
            secureTextEntry={true}
            />
            <Pressable onPress={handlePress} style={styles.btnContainer}>
                <Text style={styles.btn}>Log In</Text>
            </Pressable>
            <Text style={{color: 'white', fontFamily: 'BubblegumSans',}}>New user?  
                <Link href="/signup" style={{color: '#5FBDFF'}}> Register </Link>
            </Text>
            {/* <Link href="/feed" style={{color: '#5FBDFF'}}> Go to feed </Link> */}
            {
                isLoading && 
                <ActivityIndicator size="medium" color="#00ff00"/>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        //backgroundColor: '#F5FCFF',
        backgroundColor: '#49108B',
    },
    input: {
        fontFamily: 'BubblegumSans',
        height: 40,
        width: 300,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'white',
        color: 'white'
    },
    text:{
        fontFamily: 'BubblegumSans',
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
    },
    btnContainer:{
        backgroundColor: 'black',
        width: 110,
        height: 45,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent:'center',
        alignItems: 'center',
    },
    btn:{
        fontFamily: 'BubblegumSans',
        fontSize: 17,
        color: 'white',
    }
});