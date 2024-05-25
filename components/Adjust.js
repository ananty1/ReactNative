import { View, Text,  SafeAreaView, StyleSheet, Image, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default Adjust = ()=>{

    const route = useRoute();
    const { uri , userEmail} = route.params;

    const navigation = useNavigation();

    const onRetakeImage = ()=>{
        navigation.navigate('feed', {userEmail: userEmail});
    }

    const onConfirmImage = ()=>{
        navigation.navigate('classification', {uri , userEmail});
    };

    const onAdjustImage  = ()=>{
        navigation.navigate('crop', {uri , userEmail});
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
            <Image
                source={{ uri }}
                style={styles.pickedImage}
            />
            <View style={styles.btnContainer}>
                <Pressable onPress={onAdjustImage}>
                    <Text style={styles.btn}>Adjust Image</Text>
                </Pressable>

                <Pressable onPress={onRetakeImage}>
                    <Text style={styles.btn}>Retake Photo</Text>
                </Pressable>

                <Pressable onPress={onConfirmImage}>
                    <Text style={styles.btn}>Confirm Image</Text>
                </Pressable>

                <Pressable onPress={onConfirmImage}>
                    <Text style={styles.btn}>DR Classification Results</Text>
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
        fontSize: 18,
        fontFamily: 'BubblegumSans',
        color: 'white',
    },
    pickedImage: {
        width: '85%',
        height: 350,
        marginTop: 10,
        marginBottom: 20,
    }
});