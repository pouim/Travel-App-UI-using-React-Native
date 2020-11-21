import { FETCH_PRODUCTS, UPDATE_PRODUCTS, EDIT_ICON, EDIT_ME } from '../Types/types';

const initialState = {
    items : [
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
    IconName: 'bookmark-o',
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
    IconName: 'bookmark-o',
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
    IconName: 'bookmark-o',
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
    IconName: 'bookmark-o',
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
};

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                items:action.payload
            }

        case UPDATE_PRODUCTS:
            return {
                ...state,
                items:action.payload
            } 
        case EDIT_ICON: 
          return {
                ...state,
                items: state.items.map(item =>
                item.id === action.payload.id
                    ? {...item, IconName: 'bookmark'}
                    : item,
        ),
     }     
        case EDIT_ME: 
          return {
                ...state,
                items: state.items.map(item =>
                item.id === action.payload.id
                    ? {...item, IconName: 'bookmark-o'}
                    : item,
        ),
     }     

        default:
            return state
    }
}