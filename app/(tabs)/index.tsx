import { Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import {Card, useTheme} from 'react-native-paper';

export interface Report {
  id: number,
  date: string,
  description: string,
  location: string,
  imageSrc: string,
}

const latestDummyData: Array<Report> = [
  {
    id: 1,
    date: '2024-05-20',
    description: 'Car accident on Elm Street',
    location: 'Elm Street, Goole',
    imageSrc: 'https://example.com/report1.jpg',
  },
  {
    id: 2,
    date: '2024-05-19',
    description: 'Fire incident at local bakery',
    location: 'High Street, Goole',
    imageSrc: 'https://example.com/report2.jpg',
  },
  {
    id: 3,
    date: '2024-05-18',
    description: 'Missing person: Jane Doe',
    location: 'Riverside Park, Goole',
    imageSrc: 'https://example.com/report3.jpg',
  },
  {
    id: 4,
    date: '2024-05-17',
    description: 'Vandalism at community center',
    location: 'Community Center, Goole',
    imageSrc: 'https://example.com/report4.jpg',
  },
  {
    id: 5,
    date: '2024-05-16',
    description: 'Suspicious package near train station',
    location: 'Goole Train Station',
    imageSrc: 'https://example.com/report5.jpg',
  },
  {
    id: 6,
    date: '2024-05-15',
    description: 'Flooded road on Bridge Street',
    location: 'Bridge Street, Goole',
    imageSrc: 'https://example.com/report6.jpg',
  },
  {
    id: 7,
    date: '2024-05-14',
    description: 'Power outage in town',
    location: 'Various areas in Goole',
    imageSrc: 'https://example.com/report7.jpg',
  },
  {
    id: 8,
    date: '2024-05-13',
    description: 'Tree fallen on Main Road',
    location: 'Main Road, Goole',
    imageSrc: 'https://example.com/report8.jpg',
  },
  {
    id: 9,
    date: '2024-05-12',
    description: 'Gas leak near Market Square',
    location: 'Market Square, Goole',
    imageSrc: 'https://example.com/report9.jpg',
  },
  {
    id: 10,
    date: '2024-05-11',
    description: 'Street fight outside pub',
    location: 'Pub on King Street, Goole',
    imageSrc: 'https://example.com/report10.jpg',
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();

  const [homeTab, setHomeTab] = useState<string>('latest');
  const [latestReports, setLatestReports] = useState<Array<Report>>(latestDummyData);
  const [myReports, setMyReports] = useState<Array<Report>>([{
    id: 1,
    date: '2024-05-20',
    description: 'Car accident on Elm Street',
    location: 'Elm Street, Goole',
    imageSrc: 'https://example.com/report1.jpg',
  },])

  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }>
      <View style={ {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
      } }>
        <Pressable onPress={ () => setHomeTab('latest') }>
          <Text style={ {
            fontSize: 20,
            fontWeight: 'bold',
            color: homeTab === 'latest' ? colors.primary : colors.tertiary,
            textDecorationLine: homeTab === 'latest' ? 'underline' : 'none',
          } }>
            Latest
          </Text>
        </Pressable>
        <Pressable onPress={ () => setHomeTab('my-reports') }>
          <Text style={ {
            fontSize: 20,
            fontWeight: 'bold',
            color: homeTab === 'my-reports' ? colors.primary : colors.tertiary,
            textDecorationLine: homeTab === 'my-reports' ? 'underline' : 'none',
          } }>
            My Reports
          </Text>
        </Pressable>
      </View>

      {
        homeTab === 'latest' ? (
          <ScrollView contentContainerStyle={ {
            gap: 20,
            marginBottom: 100,
            marginTop: 20,
          } }>
            {
              latestReports.map(item => (
                <Card key={ item.id }>
                  <Card.Title title={ item.date } subtitle={ item.location } />
                  <Card.Cover source={ { uri: item.imageSrc } } />
                  <Card.Content>
                    <Text>
                      { item.description }
                    </Text>
                  </Card.Content>
                </Card>
              ))
            }
          </ScrollView>
        ) :
          <ScrollView style={ {
            gap: 20,
            marginBottom: 100,
            marginTop: 20,
          } }>
            {
              myReports.map(item => (
                <Card key={ item.id }>
                  <Card.Title title={ item.date } subtitle={ item.location } />
                  <Card.Cover source={ { uri: item.imageSrc } } />
                  <Card.Content>
                    <Text>
                      { item.description }
                    </Text>
                  </Card.Content>
                </Card>
              ))
            }
          </ScrollView>
      }
    </ScrollView>
  );
}
