import { View, Text, Image, StyleSheet } from 'react-native';

// Component สำหรับแสดงภาพล่าสุดที่ถ่าย
export default function PreviewImage({ uri }) {
  if (!uri) return null; // ถ้าไม่มีรูป ไม่ต้องแสดงอะไร
  return (
    <View style={styles.container}>
      {/* ข้อความ label */}
      <Text style={styles.label}>ภาพล่าสุด:</Text>
      {/* แสดงรูปภาพ */}
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
}

// สไตล์ของ component
const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 12 },
  label: { fontSize: 16, marginBottom: 6 },
  image: { width: '100%', height: 200, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' },
});