import React, {Component} from 'react';
/*Components*/
import {Animated, View, StatusBar, Text, Image, Platform, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import MaterialAnimatedView from '../components/MaterialAnimation';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';
import Weather from '../components/Weather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/*utils*/
import styles from './FavStyle';
import Mystyles from './style';
import {ThemeUtils, Color} from '../constants/utils';
import {theme} from '../constants';
/*Data*/
import artistData from '../assets/data/SongData.json';
import coverImage from '../assets/images/cover.jpg';
import profileImage from '../assets/images/Wish.png';
/////////////////////////REDUX/////////////////////////////////
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/Actions/destinationsAction';
import { updateProducts } from '../redux/Actions/destinationsAction';
import { addToCart, removeItem } from '../redux/Actions/cartActions';
import { editMe } from '../redux/Actions/destinationsAction';
import { editCartIcon, editCartMe } from '../redux/Actions/cartActions';

const ARTIST_NAME = 'Bob Marley';

class Fav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    removeItem = (product) => {
      this.props.removeItem(product);
   }


    handleITem(item) { 
        this.props.editMe(item);
        this.props.editCartMe(item)
        this.removeItem(item);
    }

   renderRecommendation = (item, index) => {
    const { cart, navigation } = this.props;
    const isLastItem = index ===  cart.length - 1;
    const rightButtons = [{
        text: 'X',
        backgroundColor:'#eeeeee',
        underlayColor: 'transparent',
        onPress:() => this.handleITem(item),
    }];
    return (
  <Swipeout
   autoClose= {true}
   right={rightButtons}
   sensitivity={1}
   style={{backgroundColor:'transparent'}}
   >     
   <MaterialAnimatedView style={(cart.length == 1) ? styles.artistCardContainerStyleZero: styles.artistCardContainerStyle} key={index.toString()} index={index}>     
    <TouchableOpacity  activeOpacity={0.8} onPress={() => navigation.navigate('Detail', { article: item })}>
      <View style={[Mystyles.flex, Mystyles.column, Mystyles.recommendation, Mystyles.shadow]}>
        <View style={[Mystyles.flex, Mystyles.recommendationHeader]}>
          <Image style={[Mystyles.recommendationImage]} source={{ uri: item.preview }} />
          <View style={[ Mystyles.flex, Mystyles.row, Mystyles.recommendationOptions ]}>
            {/* <Text style={styles.recommendationTemp}> */}
              <Weather
                lat={item.lat}
                long={item.lon}
              />
            <TouchableOpacity onPress={() => this.handleITem(item)}>
            <FontAwesome
              name={item.IconName}
              color={theme.colors.white}
              size={theme.sizes.font * 1.25}
            /></TouchableOpacity>
          </View>
        </View>
        <View style={[Mystyles.flex, Mystyles.column, Mystyles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5, }}>{item.title}</Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View style={[
            Mystyles.row,
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
  </MaterialAnimatedView> 
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
  

    renderArtistCard = (index, item) => {
        const { cart } = this.props;
      
        return (
            <MaterialAnimatedView key={index.toString()} index={index}>
                <TouchableOpacity activeOpacity={0.8} style={styles.artistCardContainerStyle}
                                  onPress={() => this.openLink(item.songLink)}>
                    <Image source={{uri: item.preview}} style={styles.artistImage}/>
                    <View style={styles.cardTextContainer}>
                        <Text numberOfLines={1} style={styles.songTitleStyle}>{item.title}</Text>
                        <Text numberOfLines={1}>{item.albumName}</Text>
                    </View>
                </TouchableOpacity>
            </MaterialAnimatedView>
        )
    };

    //For header background color from transparent to header color
    _getHeaderBackgroundColor = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: ['rgba(0,0,0,0.0)', Color.HEADER_COLOR],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //For header image opacity
    _getHeaderImageOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image position from left
    _getImageLeftPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 80, 140],
            outputRange: [ThemeUtils.relativeWidth(30), ThemeUtils.relativeWidth(38), ThemeUtils.relativeWidth(10)],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image position from top
    _getImageTopPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeHeight(20), Platform.OS === 'ios' ? 8 : 10],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image width
    _getImageWidth = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image height
    _getImageHeight = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image border width
    _getImageBorderWidth = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [StyleSheet.hairlineWidth * 3, StyleSheet.hairlineWidth],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image border color
    _getImageBorderColor = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [Color.CARD_BG_COLOR, 'rgba(0,0,0,0.0)'],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //Song list container position from top
    _getListViewTopPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //header title opacity
    _getHeaderTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist name opacity
    _getNormalTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

    };

    render() {
        const { cart } = this.props;
       
        const headerBackgroundColor = this._getHeaderBackgroundColor();

        const headerImageOpacity = this._getHeaderImageOpacity();

        const profileImageLeft = this._getImageLeftPosition();

        const profileImageTop = this._getImageTopPosition();

        const profileImageWidth = this._getImageWidth();

        const profileImageHeight = this._getImageHeight();

        const profileImageBorderWidth = this._getImageBorderWidth();

        const profileImageBorderColor = this._getImageBorderColor();

        const listViewTop = this._getListViewTopPosition();

        const headerTitleOpacity = this._getHeaderTitleOpacity();

        const normalTitleOpacity = this._getNormalTitleOpacity();

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} backgroundColor={Color.STATUSBAR_COLOR}/>

                <Animated.Image
                    style={[styles.headerImageStyle, {
                        opacity: headerImageOpacity,

                    }]}
                    source={coverImage}/>

                <Animated.View style={[styles.headerStyle, {
                    backgroundColor: headerBackgroundColor,
                }]}>

                    <View style={styles.headerLeftIcon}>
                        <Icons name={"arrow-left"} size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
                    </View>

                    <View style={styles.headerRightIcon}>
                        <MaterialIcons name="more-horiz" size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
                    </View>

                    <Animated.Text
                        style={[styles.headerTitle, {
                            opacity: headerTitleOpacity
                        }]}>
                        <Text style={{color: 'black', fontSize: theme.sizes.font * 1.2, fontWeight: 'bold', fontStyle: 'italic'}}>Favorite Destinations</Text>
                    </Animated.Text>

                </Animated.View>

                <Animated.Image
                    style={
                        [styles.profileImage, {
                            borderWidth: profileImageBorderWidth,
                            borderColor: profileImageBorderColor,
                            borderRadius: (ThemeUtils.APPBAR_HEIGHT - 20) / 2,
                            height: profileImageHeight,
                            width: profileImageWidth,
                            transform: [
                                {translateY: profileImageTop},
                                {translateX: profileImageLeft}
                            ]
                        }]}
                    source={profileImage}
                />

                <Animated.ScrollView
                    overScrollMode={'never'}
                    style={{zIndex: 10, backgroundColor: 'transparent'}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {contentOffset: {y: this.state.scrollY}}
                            }
                        ]
                    )}>
                    <Animated.Text style={[
                        styles.profileTitle, {
                            opacity: normalTitleOpacity,
                        }
                    ]}
                    >
                        Destinations to go...
                    </Animated.Text>

                    <Animated.Text style={[
                        styles.songCountStyle, {
                            opacity: normalTitleOpacity,
                        }
                    ]}>
                        {`♡ #${cart.length} destinations`}
                    </Animated.Text>

                    <Animated.View style={{
                        transform: [{
                            translateY: listViewTop
                        }],
                    }}>
                        
                        {cart.map((item, index) => this.renderRecommendation(item, index))}
                    </Animated.View>

                </Animated.ScrollView>
            </View>
        );
    }
}



const mapStateToProps = (state) => ({
    cart: state.cart.cart
})

export default connect(mapStateToProps, {addToCart,removeItem,fetchProducts,updateProducts,editMe,editCartIcon,editCartMe})(Fav);