import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = ['Available', 'In Progress', 'Completed'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
          <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  tab: { fontSize: 14, color: '#6b7280', padding: 6 },
  activeTab: {
    color: '#111827',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
  },
});
