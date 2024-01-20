import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoteCard from '../components/notes/noteCard';
import FlatActionButton from '../components/ui/flatActionButton';
import firestore from '@react-native-firebase/firestore';

const NoteList = props => {
  const [notes, setNotes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
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
            descriptions: documentSnapshot.data().descriptions,
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
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={visible} onRefresh={getNotes} />
            }
            data={notes}
            renderItem={({item}) => <NoteCard item={item} />}
            keyExtractor={item => item.title}
          />
        )}
        <FlatActionButton {...props} />
      </View>
    </SafeAreaView>
  );
};

export default NoteList;

const styles = StyleSheet.create({});
