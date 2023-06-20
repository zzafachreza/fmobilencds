import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';


const MyList = ({ img, judul, desc, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginTop: 10,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      // padding: 10,
      flexDirection: 'row',
      overflow: 'hidden',
      // alignItems: 'center',
      borderRadius: 10,
    }}>
      <View style={{
        padding: 5,
      }}>
        <Image source={img} style={{
          width: windowWidth / 4.5,
          height: windowWidth / 4.5,
          resizeMode: 'contain'
        }} />
      </View>
      <View style={{
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center'
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: 20,
        }}>{judul}</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: 15,
        }}>{desc}</Text>
      </View>
      <View style={{
        backgroundColor: colors.primary,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',


      }}>
        <Icon type='ionicon' size={25} color={colors.white} name='chevron-forward-outline' />
      </View>
    </TouchableOpacity>

  )
}

export default function Home({ navigation }) {


  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    });


  }




  return (






    <ImageBackground
      // source={require('../../assets/home.png')} 
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}>
      <View style={{
        padding: 10,
      }}>
        <MyHeader menu={`Halo, ${user.nama_lengkap} !`} />
        {/* info user */}

      </View>
      <MyCarouser />

      {/* menu utama */}
      <View style={{
        paddingHorizontal: 10,
        flex: 1,
      }}>


        <MyList onPress={() => navigation.navigate('Nelayan', user)} img={require('../../assets/A1.png')} judul="Biodata Nelayan" desc="Input biodata nelayan yang belum terdaftar" />
        <MyList onPress={() => navigation.navigate('AAInput', user)} img={require('../../assets/A2.png')} judul="Skrining" desc="input skring nelayan IMT, TD, Pemeriksaan Laboratorium & kondisi kesehatan" />
        {/* <MyList img={require('../../assets/A3.png')} judul="Skrining II" desc="input skring nelayan kondisi kesehatan saat ini" /> */}
        <MyList img={require('../../assets/A4.png')} judul="Juknis Pengisian" desc="Pedoman cara pengisian informasi data" />


      </View>
    </ImageBackground>




  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});