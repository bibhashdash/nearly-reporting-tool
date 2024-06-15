import { Card, useTheme } from 'react-native-paper';
import { Text } from 'react-native';
import dayjs from 'dayjs';
import { Report } from '../../app/(auth)/(tabs)';

export const ReportCard = ({ item }: { item: Report }) => {
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
        subtitle={ item.location }
      />
      <Card.Cover
        style={ {
          backgroundColor: colors.background,
          padding: 12,
        } }
        source={ { uri: item.imageSrc } }
      />
      <Card.Content>
        <Text>
          { dayjs(item.date).format('DD/MM/YYYY') }
        </Text>
      </Card.Content>
    </Card>
  )
}