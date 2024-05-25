import { Stack } from 'expo-router';

export default HomeLayout = ()=>{
    return (
        <Stack
          screenOptions={{
            title: 'Retina Care',
            headerStyle: {
              backgroundColor: '#49108B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
  );
}