import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAuthContext } from 'nearly-contexts';
import { EmptyState, ProtectedPageWrapper, ReportCard } from 'nearly-components';
import { useEffect, useState } from 'react';
import { Report } from './index';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../../utilities/firebase';
import { router } from 'expo-router';
import { useApiService } from 'nearly-services';

export default function AdminScreen() {
  const { nearlyUser } = useAuthContext();
  // const { fetchAllDraftReports } = useApiService();
  const [allDrafts, setAllDrafts] = useState<Array<Report>>([]);

  const { approveReportById } = useApiService();
  const fetchAllDraftReports = async () => {
    const tempArray: Array<Report> = [];

    const q = query(collection(database, 'allReports'), where('isApproved', '==', false));
    const snapshot = await getDocs(q);
    snapshot.forEach(item => tempArray.push(item.data() as Report));
    setAllDrafts(tempArray);
  }
  useEffect(() => {
    fetchAllDraftReports();
  }, []);

  const handleApproval = (id: string) => {
    approveReportById(id);
    fetchAllDraftReports();
  }
  return (
    <ProtectedPageWrapper>
      <View style={ {
        gap: 24,
        flex: 1,
        alignItems: 'center'
      } }>
        <View style={ {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: 20,
        } }>
          <Text style={ {
            fontWeight: 'bold'
          } } variant="titleLarge">Hi { nearlyUser?.displayName }!</Text>
          <Text style={ {
            fontStyle: 'italic',
            color: '#9b9b9b'
          } }>Role: { nearlyUser?.role }</Text>
        </View>
        <Text>
          Here you can find all the reports that need approval
        </Text>
      </View>
      {
        allDrafts.length > 0 ? (
          <>
            {
              allDrafts.map(item => (
                <ReportCard onClickApprove={ id => {
                  if (nearlyUser?.uid === item.id) handleApproval(id);
                //   else show a modal saying "Sorry you cannot approve your own reports!"
                } } showFullDescription={ false } onClickView={ () => router.push({
                  pathname: `reportDetails/${ item.id }`,
                }) } key={ item.id } item={ item } isMyOwn={ false } />
              ))
            }
          </>
        ) : (
          <EmptyState>
            <View style={ {
              flexDirection: 'column',
              gap: 12,
            } }>
              <Text>
                No reports need approval at the moment
              </Text>
              <Button onPress={ () => router.push('/(auth)/(tabs)/') } mode="contained">
                Back to home
              </Button>
            </View>
          </EmptyState>
        )
      }
    </ProtectedPageWrapper>
  );
}
