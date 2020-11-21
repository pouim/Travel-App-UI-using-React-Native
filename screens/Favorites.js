
import React, { Component } from 'react';
import {Alert, Text,Image,TouchableHighlight,  View, ScrollView , StyleSheet,Dimensions,TouchableOpacity, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native';
/////////////////////////REDUX/////////////////////////////////
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/Actions/destinationsAction';
import { updateProducts } from '../redux/Actions/destinationsAction';
import { addToCart, removeItem } from '../redux/Actions/cartActions';
import { editMe } from '../redux/Actions/destinationsAction';
/////////////////ANIMATION///////////////////////
import DraggableFlatList from "react-native-draggable-flatlist";
///////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {theme} from '../constants';
import Weather from '../components/Weather';
import { SwipeRow, Button, Icon } from 'native-base';
import Swipeout from 'react-native-swipeout';
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
    width: width / 1.2,
    marginHorizontal: width / 12,
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
    padding: theme.sizes.padding / 4,
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
    width: width /1.2,
    height: width /1.5,
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



class Favorites extends Component {
  constructor(props) {
      super(props);
      this.state= {
        activeRowKey: null
      }
      
  }



  removeItem = (product) => {
      this.props.removeItem(product);
   }
  
  renderHeader = () => {
    return (
      <View style={[styles.flex, styles.row, styles.header,]}>
        <View>
          <Text style={{ color: theme.colors.caption }}>Your</Text>
          <Text style={{ fontSize: theme.sizes.font * 1.8, fontWeight:'bold' }}>Favorite Destinations</Text>
        </View>
      </View>
    );
  };



  renderRecommended = () => {
     const { cart } = this.props;
     let cartData= []
     for (var i =0 ; i<= cart.length -1 ; i++) {
        cartData.push(cart[i][0]);
     }
    return (
      <View style={[styles.flex, styles.column, styles.recommended, {backgroundColor:'white'} ]}>
        <View style={[styles.column, styles.recommendedList, {backgroundColor:'white'}]}>


          <FlatList
            vertical
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[ styles.shadow, { overflow: 'visible' }]}
            data={cart}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderRecommendation(item, index)}
            activationDistance={15}
          />
        </View>
      </View>
    );
  };

  handleITem(item) { 
    this.props.editMe(item);
    this.removeItem(item);
  }

  renderRecommendation = (item, index) => {
    const { cart, navigation } = this.props;
    const isLastItem = index ===  cart.length - 1;

     let swipeBtns = [{
      text: '',
      backgroundColor: 'transparent',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.handleITem(item) }
    }];

    return (
  <Swipeout right={swipeBtns}
            autoClose='true'
            backgroundColor= 'transparent' 
            sensitivity={1}
            
            >
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Detail', { article: item })}>
      <View style={[styles.flex, styles.column, styles.recommendation, styles.shadow]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
          <View style={[ styles.flex, styles.row, styles.recommendationOptions ]}>
            {/* <Text style={styles.recommendationTemp}> */}
              <Weather
                lat={item.lat}
                long={item.lon}
              />
            <TouchableOpacity onPress={() => this.addItem(item)}>
            <FontAwesome
              name={item.IconName}
              color={theme.colors.white}
              size={theme.sizes.font * 1.25}
            /></TouchableOpacity>
          </View>
        </View>
        <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5, }}>{item.title}</Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View style={[
            styles.row,
            {alignItems: 'center' ,  justifyContent:'space-evenly', marginLeft:-10, marginTop: theme.sizes.margin }
          ]}>
            {this.renderRatings(item.rating)}
            <Text style={{ color: theme.colors.active, marginLeft: 60 }}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
   </TouchableOpacity>
</Swipeout>
    )
  }


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
  

  render() {
    const { cart } = this.props;
    return(
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.sizes.padding , backgroundColor:'white', }}
        style={{backgroundColor:'white'}}
      >  
          {this.renderHeader()}
          {this.renderRecommended()}
      </ScrollView>
    );
  }

}







const mapStateToProps = (state) => ({
    cart: state.cart.cart
})

export default connect(mapStateToProps, {addToCart,removeItem,fetchProducts,updateProducts,editMe})(Favorites);