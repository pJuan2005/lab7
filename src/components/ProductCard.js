import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

/**
 * ProductCard được bọc React.memo để tối ưu hiệu năng cho FlatList.
 * Giúp tránh re-render không cần thiết khi danh sách cuộn mượt.
 */
const ProductCard = React.memo(({ item, onPress, onAddToCart, width }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: width || '47%' }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      {/* Product Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Badges */}
        <View style={styles.badgeRow}>
          {item.isHot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotBadgeText}>HOT</Text>
            </View>
          )}
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>-{item.discount}</Text>
            </View>
          )}
        </View>

        {/* Favorite Icon Button */}
        <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <View style={styles.infoContainer}>
        {/* Rating & Reviews */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={13} color={COLORS.star} />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <View style={styles.priceColumn}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(item.originalPrice)}
              </Text>
            )}
          </View>

          {/* Add to Cart Mini Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart && onAddToCart(item)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    flexDirection: 'row',
    gap: 4,
  },
  hotBadge: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  hotBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  discountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '800',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  infoContainer: {
    padding: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewsText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 18,
    minHeight: 36,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  priceColumn: {
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
});

export default ProductCard;
