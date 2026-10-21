import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

export default function ProductDetailModal({ visible, product, onClose, onAddToCart }) {
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return null;

  const colors = ['#0F172A', '#2563EB', '#EF4444', '#10B981'];

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: insets.top || (Platform.OS === 'android' ? 30 : 0) }]}>
        {/* Detail Top Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.navTitle} numberOfLines={1}>
            Chi tiết sản phẩm
          </Text>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {/* Main Product Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.image }}
              style={styles.largeImage}
              resizeMode="cover"
            />
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Giảm {product.discount}</Text>
              </View>
            )}
          </View>

          {/* Product Meta */}
          <View style={styles.contentPadding}>
            <View style={styles.ratingRow}>
              <View style={styles.starRow}>
                <Ionicons name="star" size={16} color={COLORS.star} />
                <Text style={styles.ratingNumber}>{product.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>({product.reviews} đánh giá)</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{product.category.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.productName}>{product.name}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.mainPrice}>{formatPrice(product.price)}</Text>
              {product.originalPrice && (
                <Text style={styles.oldPrice}>
                  {formatPrice(product.originalPrice)}
                </Text>
              )}
            </View>

            {/* Color Option Selector */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Màu sắc</Text>
              <View style={styles.colorRow}>
                {colors.map((c, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: c },
                      selectedColor === index && styles.colorSelected,
                    ]}
                    onPress={() => setSelectedColor(index)}
                    activeOpacity={0.8}
                  >
                    {selectedColor === index && (
                      <Ionicons name="checkmark" size={16} color={COLORS.white} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Số lượng</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={handleDecrease}
                >
                  <Ionicons name="remove" size={18} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={handleIncrease}
                >
                  <Ionicons name="add" size={18} color={COLORS.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>Mô tả sản phẩm</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>

            {/* Specifications */}
            {product.specs && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionLabel}>Thông số kỹ thuật</Text>
                {product.specs.map((spec, idx) => (
                  <View key={idx} style={styles.specItem}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={16}
                      color={COLORS.primary}
                    />
                    <Text style={styles.specText}>{spec}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Fixed Action Bar */}
        <View
          style={[
            styles.bottomBar,
            { paddingBottom: Math.max(insets.bottom, SPACING.md) },
          ]}
        >
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => {
              onAddToCart && onAddToCart(product, quantity);
              onClose();
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="cart-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cartButtonText}>Thêm vào giỏ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              alert(`Đặt mua thành công ${quantity} x ${product.name}!`);
              onClose();
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buyButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.xs,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },
  contentPadding: {
    padding: SPACING.lg,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewCount: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    marginLeft: 'auto',
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 28,
    marginBottom: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  mainPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  oldPrice: {
    fontSize: 16,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  sectionBlock: {
    marginBottom: SPACING.lg,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  colorRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quantityBtn: {
    padding: SPACING.sm,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  specText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.md,
    ...SHADOWS.lg,
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    height: 50,
    gap: SPACING.xs,
  },
  cartButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  buyButton: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 50,
    ...SHADOWS.sm,
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
