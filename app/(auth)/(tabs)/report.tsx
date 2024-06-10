import { Image, Pressable, ScrollView, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../../utilities/firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { useAuthContext } from 'nearly-contexts';

export default function ReportScreen() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuthContext();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getImageSource = () => {
    if (image) {
      console.log(image);
      return {
        uri: image
      }
    }
    return require('../../../assets/images/add_photo_alternate_24dp_FILL0_wght400_GRAD0_opsz24 (1).png')
  }

  const handleSubmit = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${ user?.uid }-${ date }-${ title.toLowerCase() }`);
      uploadBytesResumable(imageRef, blob).then(snapshot => {
        console.log(snapshot.metadata);
      }).catch(error => console.error('Error', error))
    }
  }

  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }
    >
      <View style={ {
        width: '100%',
        height: 200,
        justifyContent: 'center'
      } }>
        <Pressable
          onPress={ () => pickImage() }
          style={ {
          alignItems: 'center'
        } }>
          <Image width={ 300 } height={ 200 } source={ getImageSource() } />
          {
            !image && (
              <Text>
                Add Photo
              </Text>
            )
          }
        </Pressable>
      </View>
      <View style={ {
        gap: 24,
        flex: 1,
      } }>
        <View>
          <Text>Title</Text>
          <TextInput
            value={ title }
            onChangeText={ text => setTitle(text) }
          />
        </View>
        <View>
          <Text>Description</Text>
          <TextInput
            style={ {
              height: 200
            } }
            multiline={ true }
            value={ description }
            onChangeText={ text => setDescription(text) }
          />
        </View>
        <View style={ {
          gap: 8,
          flexDirection: 'row',
          alignItems: 'center'
        } }>
          <IconButton
            size={ 36 }
            mode="outlined"
            icon="calendar"
            onPress={ () => {
              DateTimePickerAndroid.open({
                value: date,
                onChange: (date, selectedDate) => selectedDate && setDate(selectedDate),
                mode: 'date',
              })
            } }
          />
          <Text variant="bodyLarge" style={ {
            fontWeight: 'bold'
          } }>
            { date ? (
              <>
                { date.toLocaleDateString() }
              </>
            ) : <>No date specified</> }
          </Text>
        </View>

        <View style={ {
          alignItems: 'center',
        } }>
          <Button
            style={ {
              paddingHorizontal: 18,
            } }
            onPress={ handleSubmit }
            mode="contained">
            Submit for Review
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}