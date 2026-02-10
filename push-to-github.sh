#!/bin/bash

# 🚀 Script Push Code lên GitHub
# Chạy script này SAU KHI đã setup GitHub authorization

echo "======================================"
echo "  BIM Management - GitHub Push Script"
echo "======================================"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Không tìm thấy package.json"
  echo "   Vui lòng chạy script này từ /home/user/webapp"
  exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Check git status
echo "📊 Git status:"
git status
echo ""

# Add remote if not exists
if ! git remote | grep -q "origin"; then
  echo "🔗 Adding remote repository..."
  git remote add origin https://github.com/MrNvNguyen/Web-App.git
  echo "✅ Remote added!"
else
  echo "✅ Remote already exists"
fi

echo ""
echo "🔄 Fetching from remote..."
git fetch origin || echo "⚠️  Could not fetch (this is OK for first push)"

echo ""
echo "📤 Pushing to GitHub..."
echo "   Repository: https://github.com/MrNvNguyen/Web-App"
echo "   Branch: main"
echo ""

# Push to GitHub (force push for initial setup)
git push -f origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "======================================"
  echo "  ✅ PUSH THÀNH CÔNG!"
  echo "======================================"
  echo ""
  echo "🌐 Xem code tại:"
  echo "   https://github.com/MrNvNguyen/Web-App"
  echo ""
  echo "📂 Files đã push:"
  git log --oneline -5
  echo ""
else
  echo ""
  echo "======================================"
  echo "  ❌ PUSH THẤT BẠI!"
  echo "======================================"
  echo ""
  echo "Có thể do:"
  echo "1. Chưa setup GitHub authorization trong tab #github"
  echo "2. Không có quyền truy cập repository"
  echo "3. Repository không tồn tại"
  echo ""
  echo "Giải pháp:"
  echo "1. Vào tab #github và authorize GitHub App"
  echo "2. Đảm bảo repository MrNvNguyen/Web-App tồn tại"
  echo "3. Chạy lại script này"
  echo ""
fi
