#!/bin/bash

# Image Optimization Script for Wedding Website
# This script resizes and compresses images for web use

echo "🖼️  Starting image optimization..."

# Create backup directory
mkdir -p public/images/original-backup

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    brew install imagemagick
fi

cd public/images

echo "📁 Backing up original images..."
# Backup original images (only if backup doesn't exist)
for file in *.jpg *.jpeg *.JPG *.JPEG *.png *.PNG; do
    if [ -f "$file" ] && [ ! -f "original-backup/$file" ]; then
        cp "$file" "original-backup/"
        echo "   ✅ Backed up: $file"
    fi
done

echo "🔄 Optimizing images..."

# Optimize different types of images with appropriate sizes
for file in *.jpg *.jpeg *.JPG *.JPEG *.png *.PNG; do
    if [ -f "$file" ]; then
        echo "   🔧 Processing: $file"
        
        # Get original size
        original_size=$(du -h "$file" | cut -f1)
        
        # Different resize strategies based on filename
        if [[ "$file" == *"avatar"* ]] || [[ "$file" == *"avata"* ]]; then
            # Avatar images: 400x400 max, high quality
            convert "$file" -resize "400x400>" -quality 85 -strip "$file.tmp"
        elif [[ "$file" == *"TUN"* ]]; then
            # Professional photos: 1200px width max, good quality
            convert "$file" -resize "1200x>" -quality 80 -strip "$file.tmp"
        elif [[ "$file" == *"15x21"* ]]; then
            # Studio photos: 1000px width max
            convert "$file" -resize "1000x>" -quality 80 -strip "$file.tmp"
        elif [[ "$file" == *"qr"* ]]; then
            # QR codes: keep small and sharp
            convert "$file" -resize "500x500>" -quality 90 -strip "$file.tmp"
        else
            # General photos: 800px width max
            convert "$file" -resize "800x>" -quality 75 -strip "$file.tmp"
        fi
        
        # Replace original with optimized version
        mv "$file.tmp" "$file"
        
        # Get new size
        new_size=$(du -h "$file" | cut -f1)
        echo "     📊 $original_size → $new_size"
    fi
done

echo ""
echo "✅ Image optimization completed!"
echo "📊 Size comparison:"
du -sh original-backup/ 2>/dev/null && echo "   Original total size: $(du -sh original-backup/ | cut -f1)"
du -sh . | grep -v original-backup && echo "   Optimized total size: $(du -sh . --exclude=original-backup | cut -f1)"

echo ""
echo "🎯 Optimization strategy applied:"
echo "   • Avatar images: 400x400px max, 85% quality"
echo "   • Professional photos (TUN*): 1200px width max, 80% quality"
echo "   • Studio photos (15x21*): 1000px width max, 80% quality"
echo "   • QR codes: 500x500px max, 90% quality"
echo "   • General photos: 800px width max, 75% quality"
echo "   • All images: stripped metadata for smaller size"
echo ""
echo "💾 Original images backed up in: public/images/original-backup/"
echo "🚀 Your website will now load much faster!"
