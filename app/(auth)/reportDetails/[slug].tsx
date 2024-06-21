import { ActivityIndicator, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useApiService } from 'nearly-services';
import { Report } from '../(tabs)';
import { EmptyState, ProtectedPageWrapper, ReportCard } from 'nearly-components';
import { useAuthContext } from 'nearly-contexts';

export default function ReportDetailsPage() {
  const params = useLocalSearchParams();
  const [report, setReport] = useState<Report>();
  const { fetchReportById } = useApiService();
  const { user } = useAuthContext();
  useEffect(() => {
    if (fetchReportById && params['slug']) {
      fetchReportById(params['slug'] as string).then(result => {
        if (result) {
          setReport(result)
        }
      })
    }
  }, [params.slug])

  return (
    <ProtectedPageWrapper>
      {
        report ? (
          <ReportCard showFullDescription={ true } isMyOwn={ user?.uid === report.userId } item={ report } />
        ) : (
          <EmptyState>
            <ActivityIndicator />
            <Text>
              Loading report...
            </Text>
          </EmptyState>
        )
      }
    </ProtectedPageWrapper>
  )
}