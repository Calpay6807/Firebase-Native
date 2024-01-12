// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDNOTE,
  EDİTNOTE,
  HOME,
  NOTEDETAİL,
  NOTELİST,
  SELECETCORDİNATE,
} from '../utils/routes';
import HomeScreen from '../screens/home/homeScreen';
import AddNote from '../note/addNote';
import NoteList from '../note/noteList';
import EditNote from '../note/editNote';
import NoteDetail from '../note/noteDetail';
import SelecetCordinate from '../screens/map/selectCordinate';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: 'Geri'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={HOME}
        component={HomeScreen}
      />
      <Stack.Screen name={ADDNOTE} component={AddNote} />
      <Stack.Screen name={NOTELİST} component={NoteList} />
      <Stack.Screen name={EDİTNOTE} component={EditNote} />
      <Stack.Screen name={NOTEDETAİL} component={NoteDetail} />

      <Stack.Screen
        // options={{headerShown: false}}
        name={SELECETCORDİNATE}
        component={SelecetCordinate}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
