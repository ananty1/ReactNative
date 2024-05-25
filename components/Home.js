import { StyleSheet, Text, Image, SafeAreaView } from "react-native";
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

export default Home = ()=> {
  const [isFontLoaded] = useFonts({
    'BubblegumSans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
  });

  if (!isFontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Retina Care</Text>
      <Image
        source={require('../assets/Eye-care-logo-on-transparent-background-PNG.png')}
        style={styles.iconImage}
      ></Image>
      <Link href="/signup" style={styles.btn}> Register </Link>
      <Link href="/login" style={styles.btn}> Log In </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#49108B',
  },
  title: {
    fontFamily: 'BubblegumSans',
    fontSize: 45,
    color:'white',
    marginTop: 50,
    textAlign: 'center',
  },
  iconImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  btn:{
    fontFamily: 'BubblegumSans',
    backgroundColor: 'black',
    width: 110,
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 18,
    color: 'white',
}
});
