import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {Block, Text, Button} from '../components';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,
         DrawerContentScrollView,
         DrawerItem
        } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";       
import Iconf from 'react-native-vector-icons/AntDesign';    
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';   
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';    
import LinearGradient from 'react-native-linear-gradient';
import Article from '../screens/List';
import Detail from '../screens/Detail';
import Favorites from '../screens/Fav';
import { theme }  from '../constants';
import MyStyles from '../screens/FavStyle';
import {ThemeUtils, Color} from '../constants/utils';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const styles = StyleSheet.create({
   flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
   header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailHeader: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    alignItems: 'center',
  },

  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  },

  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

const Screens = ({ navigation, style }) => {
    return (
       <Animated.View style={[{ flex: 1 , overflow:'hidden'},style]}>
        <Stack.Navigator
         screenOptions={{
             headerTransparent: true,
             headerTitle: null,
             headerBackImage: ()=>( <FontAwesome style={styles.detailHeader} name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />),
             
         }}
         >
            <Stack.Screen  name="Article" component={Article} />
            <Stack.Screen
              name="Detail" component={Detail} 
              options= {{
                headerRight: ()=>( <MaterialIcons style={styles.detailHeader} name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />),
              }}
              />
              <Stack.Screen
                name="Favorites" component={Favorites} 
                options= {{
                  headerShown: false,
              }}
              />
        </Stack.Navigator>
      </Animated.View>
      )
}; 

const CustomDrawerContent = props => {
    return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
           <Image source={require('../assets/avatar1.png')} resizeMode='center' style={{height: 70, width:70, borderRadius: 30}} />
           <Text white title marginTop='2x'>Itspooyan</Text>
           <Text white size={9} marginTop>ahmadpour.pouyan@gmail.com</Text>
        </Block>
        <Block>
        <DrawerItem
            label="Home"
            labelStyle={{color:'white', marginLeft: -16}}
            onPress={() => props.navigation.navigate('Article')}
            icon={() => <Icon name="home-outline" color="white" size={16} />}
        />
        {/* {/* <DrawerItem
            label="Messages"
            labelStyle={{color:'white', marginLeft: -16}}
            onPress={() => props.navigation.navigate('Messages')}
            icon={() => <Icon name="message1" color="white" size={16} />}
        /> */}
        <DrawerItem
            label="Favorites"
            labelStyle={{color:'white', marginLeft: -16}}
            onPress={() => props.navigation.navigate('Favorites')}
            icon={() => <Icon name="phone" color="white" size={16} />}
        /> 
        </Block>
        <Block flex={false} >
           <DrawerItem
            label="Logout"
            labelStyle={{color:'white', marginLeft: -16, fontWeight: 'bold'}}
            onPress={() => alert('Are you sure to logout?')}
            icon={() => <Iconf name="logout" color="white" size={16} />}
          />

        </Block>
       </Block>
    </DrawerContentScrollView>
    );
};

export default () => {
   const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
   return (  
    <LinearGradient  style={{ flex: 1 }} colors={['#3fada8', '#c0c0aa']}>
      <Drawer.Navigator
         drawerType="slide"
         overlayColor='transparent'
         initialRouteName="Article"
         drawerStyle={{width:'50%', backgroundColor:'transparent'}}
         drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'green',
          inactiveTintColor: 'green',
        }}
         sceneContainerStyle={{ backgroundColor: 'transparent' }}
         drawerContent={props => {
          setProgress(props.progress);
          return <CustomDrawerContent {...props} />;
        }}
         
        >
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
   );
};



 