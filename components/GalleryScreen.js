import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { getAllPhotos } from '../utils/storage';

export default function GalleryScreen({ onBack }) {
  const [photos, setPhotos] = useState([]); // สถานะเก็บรายการรูปทั้งหมด

  // โหลดรูปทั้งหมดจาก storage เมื่อ component mount
  useEffect(() => {
    (async () => {
      const all = await getAllPhotos();
      setPhotos(all.reverse()); // ให้รูปใหม่อยู่บน
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* แถบหัว + ปุ่ม Back */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>แกลเลอรี</Text>
      </View>

      {/* แสดงรูปทั้งหมด */}
      {photos.length === 0 ? (
        // ถ้ายังไม่มีรูป
        <View style={styles.emptyWrap}>
          <Text style={{ color: '#999' }}>ยังไม่มีรูปที่ถ่ายไว้</Text>
        </View>
      ) : (
        // แสดงรูปทั้งหมดใน FlatList แบบ 3 คอลัมน์
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.photo} />
          )}
        />
      )}
    </View>
  );
}

// สไตล์ทั้งหมดของ component
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  backText: { color: '#fff', fontSize: 18 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'right' },

  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  list: { padding: 4 },
  photo: {
    width: '32%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
  },
});