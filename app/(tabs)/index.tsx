import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ExpBar from '../../components/XPBar';

export default function ProfilePanelScreen() {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);
  const [emergencyTitle, setEmergencyTitle] = useState('');
  const [emergencyDescription, setEmergencyDescription] = useState('');
  const [expTrigger, setExpTrigger] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const availableQuests = [
    { id: 1, title: 'Night Market on Willow Avenue', date: 'Aug 6, 2024' },
    { id: 2, title: 'Green Oasis Garden Cleanup', date: 'Aug 7, 2024' },
    { id: 3, title: 'Civic Art: Murals for Change', date: 'Aug 9, 2024' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['red', 'orange', 'yellow', 'green', 'blue'],
  });

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
      label: 'Gallery',
      icon: require('../../assets/images/image-gallery.png'),
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
      {/* Top Logo and Menu */}
      <Image source={require('../../assets/images/CameraLogo1.png')} style={styles.logo} />
      <TouchableOpacity onPress={openPanel} style={styles.menuBtn}>
        <Image source={require('../../assets/images/hamburger1.png')} style={styles.menuIconImg} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Animated.Text style={[styles.welcomeTitle, { color: animatedColor }]}>
            Welcome to Vngle
          </Animated.Text>
          <Text style={styles.welcomeText}>
            Welcome to Vngle — a grassroots movement redefining how local stories are shared and who
            gets to tell them. In an age where traditional media often overlooks the everyday
            realities of underserved neighborhoods, we’re building a new kind of network — one where
            trust, inclusion, and community insight lead the way.{"\n\n"}
            Our mission is to bridge the gap in local coverage by empowering everyday people to
            become civic storytellers. Whether you're a student, activist, artist, or neighbor, your
            voice matters — and it deserves to be heard.{"\n\n"}
            This platform is more than an app — it’s a living blueprint for civic action. Here,
            you'll find quests that challenge you to step up, collaborate, and make a difference.
            {"\n\n"}You’re not just joining a platform — you’re joining a mission to restore balance
            to local storytelling and make civic reporting a shared responsibility.
          </Text>
        </View>

        {/* Quest Preview */}
        <View style={styles.questPreview}>
          <Text style={styles.previewTitle}>Available Quests</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {availableQuests.map((quest) => (
              <Animated.View key={quest.id} style={[styles.questCard, { opacity: fadeAnim }]}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDate}>{quest.date}</Text>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Emergency Button */}
<TouchableOpacity
  style={styles.emergencyButton}
  onPress={() => setShowEmergencyPopup(true)}
>
  <Image source={require('../../assets/images/emergency.png')} style={styles.emergencyIcon} />
</TouchableOpacity>

{/* Emergency Popup */}
{showEmergencyPopup && (
  <View style={styles.emergencyPopup}>
    <Text style={styles.emergencyLabel}>Emergency Title</Text>
    <TextInput
      placeholder="Enter a title"
      placeholderTextColor="#9CA3AF"
      value={emergencyTitle}
      onChangeText={setEmergencyTitle}
      style={styles.emergencyInput}
    />
    <Text style={styles.emergencyLabel}>Description</Text>
    <TextInput
      placeholder="Enter a description"
      placeholderTextColor="#9CA3AF"
      value={emergencyDescription}
      onChangeText={setEmergencyDescription}
      multiline
      numberOfLines={4}
      style={styles.emergencyDescriptionInput}
    />
    <View style={styles.emergencyActions}>
      <TouchableOpacity
        onPress={() => setShowEmergencyPopup(false)}
        style={styles.emergencyCancel}
      >
        <Text style={styles.emergencyCancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowEmergencyPopup(false);
          // Optionally handle submission here
        }}
        style={styles.emergencySubmit}
      >
        <Text style={styles.emergencySubmitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/home.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/Gallery.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Image source={require('../../assets/images/story 1.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>

      {/* Side Panel */}
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

            <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutPopup(true)}>
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
  scroll: { paddingBottom: 100 },

    welcomeSection: {
    paddingTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
    backgroundClip: 'text',
  },
  welcomeText: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: 20,
  },


  questPreview: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  previewTitle: {
    color: '#FBBF24',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  questCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    width: 220,
    borderColor: '#00E3FF',
    borderWidth: 1,
  },
  questTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  questDate: { color: '#9CA3AF', fontSize: 12, marginTop: 4 },

  logo: { width: 36, height: 36, position: 'absolute', top: 50, left: 20, zIndex: 10 },
  menuBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  menuIconImg: { width: 30, height: 30, tintColor: '#fff' },
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
    emergencyButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  emergencyIcon: {
    width: 60,
    height: 60,
  },
  emergencyPopup: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    padding: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  emergencyInput: {
    borderWidth: 1,
    borderColor: '#00E3FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: '#fff',
  },
  emergencyDescriptionInput: {
    borderWidth: 1,
    borderColor: '#00E3FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: '#fff',
    textAlignVertical: 'top',
    height: 100,
  },
  emergencyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyCancel: {
    backgroundColor: '#374151',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  emergencySubmit: {
    backgroundColor: '#FBBF24',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  emergencyCancelText: {
    color: '#D1D5DB',
    textAlign: 'center',
  },
  emergencySubmitText: {
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
  