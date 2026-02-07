# 📱 如何获取 APK 安装包

## ⚠️ 重要说明

**Codespaces 环境限制**：GitHub Codespaces 是一个云端开发环境，**无法直接构建 Android APK**，因为缺少：
- ❌ Java JDK 17
- ❌ Android SDK
- ❌ Android Studio
- ❌ Gradle 构建工具

## 🎯 三种获取 APK 的方法

### 方法 1：在本地机器上构建（推荐）⭐

这是最可靠的方法，可以完全控制构建过程。

#### 步骤 1：下载项目到本地

**选项 A：使用 Git 克隆**
```bash
git clone https://github.com/charketh/RUthirsty-cordova.git
cd RUthirsty-cordova
```

**选项 B：下载 ZIP 文件**
1. 在 GitHub 页面点击 "Code" → "Download ZIP"
2. 解压到本地目录
3. 打开终端，进入项目目录

#### 步骤 2：安装开发环境

**Windows 系统：**
```powershell
# 1. 安装 Node.js (https://nodejs.org/)
# 下载并安装 LTS 版本

# 2. 安装 Java JDK 17
# 下载：https://adoptium.net/
# 安装后设置 JAVA_HOME 环境变量

# 3. 安装 Android Studio
# 下载：https://developer.android.com/studio
# 安装 Android SDK (API 33+)

# 4. 设置环境变量
# ANDROID_HOME = C:\Users\你的用户名\AppData\Local\Android\Sdk
# Path 添加：%ANDROID_HOME%\platform-tools
# Path 添加：%ANDROID_HOME%\tools
```

**macOS 系统：**
```bash
# 1. 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安装 Node.js
brew install node

# 3. 安装 Java JDK 17
brew install openjdk@17

# 4. 安装 Android Studio
# 下载：https://developer.android.com/studio
# 安装 Android SDK (API 33+)

# 5. 设置环境变量（添加到 ~/.zshrc 或 ~/.bash_profile）
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

**Linux 系统：**
```bash
# 1. 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装 Java JDK 17
sudo apt-get install openjdk-17-jdk

# 3. 安装 Android Studio
# 下载：https://developer.android.com/studio
# 或使用 snap：sudo snap install android-studio --classic

# 4. 设置环境变量（添加到 ~/.bashrc）
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

#### 步骤 3：验证环境

```bash
# 检查 Node.js
node --version  # 应显示 v14+

# 检查 npm
npm --version   # 应显示 6+

# 检查 Java
java -version   # 应显示 17.x

# 检查 Android SDK
echo $ANDROID_HOME  # 应显示 SDK 路径
```

#### 步骤 4：构建 APK

**使用自动化脚本（推荐）：**
```bash
# 进入项目目录
cd RUthirsty-cordova

# 运行构建脚本
python cordova-apk-builder/scripts/build_apk.py

# APK 将生成在：
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**手动构建：**
```bash
# 1. 安装依赖
npm install

# 2. 添加 Android 平台
npx cordova platform add android

# 3. 构建 APK
npx cordova build android

# 4. APK 位置
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

#### 步骤 5：安装到手机

**方式 A：USB 连接安装**
```bash
# 1. 启用手机的开发者选项和 USB 调试
# 2. 用 USB 连接手机到电脑
# 3. 运行命令
npx cordova run android --device
```

**方式 B：手动安装**
```bash
# 1. 将 APK 文件复制到手机
# 2. 在手机上找到 APK 文件
# 3. 点击安装（需要允许安装未知来源）
```

---

### 方法 2：使用 GitHub Actions 自动构建

如果您有 GitHub 仓库，可以使用 GitHub Actions 自动构建 APK。

#### 创建 GitHub Actions 工作流

创建文件 `.github/workflows/build-apk.yml`：

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Setup Android SDK
      uses: android-actions/setup-android@v2

    - name: Install dependencies
      run: npm install

    - name: Add Android platform
      run: npx cordova platform add android

    - name: Build APK
      run: npx cordova build android

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

#### 使用步骤：

1. 将代码推送到 GitHub
2. 进入仓库的 "Actions" 标签
3. 运行 "Build Android APK" 工作流
4. 等待构建完成（约 5-10 分钟）
5. 下载生成的 APK 文件

---

### 方法 3：使用在线构建服务

#### PhoneGap Build（已停止服务）
❌ Adobe PhoneGap Build 已于 2020 年停止服务

#### Ionic Appflow
✅ 可用，但需要付费订阅
- 网址：https://ionic.io/appflow
- 支持 Cordova 应用构建
- 提供免费试用

