import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ExpBar from '../../components/XPBar';

export default function ProfilePanelScreen() {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [expTrigger, setExpTrigger] = useState(false);
  const slideAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];
  const navigation = useNavigation();

  const openPanel = () => {
    setPanelVisible(true);
    setExpTrigger(false);
    setTimeout(() => setExpTrigger(true), 50);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setPanelVisible(false));
  };

  const menuItems = [
    {
      label: 'About',
      icon: require('../../assets/images/user-info1.png'),
      onPress: () => {
        closePanel();
        navigation.navigate('ProfileScreen');
      },
    },
    {
      label: 'Terms of use',
      icon: require('../../assets/images/legal-system1.png'),
    },
    {
      label: 'Reporter Guidelines',
      icon: require('../../assets/images/guideline1.png'),
    },
    {
      label: 'Assignments',
      icon: require('../../assets/images/assignment1.png'),
      onPress: () => {
        closePanel();
        navigation.navigate('AssignmentScreen');
      },
    },
    {
      label: 'Bookmarks',
      icon: require('../../assets/images/bookmark1.png'),
    },
    {
      label: 'Feedback',
      icon: require('../../assets/images/write-review1.png'),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#111827' }}>
      <Image source={require('../../assets/images/CameraLogo1.png')} style={styles.logo} />
      <TouchableOpacity onPress={openPanel} style={styles.menuBtn}>
        <Image source={require('../../assets/images/hamburger1.png')} style={styles.menuIconImg} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Gallery (Profile Panel Screen)</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/camera 1.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/movie 1.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/story 1.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>

      {isPanelVisible && (
        <>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closePanel} />
          <Animated.View style={[styles.sidePanel, { transform: [{ translateX: slideAnim }] }]}>
            <ScrollView>
              <TouchableOpacity onPress={closePanel} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.profileHeader}>
                <Image source={require('../../assets/images/profile1.png')} style={styles.avatar} />
                <View style={styles.nameRow}>
                  <Text style={styles.profileName}>{'<Profile_name>'}</Text>
                  <Image source={require('../../assets/images/edit1.png')} style={styles.editIcon} />
                </View>

                <View style={styles.progressBarContainer}>
                  <ExpBar level={0.6} triggerAnimation={expTrigger} currentXP={300} maxXP={500} />
                </View>

                <View style={styles.badgesRow}>
                  <View style={styles.badge}>
                    <Image source={require('../../assets/images/roadmap1.png')} style={styles.icon} />
                    <Text style={styles.badgeText}>69</Text>
                    <Text style={styles.badgeLabel}>Achievements</Text>
                  </View>
                  <View style={styles.badge}>
                    <Image source={require('../../assets/images/reward1.png')} style={styles.icon} />
                    <Text style={styles.badgeText}>420</Text>
                    <Text style={styles.badgeLabel}>V points</Text>
                  </View>
                  <View style={styles.badge}>
                    <Image source={require('../../assets/images/cake1.png')} style={styles.icon} />
                    <Text style={styles.badgeText}>1y</Text>
                    <Text style={styles.badgeLabel}>Vngler Age</Text>
                  </View>
                </View>
              </View>

              <View style={styles.menu}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={item.onPress ? item.onPress : undefined}
                  >
                    <Image source={item.icon} style={styles.menuIconImage} />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setShowLogoutPopup(true)}
            >
              <Image source={require('../../assets/images/logout1.png')} style={styles.logoutIcon} />
            </TouchableOpacity>

            {showLogoutPopup && (
              <View style={styles.logoutOverlay}>
                <View style={styles.logoutPopup}>
                  <Text style={styles.logoutText}>Are you sure you want to logout?</Text>
                  <View style={styles.logoutActions}>
                    <TouchableOpacity onPress={() => setShowLogoutPopup(false)} style={styles.cancelButton}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowLogoutPopup(false);
                        // insert actual logout logic here
                      }}
                      style={styles.confirmButton}
                    >
                      <Text style={styles.confirmText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 36, height: 36, position: 'absolute', top: 50, left: 20, zIndex: 10 },
  menuBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  menuIconImg: { width: 30, height: 30, tintColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    backgroundColor: '#1F2937',
  },
  bottomButton: { padding: 8 },
  bottomIcon: { width: 28, height: 28 },
  backdrop: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  sidePanel: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0,
    width: '50%',
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 40,
    zIndex: 1000,
  },
  closeBtn: { position: 'absolute', top: 10, right: 15, zIndex: 10 },
  closeText: { color: '#fff', fontSize: 24 },
  profileHeader: { alignItems: 'center', marginVertical: 20 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: 6 },
  editIcon: { width: 18, height: 18 },
  progressBarContainer: { marginTop: 10, alignItems: 'center' },
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
  logoutButton: { position: 'absolute', bottom: 30, right: 20 },
  logoutIcon: { width: 36, height: 36 },
  logoutOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  logoutPopup: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    maxWidth: 280,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  logoutActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#374151',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
  },
  cancelText: {
    color: '#D1D5DB',
    textAlign: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})