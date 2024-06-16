import { doc, getDoc, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from '@firebase/firestore';
import { Report } from '../app/(auth)/(tabs)';
import { database } from '../utilities/firebase';

const reportConverter = {
  toFirestore(report: WithFieldValue<Report>): Report {
    return {
      date: report.date,
      imageSrc: report.imageSrc,
      location: report.location,
      isApproved: report.isApproved,
      description: report.description,
      id: report.id,
      userId: report.userId,
      title: report.title,
    } as Report
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Report {
    const data = snapshot.data(options) as Report;
    return {
      date: data.date,
      imageSrc: data.imageSrc,
      location: data.location,
      isApproved: data.isApproved,
      description: data.description,
      id: data.id,
      userId: data.userId,
      title: data.title,
    }
  }
}

export interface APIReturnProps {
  fetchReportById?: (id: string) => Promise<Report | undefined>,
  fetchAuthenticatedUserReports?: (userId: string) => Report | undefined,
  fetchAllApprovedReports?: () => void,
}
export function useApiService(): APIReturnProps {
  const fetchReportById = async (reportId: string): Promise<Report | undefined> => {
    const docRef = doc(database, 'allReports', reportId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data())
      return docSnap.data() as Report
    }
  }
  return {
    fetchReportById,
  }
}