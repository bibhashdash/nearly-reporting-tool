import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from 'nearly-components';
import { Colors } from 'nearly-constants';
import { useColorScheme } from 'nearly-utilities';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={ {
        tabBarStyle: {
          height: 100,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
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
        name="support"
        options={ {
          title: 'Support',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={ focused ? 'help-circle' : 'help-circle-outline' } color={ color } />
          ),
        } }
      />
    </Tabs>
  );
}
