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

type Quest = {
  id: number;
  title: string;
  date: string;
  description: string;
  status: 'Available' | 'In Progress' | 'Completed';
  label?: 'New!' | 'Message';
  active?: boolean;
  xp?: number; // ✅ Added XP field
};

type Props = {
  quests: Quest[];
};

export default function CompletedTab({ quests }: Props) {
  const completed = quests.filter(q => q.status === 'Completed');
  const [selected, setSelected] = useState<Quest | null>(null);

  return (
    <ScrollView style={styles.container}>
      {completed.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.text}>No assignments completed yet.</Text>
        </View>
      ) : (
        completed.map(q => (
          <TouchableOpacity key={q.id} onPress={() => setSelected(q)} style={styles.card}>
            <View>
              <Text style={styles.text}>{q.title}</Text>
              <Text style={styles.date}>{q.date}</Text>
            </View>
            <View style={styles.xpBox}>
              <Text style={styles.xpText}>{q.xp ?? 0}</Text>
              <Image
                source={require('../assets/images/reward1.png')}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        ))
      )}

      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalBox}>
          {selected && (
            <>
              <Text style={styles.modalDate}>{selected.date}</Text>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              <Text style={styles.modalDesc}>{selected.description}</Text>
              <Text style={styles.assignmentId}>Assignment ID:</Text>
              <Text style={styles.assignmentValue}>{selected.id}</Text>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={styles.closeBtn}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    marginHorizontal: 12,
    marginTop: 16,
    backgroundColor: '#111',
    borderColor: '#FDC300',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { color: '#FDC300', fontSize: 14, fontWeight: '600' },
  date: { color: '#FDC300', fontSize: 12, marginTop: 4 },
  arrowIcon: {
    width: 22,
    height: 22,
    tintColor: '#FDC300',
    marginLeft: 6,
  },
  xpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FDC300',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#000',
  },
  xpText: {
    color: '#FDC300',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBox: {
    margin: 40,
    backgroundColor: '#111',
    borderColor: '#FDC300',
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  modalDate: { color: '#FDC300', fontSize: 12, marginBottom: 4 },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  modalDesc: { color: '#ccc', fontSize: 14, marginBottom: 20 },
  assignmentId: { color: '#aaa', fontSize: 12 },
  assignmentValue: { color: '#FDC300', fontSize: 12, marginBottom: 20 },
  closeBtn: {
    color: '#FDC300',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
