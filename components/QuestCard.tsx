// components/QuestCard.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Quest {
  id: string | number;
  title: string;
  description: string;
  due: string;
  xp: number;
  accepted: boolean;
}

interface QuestCardProps {
  quest: Quest;
  onAccept: (id: string | number) => void;
}

export default function QuestCard({ quest, onAccept }: QuestCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>
      <Text style={styles.date}>📅 Due: {quest.due}</Text>
      <View style={styles.row}>
        <Text>{quest.xp} XP</Text>
        {!quest.accepted && (
          <TouchableOpacity onPress={() => onAccept(quest.id)} style={styles.button}>
            <Text style={styles.buttonText}>Accept Quest</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  description: { color: '#555', marginBottom: 4 },
  date: { fontSize: 12, color: '#888', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  button: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: { color: '#fff' },
});
