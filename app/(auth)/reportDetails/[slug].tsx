import { ActivityIndicator, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useApiService } from 'nearly-services';
import { Report } from '../(tabs)';
import { EmptyState, ProtectedPageWrapper } from 'nearly-components';

export default function ReportDetailsPage() {
  const params = useLocalSearchParams();
  const [report, setReport] = useState<Report>();
  const { fetchReportById } = useApiService();

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
          <>
            <Text>
              { report.title }
            </Text>
            <Text>
              { report.date }
            </Text>
          </>
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