import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAuthContext } from 'nearly-contexts';
import { ProtectedPageWrapper, ReportCard } from 'nearly-components';
import { useEffect, useState } from 'react';
import { Report } from './index';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../../utilities/firebase';
import { router } from 'expo-router';

export default function AdminScreen() {
  const { nearlyUser } = useAuthContext();
  // const { fetchAllDraftReports } = useApiService();
  const [allDrafts, setAllDrafts] = useState<Array<Report>>([]);
  const fetchAllDraftReports = async () => {
    const tempArray: Array<Report> = [];

    const q = query(collection(database, 'allReports'), where('isApproved', '==', false));
    const snapshot = await getDocs(q);
    snapshot.forEach(item => tempArray.push(item.data() as Report));
    setAllDrafts(tempArray);
  }
  useEffect(() => {
    fetchAllDraftReports();
  }, [])
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
      </View>
      {
        allDrafts.map(item => (
          <ReportCard showFullDescription={false} onClickView={ () => router.push({
            pathname: `reportDetails/${ item.id }`,
          }) } key={ item.id } item={ item } isMyOwn={ false } />
        ))
      }
    </ProtectedPageWrapper>
  );
}
