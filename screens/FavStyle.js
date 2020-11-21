import {StyleSheet} from 'react-native'
import {ThemeUtils, Color} from "../constants/utils";
const HEADER_IMAGE_HEIGHT = ThemeUtils.relativeHeight(30);
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    /*header style*/
    headerLeftIcon: {
        position: 'absolute',
        left: ThemeUtils.relativeWidth(2),
    },
    headerRightIcon: {
        position: 'absolute',
        right: ThemeUtils.relativeWidth(2),
    },
    headerStyle: {
        height: ThemeUtils.APPBAR_HEIGHT,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        opacity: 0.5,
    },
    headerTitle: {
        textAlign: 'center',
        justifyContent: 'center',
        color: Color.HEADER_TEXT_COLOR,
        fontSize: ThemeUtils.fontNormal
    },
    /*Top Image Style*/
    headerImageStyle: {
        height: HEADER_IMAGE_HEIGHT,
        width: '100%',
        top: 0,
        alignSelf: 'center',
        position: 'absolute'
    },
    /*profile image style*/
    profileImage: {
        position: 'absolute',
        zIndex: 100,
    },
    /*profile title style*/
    profileTitle: {
        position: 'absolute',
        zIndex: 100,
        textAlign: 'center',
        color: '#839192',
        fontWeight: 'bold',
        fontStyle: 'italic',
        top: ThemeUtils.relativeHeight(35),
        left: 0,
        right: 0,
        marginLeft: 8,
        textShadowColor: 'black',
        textShadowOffset: {width: 5, height: 10},
        textShadowRadius: 50,
        shadowOpacity: 0.05,
        fontSize: ThemeUtils.fontXLarge
    },
    /*song count text style*/
    songCountStyle: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: '400',
        top: ThemeUtils.relativeHeight(40),
        left: 0,
        right: 0,
        color: 'gray',
        fontSize: ThemeUtils.fontNormal,
    },
    artistCardContainerStyleZero: {
        backgroundColor: 'transparent',
        elevation: 5,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        },
        paddingBottom: 345,
        marginVertical: ThemeUtils.relativeWidth(1),
        marginHorizontal: ThemeUtils.relativeWidth(2),
        alignItems: 'center'
    },
    artistCardContainerStyle: {
        backgroundColor: 'transparent',
        elevation: 5,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 3
        },
        paddingBottom: 5,
        marginVertical: ThemeUtils.relativeWidth(1),
        marginHorizontal: ThemeUtils.relativeWidth(2),
        alignItems: 'center'
    },
    artistImage: {
        height: ThemeUtils.relativeWidth(15),
        width: ThemeUtils.relativeWidth(15),
        borderRadius: ThemeUtils.relativeWidth(7.5)
    },
    songTitleStyle: {
        fontSize: ThemeUtils.fontNormal,
        color: Color.BLACK
    },
    cardTextContainer: {
        flex: 1,
        margin: ThemeUtils.relativeWidth(3)
    },

})