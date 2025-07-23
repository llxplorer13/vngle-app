import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Quest = {
  id: number;
  title: string;
  date: string;
  description: string;
  status: 'Available' | 'In Progress' | 'Completed';
  label?: 'New!' | 'Message';
  active?: boolean;
};

type Props = {
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
};

export default function InProgressTab({ quests, setQuests }: Props) {
  const inProgress = quests.filter(q => q.status === 'In Progress');
  const [selected, setSelected] = useState<Quest | null>(null);

  const handleSetActive = () => {
    if (selected) {
      const updated: Quest[] = quests.map(q =>
        q.id === selected.id
          ? { ...q, active: true }
          : q.status === 'In Progress'
          ? { ...q, active: false }
          : q
      );
      setQuests(updated);
      setSelected(null);
    }
  };

  const handleSubmit = () => {
    if (selected) {
      const updated: Quest[] = quests.map(q =>
        q.id === selected.id
          ? { ...q, status: 'Completed', active: false }
          : q
      );
      setQuests(updated);
      setSelected(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {inProgress.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.text}>No assignments in progress yet.</Text>
        </View>
      ) : (
        inProgress.map(q => (
          <TouchableOpacity key={q.id} onPress={() => setSelected(q)} style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.text}>{q.title}</Text>
                <Text style={styles.date}>{q.date}</Text>
              </View>
              <Image source={require('../assets/images/in-progress 1.png')} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        ))
      )}

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBox}>
          {selected && (
            <>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              <Text style={styles.modalDesc}>{selected.description}</Text>
              <View style={styles.modalButtons}>
                {selected.status === 'In Progress' && selected.active === true ? (
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.acceptBtn}>Submit</Text>
                  </TouchableOpacity>
                ) : selected.status === 'In Progress' ? (
                  <TouchableOpacity onPress={handleSetActive}>
                    <Text style={styles.acceptBtn}>Set Active</Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity onPress={() => setSelected(null)}>
                  <Text style={styles.cancelBtn}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
    margin: 20,
    backgroundColor: '#111',
    borderColor: '#FF00FF',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { color: '#FF00FF', fontSize: 16 },
  date: { color: '#aaa', fontSize: 12, marginTop: 4 },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalBox: {
    margin: 40,
    backgroundColor: '#111',
    borderColor: '#FF00FF',
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
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
