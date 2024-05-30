import { Pressable, ScrollView, View } from 'react-native';
import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function TabTwoScreen() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const { colors } = useTheme();

  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }
    >
      <View>
        <Pressable style={ {
          alignItems: 'center'
        } }>
          <Icon size={ 64 } source={ require('../../assets/images/add_photo_alternate_24dp_FILL0_wght400_GRAD0_opsz24 (1).png') } />
          <Text>
            Add Photo
          </Text>
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
          <Button
            onPress={ () => {
              DateTimePickerAndroid.open({
                value: date,
                onChange: (date, selectedDate) => selectedDate && setDate(selectedDate),
                mode: 'date',
              })
            } }
            mode="outlined"
            labelStyle={ {
              color: colors.tertiary
            } }
            style={ {
            borderColor: colors.tertiary,
              borderWidth: 2,
            alignSelf: 'flex-start',
          } }>
            Date of Near-Miss
          </Button>
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
            mode="contained">
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