#### Monaca
✅ 可用，有免费计划
- 网址：https://monaca.io/
- 支持 Cordova/PhoneGap 应用
- 免费计划有限制

---

## 🎯 推荐方案

### 对于个人开发者：
**推荐方法 1（本地构建）**
- ✅ 完全免费
- ✅ 完全控制
- ✅ 可以调试
- ⚠️ 需要安装工具（一次性）

### 对于团队协作：
**推荐方法 2（GitHub Actions）**
- ✅ 自动化构建
- ✅ 免费（GitHub 提供）
- ✅ 可持续集成
- ⚠️ 需要 GitHub 仓库

---

## 📦 快速开始：本地构建

如果您想立即开始，这是最快的步骤：

### Windows 快速安装
```powershell
# 1. 下载并安装（按顺序）：
# - Node.js: https://nodejs.org/
# - Java JDK 17: https://adoptium.net/
# - Android Studio: https://developer.android.com/studio

# 2. 在 Android Studio 中：
# - 打开 SDK Manager
# - 安装 Android SDK Platform 33
# - 安装 Android SDK Build-Tools
# - 安装 Android SDK Platform-Tools

# 3. 设置环境变量：
# - ANDROID_HOME = C:\Users\你的用户名\AppData\Local\Android\Sdk
# - 添加到 Path: %ANDROID_HOME%\platform-tools

# 4. 重启电脑（使环境变量生效）

# 5. 克隆项目并构建：
git clone https://github.com/charketh/RUthirsty-cordova.git
cd RUthirsty-cordova
python cordova-apk-builder/scripts/build_apk.py
```

### macOS 快速安装
```bash
# 1. 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安装工具
brew install node
brew install openjdk@17

# 3. 下载并安装 Android Studio
# https://developer.android.com/studio

# 4. 设置环境变量
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc

# 5. 克隆项目并构建
git clone https://github.com/charketh/RUthirsty-cordova.git
cd RUthirsty-cordova
python cordova-apk-builder/scripts/build_apk.py
```

---

## 🐛 常见问题

### Q1: 构建失败，提示 "ANDROID_HOME not set"
**A:** 需要设置 ANDROID_HOME 环境变量指向 Android SDK 目录。

**解决方案：**
```bash
# Windows
setx ANDROID_HOME "C:\Users\你的用户名\AppData\Local\Android\Sdk"

# macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

### Q2: 构建失败，提示 "Java not found"
**A:** 需要安装 Java JDK 17。

**解决方案：**
- 下载：https://adoptium.net/
- 安装后重启终端

### Q3: 构建失败，提示 "SDK not found"
**A:** 需要在 Android Studio 中安装 Android SDK。

**解决方案：**
1. 打开 Android Studio
2. Tools → SDK Manager
3. 安装 Android SDK Platform 33
4. 安装 Android SDK Build-Tools

### Q4: 构建成功，但 APK 无法安装
**A:** 可能是签名问题或手机设置问题。

**解决方案：**
1. 在手机设置中允许安装未知来源
2. 确保 APK 文件完整（检查文件大小）
3. 尝试重新构建

### Q5: 构建时间太长
**A:** 首次构建需要下载依赖，可能需要 5-10 分钟。

**解决方案：**
- 确保网络连接良好
- 后续构建会快很多（1-2 分钟）

---

## 📞 获取帮助

### 查看详细文档
```bash
# 环境配置指南
cat cordova-apk-builder/references/environment_setup.md

# 故障排除指南
cat cordova-apk-builder/references/troubleshooting.md

# 快速入门指南
cat QUICK_START_GUIDE.md
```

### 在线资源
- Cordova 官方文档: https://cordova.apache.org/docs/
- Android Studio 下载: https://developer.android.com/studio
- Node.js 下载: https://nodejs.org/
- Java JDK 下载: https://adoptium.net/

---

## 🎉 总结

**最简单的方法**：在本地机器上构建
1. 安装 Node.js、Java JDK 17、Android Studio
2. 设置 ANDROID_HOME 环境变量
3. 克隆项目
4. 运行 `python cordova-apk-builder/scripts/build_apk.py`
5. 获得 APK 文件

**预计时间**：
- 首次安装环境：30-60 分钟
- 首次构建：5-10 分钟
- 后续构建：1-2 分钟

**APK 大小**：约 4-5 MB

---

**版本**：v1.0.4
**更新日期**：2024-02-07
**状态**：✅ 可用

**祝您构建顺利！📱**
