import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { BANNERS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

export default function BannerSlider({ width }) {
  const banner = BANNERS[0];
  // Responsive width
  const bannerWidth = width - SPACING.lg * 2;

  return (
    <View style={[styles.container, { width: bannerWidth }]}>
      <Image source={{ uri: banner.image }} style={styles.bannerImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{banner.tag}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {banner.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {banner.subtitle}
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Khám phá ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    position: 'relative',
    backgroundColor: COLORS.primaryDark,
    ...SHADOWS.md,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    marginBottom: SPACING.xs,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginBottom: SPACING.md,
    maxWidth: '75%',
  },
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
});
