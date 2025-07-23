import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../../.expo/types/navigation';
import { useSidePanel } from './SidePanelContext';

export default function SideProfilePanel() {
  const { isOpen, togglePanel } = useSidePanel();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!isOpen) return null;

  const handleNavigate = <T extends keyof RootStackParamList>(screen: T) => {
    togglePanel();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.panel}>
      <TouchableOpacity onPress={togglePanel} style={styles.closeBtn}>
        <Text style={styles.closeText}>⨉</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://api.dicebear.com/7.x/notionists/svg?seed=123' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{'<Profile_name>'}</Text>

      <View style={styles.badgesRow}>
        <Text style={styles.badge}>🏆 63</Text>
        <Text style={styles.badge}>✨ 420</Text>
        <Text style={styles.badge}>📅 1y</Text>
      </View>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => handleNavigate('ProfileScreen')}>
          <Text style={styles.linkText}>• About</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>• Terms of Use</Text>
        <Text style={styles.linkText}>• Reporter Guidelines</Text>
        <TouchableOpacity onPress={() => handleNavigate('AssignmentScreen')}>
          <Text style={styles.linkText}>• Assignments</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>• Bookmarks</Text>
        <Text style={styles.linkText}>• Feedback</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '80%',
    backgroundColor: '#111827',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: -50,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  badge: {
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#1F2937',
    padding: 6,
    borderRadius: 8,
  },
  links: {
    marginTop: 20,
  },
  linkText: {
    color: '#F9FAFB',
    fontSize: 14,
    paddingVertical: 6,
  },
});
