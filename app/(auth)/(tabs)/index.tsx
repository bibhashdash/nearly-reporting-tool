import { Pressable, ScrollView, Text, View, RefreshControl } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, Portal, useTheme } from 'react-native-paper';
import { useAuthContext } from 'nearly-contexts';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../../utilities/firebase';
import { EmptyState, ReportCard } from 'nearly-components';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { router } from 'expo-router';
import { useApiService } from 'nearly-services';

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

export default function HomeScreen() {

  const [refreshing, setRefreshing] = useState(false);
  dayjs.extend(customParseFormat)

  const { colors } = useTheme();
  const { user, nearlyUser } = useAuthContext();
  const { deleteReportById } = useApiService();
  const [homeTab, setHomeTab] = useState<string>('latest');
  const [latestReports, setLatestReports] = useState<Array<Report>>([]);
  const [myReports, setMyReports] = useState<Array<Report>>([])
  const [visible, setVisible] = useState(false);
  const [modalStoryId, setModalStoryId] = useState<string>()
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
                      <ReportCard
                        showFullDescription={false}
                        onClickView={ () => router.push({
                          pathname: `reportDetails/${ item.id }`,
                        }) }
                        isMyOwn={ false }
                        item={ item }
                        key={ item.id }
                      />
                    ))
                  }
                </>
              ) : (
                <>
                  <EmptyState>
                    <Text>No Approved reports here. Why not create one?</Text>
                  </EmptyState>
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
                      <ReportCard
                        showFullDescription={false}
                        onClickView={ () => router.push({
                          pathname: `reportDetails/${ item.id }`,
                        }) }
                        onClickDelete={ () => {
                          setModalStoryId(item.id);
                          showModal();
                        } }
                        isMyOwn={ true }
                        key={ item.id }
                        item={ item }
                      />
                    ))
                  }
                </>
              ) : (
                <>
                  <EmptyState>
                    <Text>No reports here. Why not create one?</Text>
                  </EmptyState>
                </>
              )
            }
          </ScrollView>
      }
      <Portal>
        <Dialog visible={ visible } onDismiss={ hideModal }>
          <Dialog.Title>
            Delete Report
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="outlined" style={ {
              width: 100
            } } onPress={ () => {
              if (modalStoryId) {
                deleteReportById(modalStoryId as string);
                hideModal();
              }
            } }>Yes</Button>
            <Button style={ {
              width: 100
            } } mode="contained" onPress={ hideModal }>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}
