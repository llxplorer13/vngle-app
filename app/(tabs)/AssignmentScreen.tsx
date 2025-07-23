import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CompletedTab from '../CompletedTab';
import InProgressTab from '../InProgressTab';

type Quest = {
  id: number;
  title: string;
  date: string;
  description: string;
  status: 'Available' | 'In Progress' | 'Completed';
  label?: 'New!' | 'Message';
  active?: boolean;
};

export default function AssignmentScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'Available' | 'In Progress' | 'Completed'>('Available');
  const [selectedAssignment, setSelectedAssignment] = useState<Quest | null>(null);
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      title: 'Green Oasis: Community Gardens Sprout on Maple Street',
      date: 'August 6, 2024',
      description: 'Community members revived the area with a garden...',
      status: 'Available',
    },
    {
      id: 2,
      title: 'Night Market on Willow Avenue',
      date: 'August 6, 2024',
      description: 'Every Friday night, Willow Avenue transforms into a vibrant market...',
      status: 'Available',
      label: 'Message',
    },
    {
      id: 3,
      title: 'Green Oasis: Community Gardens Sprout on Maple Street',
      date: 'August 7, 2024',
      description: 'Community members revived the area with a garden...',
      status: 'Available',
      label: 'New!',
    },
  ]);

  const handleAccept = () => {
    if (selectedAssignment) {
      const updated: Quest[] = quests.map(q =>
        q.id === selectedAssignment.id
          ? { ...q, status: 'In Progress', active: false }
          : q
      );
      setQuests(updated);
      setSelectedAssignment(null);
    }
  };

  const filteredQuests = quests.filter(q => q.status === filter);

  return (
    <View style={styles.container}>
      {/* 👈 Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Image source={require('../../assets/images/left1.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.header}>Assignments</Text>

      <View style={styles.tabRow}>
        {['Available', 'In Progress', 'Completed'].map(tab => (
          <View key={tab} style={{ marginHorizontal: 4 }}>
            <TouchableOpacity onPress={() => setFilter(tab as any)}>
              <Text
                style={[
                  styles.tab,
                  filter === tab && (
                    tab === 'Available'
                      ? styles.availableTab
                      : tab === 'In Progress'
                      ? styles.inProgressTab
                      : styles.completedTab
                  ),
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {filter === 'In Progress' ? (
        <InProgressTab quests={quests} setQuests={setQuests} />
      ) : filter === 'Completed' ? (
        <CompletedTab quests={quests} />
      ) : (
        <ScrollView style={styles.scroll}>
          {filteredQuests.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.cardDate}>{item.date}</Text>
                {item.label === 'New!' && <Text style={styles.newLabel}>  New!</Text>}
              </View>
              <TouchableOpacity
                style={styles.arrowBtn}
                onPress={() => setSelectedAssignment(item)}
              >
                {item.label === 'Message' && (
                  <Image
                    source={require('../../assets/images/new-notif 1.png')}
                    style={styles.notifIcon}
                  />
                )}
                <Image
                  source={require('../../assets/images/forwad1.png')}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={!!selectedAssignment}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAssignment(null)}
      >
        <View style={styles.modalBox}>
          {selectedAssignment && (
            <>
              <Text style={styles.modalDate}>{selectedAssignment.date}</Text>
              <Text style={styles.modalTitle}>{selectedAssignment.title}</Text>
              <Text style={styles.modalDesc}>{selectedAssignment.description}</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleAccept}>
                  <Text style={styles.acceptBtn}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedAssignment(null)}>
                  <Text style={styles.cancelBtn}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 1000 },
  backIcon: { width: 28, height: 28 },
  header: {
    color: '#00E3FF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    marginTop: 40,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tab: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1.5,
    fontWeight: '600',
    color: '#aaa',
    textAlign: 'center',
  },
  availableTab: {
    color: '#00E3FF',
    borderColor: '#00E3FF',
    backgroundColor: '#002F3F',
  },
  inProgressTab: {
    color: '#FF2AA3',
    borderColor: '#FF2AA3',
    backgroundColor: '#3F002F',
  },
  completedTab: {
    color: '#FDC300',
    borderColor: '#FDC300',
    backgroundColor: '#3F2F00',
  },
  scroll: { flex: 1 },
  card: {
    backgroundColor: '#111',
    borderColor: '#00BFFF',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  cardTitle: { color: '#fff', fontSize: 14, marginBottom: 4 },
  cardDate: { color: '#00BFFF', fontSize: 12 },
  newLabel: { color: '#FF69B4', fontSize: 12 },
  arrowBtn: {
    position: 'absolute',
    right: 16,
    top: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: { width: 30, height: 30 },
  notifIcon: { width: 18, height: 18, marginRight: 4 },
  modalBox: {
    margin: 40,
    backgroundColor: '#111',
    borderColor: '#FF00FF',
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  modalDate: { color: '#00BFFF', fontSize: 14, marginBottom: 8 },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  modalDesc: { color: '#ccc', fontSize: 14, marginBottom: 20 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#FF00FF',
    paddingTop: 10,
  },
  acceptBtn: { color: '#00BFFF', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { color: '#FF4444', fontWeight: 'bold', fontSize: 16 },
});
