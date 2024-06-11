import { Pressable, ScrollView, Text, View, RefreshControl } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { useAuthContext } from 'nearly-contexts';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../../utilities/firebase';
import { EmptyState } from '../../../components/layout';

export interface Report {
  id: string,
  title: string,
  date: string,
  description: string,
  location: string,
  imageSrc: string,
  isApproved: boolean,
  userId: string,
}

const latestDummyData: Array<Report> = [];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { colors } = useTheme();
  const { user } = useAuthContext();
  const [homeTab, setHomeTab] = useState<string>('latest');
  const [latestReports, setLatestReports] = useState<Array<Report>>(latestDummyData);
  const [myReports, setMyReports] = useState<Array<Report>>([])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const fetchMyDocuments = async () => {
    if (user) {
      const tempArray: Array<Report> = [];
      const q = query(collection(database, 'allReports'), where('userId', '==', user.uid))
      const snapshot = await getDocs(q);
      snapshot.forEach(item => tempArray.push(item.data() as Report))
      setMyReports(tempArray);
    }
  }

  const fetchAllDocuments = async () => {
    if (user) {
      const tempArray: Array<Report> = [];
      const q = query(collection(database, 'allReports'), where('isApproved', '==', true));
      const snapshot = await getDocs(q);
      snapshot.forEach(item => tempArray.push(item.data() as Report));
      setLatestReports(tempArray);
    }
  }

  useEffect(() => {
    fetchMyDocuments();
    fetchAllDocuments();
  }, [homeTab])

  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }
    refreshControl={
      <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
    }
    >
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
              latestReports.length > 0 ? (
                <>
                  {
                    latestReports.map(item => (
                      <Card style={ {
                        marginVertical: 12,
                      } } key={ item.id }>
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
                </>
              ) : (
                <>
                  <EmptyState />
                </>
              )
            }
          </ScrollView>
        ) :
          <ScrollView style={ {
            gap: 20,
            marginBottom: 100,
            marginTop: 20,
          } }>
            {
              myReports.length > 0 ? (
                <>
                  {
                    myReports.map(item => (
                      <View style={ {
                        marginVertical: 12,
                      } } key={ item.id }>
                        <Card>
                          <Card.Title title={ item.title } subtitle={ item.location } />
                          <Card.Cover source={ { uri: item.imageSrc } } />
                          <Card.Content>
                            <Text>
                              { item.description }
                            </Text>
                          </Card.Content>
                        </Card>
                      </View>
                    ))
                  }
                </>
              ) : (
                <>
                  <EmptyState />
                </>
              )
            }
          </ScrollView>
      }
    </ScrollView>
  );
}
