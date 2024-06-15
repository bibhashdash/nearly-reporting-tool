import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useApiService } from 'nearly-services';
import { Report } from '../(auth)/(tabs)';
import { EmptyState } from 'nearly-components';

export default function ReportDetailsPage() {
  const params = useLocalSearchParams();
  const [report, setReport] = useState<Report | undefined>();
  const { fetchReportById } = useApiService();

  useEffect(() => {
    if (fetchReportById && params['slug']) {
      fetchReportById(params['slug'] as string).then(result => setReport(result))
    }
  }, [params])

  return (
    <View>
      {
        report ? (
          <Text>
            This is a report details page with id { report?.id }
          </Text>
        ) : (
          <EmptyState>
            <ActivityIndicator />
            <Text>
              Loading report...
            </Text>
          </EmptyState>
        )
      }
    </View>
  )
}