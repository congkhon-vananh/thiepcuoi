#!/bin/bash

# Avatar Resize Script for Wedding Website
# This script resizes avatar images to optimal size for web display

echo "🖼️  Starting avatar resize..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it first:"
    echo "   brew install imagemagick"
    exit 1
fi

cd public/images

echo "📁 Backing up original avatars..."
# Create backup if not exists
if [ ! -f "avata-ck.jpeg.backup" ]; then
    cp "avata-ck.jpeg" "avata-ck.jpeg.backup"
    echo "   ✅ Backed up: avata-ck.jpeg"
fi

if [ ! -f "avata-va.jpeg.backup" ]; then
    cp "avata-va.jpeg" "avata-va.jpeg.backup"
    echo "   ✅ Backed up: avata-va.jpeg"
fi

echo "🔄 Resizing avatars for optimal display..."

# Resize Công Khôn avatar
if [ -f "avata-ck.jpeg" ]; then
    echo "   🔧 Processing: avata-ck.jpeg"
    original_size=$(du -h "avata-ck.jpeg" | cut -f1)
    
    # Resize to 320x320 (2x display size for retina), high quality, square crop
    convert "avata-ck.jpeg" \
        -resize "320x320^" \
        -gravity center \
        -extent "320x320" \
        -quality 90 \
        -strip \
        "avata-ck.jpeg.tmp"
    
    mv "avata-ck.jpeg.tmp" "avata-ck.jpeg"
    new_size=$(du -h "avata-ck.jpeg" | cut -f1)
    echo "     📊 $original_size → $new_size"
fi

# Resize Vân Anh avatar
if [ -f "avata-va.jpeg" ]; then
    echo "   🔧 Processing: avata-va.jpeg"
    original_size=$(du -h "avata-va.jpeg" | cut -f1)
    
    # Resize to 320x320 (2x display size for retina), high quality, square crop
    convert "avata-va.jpeg" \
        -resize "320x320^" \
        -gravity center \
        -extent "320x320" \
        -quality 90 \
        -strip \
        "avata-va.jpeg.tmp"
    
    mv "avata-va.jpeg.tmp" "avata-va.jpeg"
    new_size=$(du -h "avata-va.jpeg" | cut -f1)
    echo "     📊 $original_size → $new_size"
fi

echo ""
echo "✅ Avatar resize completed!"
echo "🎯 Resize strategy:"
echo "   • Size: 320x320px (2x for retina display)"
echo "   • Quality: 90% (high quality for avatars)"
echo "   • Crop: Center gravity for best face positioning"
echo "   • Format: JPEG optimized"
echo "   • Metadata: Stripped for smaller size"
echo ""
echo "💾 Original avatars backed up with .backup extension"
echo "🚀 Avatars now optimized for 160x160px display!"
