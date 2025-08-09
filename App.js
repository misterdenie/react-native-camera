import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import CameraView from './components/CameraView';
import PreviewImage from './components/PreviewImage';
import GalleryScreen from './components/GalleryScreen';
import { getLastPhoto } from './utils/storage';

export default function App() {
  // สถานะสำหรับเก็บ URI ของรูปถ่ายล่าสุด
  const [last, setLast] = useState(null);
  // สถานะสำหรับกำหนดหน้าจอปัจจุบัน ('camera' หรือ 'gallery')
  const [screen, setScreen] = useState('camera'); // 'camera' | 'gallery'

  // เมื่อ component ถูก mount ให้ดึงรูปถ่ายล่าสุดจาก storage
  useEffect(() => {
    (async () => setLast(await getLastPhoto()))();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* แสดงหน้ากล้องถ่ายรูป */}
      {screen === 'camera' ? (
        <>
          <CameraView
            // เมื่อถ่ายรูปและบันทึกแล้ว ให้ setLast ด้วย URI ของรูปใหม่
            onPhotoSaved={setLast}
            // เมื่อกดเปิดแกลเลอรี่ ให้เปลี่ยนหน้าจอเป็น 'gallery'
            onOpenGallery={() => setScreen('gallery')}
          />
          {/* แสดงรูปถ่ายล่าสุด */}
          <PreviewImage uri={last} />
        </>
      ) : (
        // แสดงหน้าแกลเลอรี่ และมีปุ่มกลับไปหน้ากล้อง
        <GalleryScreen onBack={() => setScreen('camera')} />
      )}
    </SafeAreaView>
  );
}