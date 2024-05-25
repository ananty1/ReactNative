import Home from "../components/Home";
import { Stack } from "expo-router";

export default HomeScreen = ()=>{
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <Home/>
        </> 
    )
};