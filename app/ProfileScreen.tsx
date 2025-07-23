import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const xp = 300;
  const maxXp = 500;

  const xpProgress = useRef(new Animated.Value(0)).current;
  const xpValue = useRef(new Animated.Value(0)).current;
  const [displayedXp, setDisplayedXp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      xpProgress.setValue(0);
      xpValue.setValue(0);

      Animated.timing(xpProgress, {
        toValue: xp / maxXp,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();

      Animated.timing(xpValue, {
        toValue: xp,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();

      const listener = xpValue.addListener(({ value }) => {
        setDisplayedXp(Math.round(value));
      });

      return () => {
        xpValue.removeListener(listener);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Image source={require('../assets/images/left1.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.profileHeader}>
          <Image source={require('../assets/images/profile1.png')} style={styles.avatar} />
          <View style={styles.nameRow}>
            <Text style={styles.profileName}>{'<Profile_name>'}</Text>
            <Image source={require('../assets/images/edit1.png')} style={styles.editIcon} />
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: xpProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.xpText}>XP: {displayedXp} / {maxXp}</Text>
          </View>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Image source={require('../assets/images/roadmap1.png')} style={styles.icon} />
              <Text style={styles.badgeText}>69</Text>
              <Text style={styles.badgeLabel}>Achievements</Text>
            </View>
            <View style={styles.badge}>
              <Image source={require('../assets/images/reward1.png')} style={styles.icon} />
              <Text style={styles.badgeText}>420</Text>
              <Text style={styles.badgeLabel}>V points</Text>
            </View>
            <View style={styles.badge}>
              <Image source={require('../assets/images/cake1.png')} style={styles.icon} />
              <Text style={styles.badgeText}>1y</Text>
              <Text style={styles.badgeLabel}>Vngler Age</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {[
            { label: 'About', icon: require('../assets/images/user-info1.png') },
            { label: 'Terms of use', icon: require('../assets/images/legal-system1.png') },
            { label: 'Reporter Guidelines', icon: require('../assets/images/guideline1.png') },
            { label: 'Assignments', icon: require('../assets/images/assignment1.png') },
            { label: 'Bookmarks', icon: require('../assets/images/bookmark1.png') },
            { label: 'Feedback', icon: require('../assets/images/write-review1.png') },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Image source={item.icon} style={styles.menuIconImage} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image source={require('../assets/images/logout1.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Are you sure you want to <Text style={styles.logoutWord}>log out</Text>?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  // Add logout logic here
                }}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  scrollContainer: { paddingBottom: 100 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 1000 },
  backIcon: { width: 28, height: 28 },
  profileHeader: { alignItems: 'center', marginTop: 80, marginBottom: 20 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  editIcon: { width: 18, height: 18, marginLeft: 6 },
  progressBarContainer: { marginTop: 10, alignItems: 'center' },
  progressBarBackground: {
    backgroundColor: '#374151',
    width: 200,
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#EC4899',
    height: 10,
    borderRadius: 10,
  },
  xpText: { marginTop: 5, fontSize: 12, color: '#D1D5DB' },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  badge: { alignItems: 'center' },
  badgeText: { fontSize: 16, color: '#FBBF24', fontWeight: 'bold' },
  badgeLabel: { fontSize: 12, color: '#D1D5DB' },
  icon: { width: 30, height: 30, marginBottom: 4 },
  menu: { marginTop: 20, paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#374151',
    borderBottomWidth: 1,
  },
  menuIconImage: { width: 24, height: 24, marginRight: 10 },
  menuText: { color: '#3B82F6', fontSize: 16 },
  logoutButtonContainer: { position: 'absolute', bottom: 30, right: 20 },
  logoutIcon: { width: 36, height: 36 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    backgroundColor: '#111111',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '85%',
    alignItems: 'center',
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutWord: { color: '#EF4444', fontWeight: 'bold' },
  confirmButtons: { flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' },
  yesText: { color: '#22D3EE', fontSize: 16, fontWeight: 'bold', paddingHorizontal: 30 },
  noText: { color: '#E879F9', fontSize: 16, fontWeight: 'bold', paddingHorizontal: 30 },
});
