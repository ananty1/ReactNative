import { useState } from 'react';
import { Text, Pressable, TextInput, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import { Link, Stack } from 'expo-router';
import axios from 'axios';
import validator from 'validator';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const baseURL = 'http://10.0.2.2:3000/';       // for localhost testing node server endpoint on android emulator
// const baseURL = 'http://localhost:3000/';    // for localhost testing on web browser
// const baseURL = 'http://device ip address:3000/';    // for localhost testing on android usb debugging 
//  find device ip using running ipconfig in cmd and then paste the ipv4 address in above
// const baseURL = 'https://retina-tuh0.onrender.com/';

export default SignUp = ()=>{

    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const handlePress = async () => {
        if (!name) {
            alert('Error! Enter a valid name.');
        } else if (!age || age < 1 || age > 110) {
            alert('Error! Enter a valid age.');
        }
        if (!email || !validator.isEmail(email)) {
            alert('Error! Enter a valid email.');
            return;
        } else if (!password || !confirmPassword) {
            alert('Error! Password is missing.');
            return;
        } else if (confirmPassword !== password) {
            alert('Error! Password does not match.');
            return;
        } else if (password.length < 8) {
            alert('Error! Password length cannot be less than 8.');
            return;
        }
        
        const data = {
            name: name,
            age: parseInt(age),
            email: email,
            password: password,
        };

        // console.log(data);

        try {
            setIsLoading(true);
            const res = await axios.post(baseURL + 'api/user/register', data);
            // console.log(res?.data);
            setIsLoading(false);
            alert(res?.data?.message);
            setTimeout(() => {
                navigation.navigate('login');
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            console.log("catch");
            console.log(err);
            console.log(err?.response?.data?.message);
            alert(err?.response?.data?.message);
        }
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
                    title: 'User Registration',
                    headerTitleStyle: {
                        fontFamily: 'BubblegumSans',
                    },
                }}
            />
            <Text style={styles.text}>Register</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setName(text)}
            value={name}
            placeholder="Full Name"
            placeholderTextColor='white'
            />
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setEmail(text)}
            value={email}
            placeholder="Email Id"
            placeholderTextColor='white'
            />
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setAge(text)}
            value={age}
            placeholder="Age"
            keyboardType='numeric'
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
            <TextInput
            style={styles.input}
            onChangeText={(text)=>setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor='white'
            secureTextEntry={true}
            />
            <Pressable onPress={handlePress} style={styles.btnContainer}>
                 <Text style={styles.btn}>Register</Text>
            </Pressable>
            <Text style={{color: 'white', fontFamily: 'BubblegumSans',}}>Already a user?  
                <Link href="/login" style={{color: '#5FBDFF'}}> Log In</Link>
            </Text>
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
        margin: 15,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'white',
        color: 'white'
    },
    text:{
        color: 'white',
        fontFamily: 'BubblegumSans',
        fontSize: 24,
        marginBottom: 20,
    },
    btnContainer:{
        backgroundColor: 'black',
        width: 110,
        height: 45,
        borderRadius: 10,
        marginTop: 5,
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