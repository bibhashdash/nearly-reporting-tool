import { Card, Divider, Icon, useTheme } from 'react-native-paper';
import dayjs from 'dayjs';
import { Report } from '../../app/(auth)/(tabs)';
import { Pressable } from 'react-native';

export const ReportCard = ({ item, isMyOwn }: { item: Report, isMyOwn: boolean }) => {
  const { colors } = useTheme();
  return (
    <Card style={ {
      marginVertical: 12,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.backdrop
    } }>
      <Card.Title
        titleStyle={ {
          fontWeight: 'bold'
        } }
        titleVariant="titleLarge"
        title={ item.title }
        subtitle={ item.location + ', ' + dayjs(item.date).format('DD/MM/YYYY') }
        subtitleStyle={ {
          fontStyle: 'italic',
          color: '#777777'
        } }
      />
      <Card.Cover
        style={ {
          backgroundColor: colors.background,
          padding: 12,
        } }
        source={ { uri: item.imageSrc } }
      />
      <Divider />
      <Card.Actions style={ {
        gap: 10,
        padding: 12
      } }>
        <Pressable>
          <Icon
            size={ 24 }
            source={ isMyOwn ? 'clipboard-edit-outline' : 'thumb-up-outline' }
          />
        </Pressable>
        <Pressable>
          <Icon
            size={ 24 }
            source={ isMyOwn ? 'delete' : undefined }
          />
        </Pressable>
        <Pressable>
          <Icon
            size={ 24 }
            source="eye"
          />
        </Pressable>
      </Card.Actions>
    </Card>
  )
}