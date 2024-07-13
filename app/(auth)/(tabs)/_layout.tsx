import { Tabs } from 'expo-router';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { useAuthContext, useModal } from 'nearly-contexts';
import { TabBarIcon } from 'nearly-components';
import { useEffect } from 'react';

export default function TabsLayout() {

  const { logout, fetchUserCustomDetails, user, nearlyUser } = useAuthContext();
  const { populateModalContent, dismissModal, modal, showModal } = useModal();
  useEffect(() => {
    if (user) {
      fetchUserCustomDetails(user.uid);
    }
  }, [])

  const { colors } = useTheme();
  return (
    <>
      {
        showModal && modal
      }
      <Tabs
        screenOptions={ {
          header: () =>
            <Appbar.Header style={ {
              backgroundColor: '#ffffff'
            } }>
              <Appbar.Content title="NEARLY" />
              <Appbar.Action
                icon="logout"
                size={ 36 }
                onPress={ () => {
                  populateModalContent({
                    title: 'Logout',
                    content: (
                      <>
                        <Text variant="bodyLarge">
                          This will log you out of NEARLY, are you sure?
                        </Text>
                      </>
                    ),
                    modalActions: {
                      confirm: {
                        label: 'Confirm',
                        onClick: () => {
                          logout();
                          dismissModal();
                        }
                      },
                      cancel: {
                        label: 'Cancel',
                        onClick: () => dismissModal(),
                      }
                    }
                  });
                } } />
            </Appbar.Header>,
          tabBarStyle: {
            height: 100,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarActiveTintColor: colors.primary,
        } }>
        <Tabs.Screen
          name="index"
          options={ {
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={ focused ? 'home' : 'home-outline' } color={ color } />
            ),
          } }
        />
        <Tabs.Screen
          name="report"
          options={ {
            title: 'Report',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={ focused ? 'document' : 'document-outline' } color={ color } />
            ),
          } }
        />
        <Tabs.Screen
          name="stats"
          options={ {
            title: 'Stats',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={ focused ? 'bar-chart' : 'bar-chart-outline' } color={ color } />
            ),
          } }
        />
        <Tabs.Screen
          name="admin"
          options={ {
            title: 'Admin',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={ focused ? 'help-circle' : 'help-circle-outline' } color={ color } />
            ),
          } }
        />
      </Tabs>
    </>

  )
}