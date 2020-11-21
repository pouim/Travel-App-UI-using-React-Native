import React, { Component } from 'react'
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Button,
  ImageBackground,
  Dimensions,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
/////////////////////////REDUX/////////////////////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, removeItem } from '../redux/Actions/cartActions';
import { fetchProducts, editIcon, editMe} from '../redux/Actions/destinationsAction';
import { editCartIcon, editCartMe } from '../redux/Actions/cartActions';
import { updateProducts } from '../redux/Actions/destinationsAction';
///////////////////////////////////////////////////////////////
import { Toast } from 'native-base';
import { Block, Input} from '../components';
import { SearchBar} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import  Icon from "react-native-vector-icons/FontAwesome";
import {theme} from '../constants';
import axios from 'axios';
import Fav from './Favorites';
import Weather from '../components/Weather'
import {mocks} from '../mocks'; 
const { width, height } = Dimensions.get('window');

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
  articles: {
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
    backgroundColor: theme.colors.white,
    width: width - (theme.sizes.padding * 4),
  },
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    // borderRadius: theme.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  },

  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base *2,
    backgroundColor: 'rgba(142,142,147,0.06)',
    borderColor: 'rgba(142,142,147,0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,

  },

  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',

  },

  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
});

class Articles extends Component {
   constructor(props) {
    super(props);
    this.state = {
      searchFocus: new Animated.Value(0.6),
      loading: false,
      error: null,
      mocks : [
   {
    id: 1,
    lat: "35.6892",
    lon: "51.3890",
    user: {
      name: 'Tehran',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Tehran, Iran',
    temperature: 34,
    title: 'Tehran',
    description: 'Tehran is the capital of Iran, in the north of the country. Its central Golestan Palace complex, with its ornate rooms and marble throne, was the seat of power of the Qajar dynasty. The National Jewelry Museum holds many of the Qajar monarchs’ jewels, while the National Museum of Iran has artifacts dating back to Paleolithic times. The Milad Tower offers panoramic views over the city.',
    rating: 4.3,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1554795896-b6d5b2eb3923?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    images: [
      {
        title: 'Azadi Tower',
        description: 'The Azadi Tower, formerly known as the Shahyad Tower, is a monument located on Azadi Square in Tehran, Iran. It is one of the landmarks of Tehran, marking the west entrance to the city, and is part of the Azadi Cultural Complex, which also includes an underground museum.',
        src: 'https://images.unsplash.com/photo-1554795896-b6d5b2eb3923?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        lat: 35.6892 ,
        lon: 51.3890,
      },

      {
        title: 'Milad Tower',
        description: 'Milad Tower, also known as the Tehran Tower, is a multi-purpose tower in Tehran, Iran. It is the sixth-tallest tower and the 24th-tallest freestanding structure in the world. It is located between Qarb Town and the district of Gisha, standing at 435 meters from the base to the tip of the antenna.',
        lat: "35.6892" ,
        lon: "51.3890",
        src: 'https://images.unsplash.com/photo-1524567492592-cee28084482e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      },

      {
        title: 'Tehran Grand Bazaar',
        lat: "35.6892" ,
        lon: "51.3890",
        description: 'Tehran Province, Tehran, District 12, Panzdah-e-Khordad St',
        src: 'https://images.unsplash.com/photo-1559405209-02c033f3f9b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
      },

      {
        title: 'Coffe',
        lat: "35.6892" ,
        lon: "51.3890",
        description: 'Tehran Coffe ',
        src: 'https://images.unsplash.com/photo-1554459875-75ecf5829494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=641&q=80',
      },
    ]
  },
  {
    id: 2,
    lat: "37.2682" ,
    lon: "49.5891",
    user: {
      name: 'Rasht',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: false,
    location: 'Rasht, Guilan',
    temperature: 34,
    title: 'Rasht',
    description: "Rasht is the capital city of Guilan Province, Iran. Also known as the 'City of Rain', it had a population of 639,951 as of the 24 October 2011 census and is the most densely populated city of Iran. Rasht is the largest city on Iran's Caspian Sea coast",
    rating: 4.6,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1568451458616-a7dc8b3c01bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1042&q=80',
    images: [
      {
        title: 'Gilan Rural Heritage Museum',
        lat: "37.2682" ,
        lon: "49.5891",
        description: 'Museum celebrating the traditions, customs, architecture & handicrafts of the local rural lifestyle.',
        src: 'https://lh5.googleusercontent.com/p/AF1QipM-lUfnbeQ3DaxemHU8ortb0DABQNEJD_ZlipGv=w407-h278-n-k-no',
      },

      {
        title: 'Saravan Forest Park',
        lat: "37.2682" ,
        lon: "49.5891",
        description: '2 rivers & a lake lie within this forest reserve that is a popular escape from the city.',
        src: 'https://images.unsplash.com/photo-1563761739882-53d952647dcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      },

      {
        title: 'Mohtasham Garden',
        lat: "37.2682" ,
        lon: "49.5891",
        description: 'Mohtasham garden, also known as the City Park, is the oldest park of Rasht. It is located in Hafez Street, next to the beautiful Gohar river, and',
        src: 'https://images.unsplash.com/photo-1582541702314-26ca9b436da1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=629&q=80',
      },

      {
        title: 'Rasht Grand Market',
        lat: "37.2682" ,
        lon: "49.5891",
        description: ' Rasht Grand Bazaar, Rasht Great Bazaar, Rasht Traditional ... Rasht Bazaar is a 24 hectare market and consists of a large square & a small',
        src: 'https://lh5.googleusercontent.com/p/AF1QipO5-PgTgSD9YB8I2sgVClOBKsfkt0dvjQYUIsyJ=w407-h278-n-k-no',
      },
    ]
  },
  {
    id: 3,
    lat: "26.5325" ,
    lon: "53.9868",
    user: {
      name: 'Kish',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Kish, Island in Iran',
    temperature: 34,
    title: 'Kish',
    description: "Kish is a 91.5-square-kilometre resort island in Bandar Lengeh County, Hormozgān Province off the southern coast of Iran in the Persian Gulf. Owing to its free trade zone status, the island is touted as a consumer's paradise, with numerous malls, shopping centres, tourist attractions, and resort hotels.",
    rating: 3.2,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1580315955828-38ff6c4c9491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1082&q=80',
    images: [
      {
        title: 'Gilan Rural Heritage Museum',
        lat: "37.2682" ,
        lon: "49.5891",
        description: 'Museum celebrating the traditions, customs, architecture & handicrafts of the local rural lifestyle.',
        src: 'https://lh5.googleusercontent.com/p/AF1QipM-lUfnbeQ3DaxemHU8ortb0DABQNEJD_ZlipGv=w407-h278-n-k-no',
      },

      {
        title: 'Saravan Forest Park',
        lat: "37.2682" ,
        lon: "49.5891",
        description: '2 rivers & a lake lie within this forest reserve that is a popular escape from the city.',
        src: 'https://images.unsplash.com/photo-1563761739882-53d952647dcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      },

      {
        title: 'Mohtasham Garden',
        lat: "37.2682" ,
        lon: "49.5891",
        description: 'Mohtasham garden, also known as the City Park, is the oldest park of Rasht. It is located in Hafez Street, next to the beautiful Gohar river, and',
        src: 'https://images.unsplash.com/photo-1582541702314-26ca9b436da1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=629&q=80',
      },

      {
        title: 'Rasht Grand Market',
        lat: "37.2682" ,
        lon: "49.5891",
        description: ' Rasht Grand Bazaar, Rasht Great Bazaar, Rasht Traditional ... Rasht Bazaar is a 24 hectare market and consists of a large square & a small',
        src: 'https://lh5.googleusercontent.com/p/AF1QipO5-PgTgSD9YB8I2sgVClOBKsfkt0dvjQYUIsyJ=w407-h278-n-k-no',
      },
    ]
  },
 {
    id: 4,
    lat: "38.0962" ,
    lon: "46.2738",
    user: {
      name: 'Tabriz',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    location: 'Tabriz, East Azerbaijan Province',
    temperature: 34,
    title: 'Tabriz',
    description: "Tabriz is the capital city of East Azerbaijan Province, in northwestern Iran. Tabriz Bazaar, once a major Silk Road market, is a sprawling brick-vaulted complex selling carpets, spices and jewelry. The rebuilt 15th-century Blue Mosque retains original turquoise mosaics on its entrance arch. Collections at the Azerbaijan Museum range from prehistoric finds to 20th-century sculptures by Iranian artist Ahad Hosseini.",
    rating: 5,
    reviews: 3212,
    preview: 'https://t0.gstatic.com/images?q=tbn:ANd9GcQaFzMUjHedF9lNSbrrSwK-n7AZIzm_2EpGgWJIHaifRQ-Dg0K5RVhdDfhsB2Li2TAj339TA5UdT4rdVw',
    images: [
      {
        title: 'Tabriz Grand Bazaar',
        lat: "38.0962" ,
        lon: "46.2738",
        description: "The Bazaar of Tabriz is a historical market situated in the city center of Tabriz, Iran. It is one of the oldest bazaars in the Middle East and the largest covered bazaar in the world. It is one of Iran's UNESCO World Heritage Sites.",
        src: 'https://t0.gstatic.com/images?q=tbn:ANd9GcQaFzMUjHedF9lNSbrrSwK-n7AZIzm_2EpGgWJIHaifRQ-Dg0K5RVhdDfhsB2Li2TAj339TA5UdT4rdVw',
      },

      {
        title: 'Blue Mosque',
        lat: "38.0962" ,
        lon: "46.2738",
        description: 'Sultan Ahmed Mosque, also known as the Blue Mosque, is a historic mosque located in Istanbul, Turkey. It remains a functioning mosque, while also attracting large numbers of tourist visitors. It was constructed between 1609 and 1616 during the rule of Ahmed',
        src: 'https://t3.gstatic.com/images?q=tbn:ANd9GcRnWtp2xtNruosfvsxZ0kUNmxAl0mGJ3CRDPVyCtcKo3tTXAMC7irkwuuUGtSmbWIixp_ZYA7STJIYYGQ',
      },

      {
        title: 'The Azerbaijan Museum',
        lat: "38.0962" ,
        lon: "46.2738",
        description: 'Azerbaijan Museum is the major archaeological and historical museum in Tabriz, in the northwest part of Iran. It was established on April 1958. The museum consists of three major halls, a side yard, office rooms and a library.',
        src: 'https://lh3.googleusercontent.com/proxy/3g-eRBMnoEqYsKgEXHWKCsCjUIx793hGFKEihgXBhrbYx-zw7XaqawJV7tU2MCFVfUtZsK7VrIcwDPUInWz0Kg4lsAIAK_ZLBNKftRAsTbLRZTGHg8ZL9mnnWyvkr6CTr8nh7KYqlgs8Sme4X-y-6FWdNCsfeJPJeBJj6In7W2eW=w407-h278-n-k-no',
      },

    ]
  },
]

    }      
 }
  // componentWillMount = () => {
  //   this.props.fetchProducts();
  // }

    
  // componentDidMount() {
  //   this.handleWish()
  // }
      


  scrollX = new Animated.Value(0);

  handleWish(item) {
       if (item.IconName=='bookmark-o') {
         this.addItem(item)
         this.props.editIcon(item)
         this.props.editCartIcon(item)
         
       }
       else {
         this.props.editMe(item)
         this.props.editCartMe(item)
         this.removeItem(item)
       }
   }
  
   renderHeader () {
     const { navigation } = this.props;
    return (
      <View style={[styles.flex, styles.row, styles.header,]}>
        <View>
          <Text style={{ color: theme.colors.caption }}>Search for place</Text>
          <Text style={{ fontSize: theme.sizes.font * 2 }}>Destination</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}><Text>Click me</Text></TouchableOpacity>
        </View>
        <View>
          <Image style={styles.avatar} source={require('../assets/avatar1.png')} />
        </View>
      </View>
    )
  };

   handleFocus(status) {
           Animated.timing(
             this.state.searchFocus,
             {
               toValue: status ? 0.8 : 0.6,
               duration: 150,
             }
           ).start();
      }

  searchFilterFunction = text => {
 
    this.setState({
      value: text,
    });

    const newData = this.state.mocks.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
     this.props.updateProducts(newData);
  };

   addItem = (product) => {
      this.props.addToCart(product);
   }

   removeItem = (product) => {
      this.props.removeItem(product);
   }

   
  

  renderFlatListHeader = () => {
    return (
      <SearchBar
        placeholder="Search for places..."
        lightTheme
        round
        containerStyle={{padding:0, backgroundColor: 'white', width: width /2 , marginLeft: 90, borderRadius: 50,margin: 2, height: 40}}
        inputContainerStyle={{backgroundColor: 'f4f4f4', height: 40 }}
        inputStyle={{fontSize: 12}}
        onChangeText={text => this.searchFilterFunction(text)}
        onFocus={this.handleFocus(true)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

   renderFlatListHead = () => {
     const { searchString, searchFocus } = this.state;
     const isEditing = searchFocus && searchString ;
    return (
      <Block animated middle  style={styles.search}>
          <Input
            placeholder= 'search'
            placeholderTextColor = {theme.colors.gray2} 
            style={styles.searchInput}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false)}
            onChangeText={text => this.searchFilterFunction(text)}
            value={this.state.value}
            onRightPress= {() => isEditing ? this.setState({searchString: null}) : null}
            rightStyle={styles.searchRight}
            rightLabel={
              <Icon
                name={isEditing ? 'close' : 'search'}
                size={theme.sizes.base / 1.6}
                color={theme.colors.gray2} 
                style={styles.searchIcon}
               />
            }
            />
        </Block>
    );
  };

  renderDots() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index -1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, { borderWidth: borderWidth } ]}
            />
          )
        })}
      </View>
    )
  };

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return (
      stars.map((_, index) => {
        const activeStar = Math.floor(rating) >= (index + 1);
        return (
          <FontAwesome
            name="star"
            key={`star-${index}`}
            size={theme.sizes.font}
            color={theme.colors[activeStar ? 'active' : 'gray']}
          />
        )
      })
    )
  };

  renderDestinations = () => {
    const { destinations } = this.props
    return (
      <View style={[ styles.column, styles.destinations ]}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow:'visible', height: 280 }}
          data={destinations}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }} }])}
          renderItem={({ item }) => this.renderDestination(item)}
          // ListHeaderComponent={this.renderFlatListHeader}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderDestination = item => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Detail', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: item.preview }}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            </View>
            <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.user.name}</Text>
              <Text style={{ color: theme.colors.white }}>
                <Octicons
                  name="location"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location}</Text>
              </Text>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end', }}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </ImageBackground>
          <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
            <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
              {item.title}
            </Text>
            <View style={[ styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
              <Text style={{ color: theme.colors.caption }}>
                {item.description.split('').slice(0, 50)}...
              </Text>
              <FontAwesome
                name="chevron-right"
                size={theme.sizes.font * 0.75}
                color={theme.colors.caption}
              />
            </View>
          </View>
      </TouchableOpacity>
    )
  };

  renderRecommended = () => {
    const { destinations } = this.props
    
    return (
      <View style={[styles.flex, styles.column, styles.recommended ]}>
        <View
          style={[
            styles.row,
            styles.recommendedHeader
          ]}
        >
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.caption }}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[ styles.shadow, { overflow: 'visible' }]}
            data={destinations}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderRecommendation(item, index)}
          />
        </View>
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    const { destinations, navigation } = this.props;
    const isLastItem = index === destinations.length - 1;
      
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Detail', { article: item })}>
      <View style={[
        styles.flex, styles.column, styles.recommendation, styles.shadow, 
        index === 0 ? { marginLeft: theme.sizes.margin } : null,
        isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
      ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
          <View style={[ styles.flex, styles.row, styles.recommendationOptions ]}>
            {/* <Text style={styles.recommendationTemp}> */}
              <Weather
                lat={item.lat}
                long={item.lon}
              />
            {/* </Text> */}
            <TouchableOpacity onPress={() => this.handleWish(item)}>
            <FontAwesome
              name={item.IconName}
              color={theme.colors.white}
              size={theme.sizes.font * 1.3}
            /></TouchableOpacity>
          </View>
        </View>
        <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5, }}>{item.title}</Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View style={[
            styles.row,
            { alignItems: 'center', justifyContent: 'space-between', marginTop: theme.sizes.margin }
          ]}>
            {this.renderRatings(item.rating)}
            <Text style={{ color: theme.colors.active }}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
   </TouchableOpacity>
    )
  }

  render() {
   const { destinations } = this.props
     
  
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
      >

        {this.renderHeader()}
        {this.renderFlatListHeader()}
        {this.renderDestinations()}
        {this.renderRecommended()}
       
      {/* {this.getWeather()} */}


      </ScrollView>
    )
  }
}



const mapStateToProps = (state) => ({
    destinations: state.destinations.items,
    cart: state.cart
})

// const mapDispatchToProps = dispatch => 
//   bindActionCreators(
//      {
//           addToCart: addToCart
//      },
//      dispatch
//   );

export default connect(mapStateToProps, {addToCart,removeItem,fetchProducts,updateProducts,editIcon,editMe,editCartIcon,editCartMe})(Articles);