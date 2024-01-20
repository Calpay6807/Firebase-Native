import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../thema/appColor';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Map, Notepad2} from 'iconsax-react-native';
import {NOTELİST} from '../../utils/routes';
import FlatActionButton from '../../components/ui/flatActionButton';
import CostumeMarker from '../../components/maps/costume-marker';
import firestore from '@react-native-firebase/firestore';
import CostumeAnimation from '../../components/ui/animation';

const {width, height} = Dimensions.get('window');

export default function HomeScreen(props) {
  const {navigation} = props;
  const [mapTypes, setMapType] = useState('hybrid');
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPosition, setCurrentPossition] = useState(null);
  const changeMapType = () => {
    try {
      if (mapTypes === 'standard') setMapType('hybrid');
      else setMapType('standard');
    } catch (error) {
      console.error('MapType değiştirilirken hata oluştu:', error);
    }
  };
  const getNotes = async () => {
    setVisible(true);
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        const fetchedNotes = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedNotes.push({
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            id: documentSnapshot.id,
            region: documentSnapshot.data().region,
          });
        });
        setNotes(fetchedNotes);
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setCurrentPossition(pos.coords);
        getNotes();
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      <View style={{zIndex: 999}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NOTELİST)}
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            zIndex: 999,
            width: width * 0.18,
            height: height * 0.08,
            backgroundColor: AppColors.WHITE,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <Notepad2 size={40} color={AppColors.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeMapType()}
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            zIndex: 99,
            width: width * 0.18,
            height: height * 0.08,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <Map size={40} color={AppColors.BLACK} />
        </TouchableOpacity>
      </View>
      {currentPosition && (
        <MapView
          mapType={mapTypes}
          zoomControlEnabled={false}
          initialRegion={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // iosda düzüngün çalışmadığı için kapalı
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}>
          {notes.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.region}
              title={marker.title}
              description={marker.description}>
              <CostumeMarker />
            </Marker>
          ))}
          {currentPosition && (
            <Marker
              coordinate={{
                latitude: currentPosition?.latitude,
                longitude: currentPosition?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <CostumeAnimation />
            </Marker>
          )}
        </MapView>
      )}

      <FlatActionButton currentPosition={currentPosition} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: width * 1,
    height: height * 1,
    ...StyleSheet.absoluteFillObject,
  },
});
