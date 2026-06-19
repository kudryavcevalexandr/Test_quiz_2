import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

export default function CameraPreview() {
  const device = useCameraDevice('front');
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    const requestPermissions = async () => {
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }

      // Microphone permission is requested now so future video recording with
      // audio can be enabled without changing this permission flow.
      if (!hasMicrophonePermission) {
        await requestMicrophonePermission();
      }
    };

    void requestPermissions();
  }, [
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  if (!hasCameraPermission) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>Ожидаем разрешение камеры</Text>
        <Text style={styles.placeholderText}>
          Подтвердите доступ, чтобы увидеть превью фронтальной камеры.
        </Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>Фронтальная камера не найдена</Text>
        <Text style={styles.placeholderText}>
          Проверьте устройство или запустите приложение на телефоне с фронтальной камерой.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        video={false}
        audio={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#101820',
  },
  placeholder: {
    width: '100%',
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#101820',
    padding: 16,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#cfd8dc',
    fontSize: 14,
    textAlign: 'center',
  },
});
