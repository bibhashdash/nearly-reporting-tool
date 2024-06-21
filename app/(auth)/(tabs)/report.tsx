import { Image, Pressable, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { database, storage } from '../../../utilities/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuthContext } from 'nearly-contexts';
import { Report } from './index';
import {
  doc,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  WithFieldValue
} from '@firebase/firestore';
import { router } from 'expo-router';
import { ProtectedPageWrapper } from 'nearly-components';

const reportConverter = {
  toFirestore(report: WithFieldValue<Report>): Report {
    return {
      date: report.date,
      imageSrc: report.imageSrc,
      location: report.location,
      isApproved: report.isApproved,
      description: report.description,
      id: report.id,
      userId: report.userId,
      title: report.title,
    } as Report
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Report {
    const data = snapshot.data(options) as Report;
    return {
      date: data.date,
      imageSrc: data.imageSrc,
      location: data.location,
      isApproved: data.isApproved,
      description: data.description,
      id: data.id,
      userId: data.userId,
      title: data.title,
    }
  }
}

export default function ReportScreen() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    setDate(new Date());
    setImage(null);
    setTitle('');
    setDescription('');
  }, [])
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
      return {
        uri: image
      }
    }
    return require('../../../assets/images/add_photo_alternate_24dp_FILL0_wght400_GRAD0_opsz24 (1).png')
  }

  const handleSubmit = async () => {
    if (image && title && description && date && user) {

      const imageRelativeUrl = `images/${ user?.uid }-${ date }-${ title.toLowerCase() }`

      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, imageRelativeUrl);
      uploadBytesResumable(imageRef, blob).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          uploadReportForApproval({
            title,
            userId: user.uid,
            imageSrc: url,
            date: date.toString(),
            description,
            location: 'Aire streeet',
            isApproved: false,
            id: `${ Date.now() }-${ user.uid }`,
          })
        })
      }).catch(error => console.error('Error', error))

    }
  }

  const uploadReportForApproval = (reportPayload: Report) => {
    const ref = doc(database, 'allReports', reportPayload.id).withConverter(reportConverter);
    setDoc(ref, reportPayload).then(() => router.replace('/(auth)/'))
  }

  return (
    <ProtectedPageWrapper>
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
    </ProtectedPageWrapper>
  );
}
