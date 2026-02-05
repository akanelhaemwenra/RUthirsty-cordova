# 构建说明 (Build Instructions)

## 项目已完成的内容

✅ Cordova 项目结构已创建
✅ 应用核心功能已实现
✅ Android 平台已添加
✅ 所有源代码已提交到 Git

## 当前状态

项目已经完全实现，包含以下文件：

- `config.xml` - Cordova 配置文件
- `package.json` - 项目依赖
- `www/index.html` - 主界面
- `www/css/index.css` - 样式文件
- `www/js/index.js` - 应用逻辑
- `.gitignore` - Git 忽略规则

## Android SDK 问题

当前开发环境缺少 Android SDK 配置。要构建 Android APK，需要：

### 选项 1: 在本地环境构建（推荐）

如果你有本地 Android 开发环境：

1. 克隆项目到本地
```bash
git clone https://github.com/akanelhaemwenra/RUthirsty-cordova.git
cd RUthirsty-cordova
```

2. 安装依赖
```bash
npm install
```

3. 确保已安装 Android SDK
   - 安装 Android Studio 或
   - 单独安装 Android SDK 命令行工具

4. 设置环境变量
```bash
export ANDROID_HOME=/path/to/android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

5. 添加 Android 平台（如果需要）
```bash
npx cordova platform add android
```

6. 构建 APK
```bash
npx cordova build android
```

7. APK 位置
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### 选项 2: 使用 GitHub Actions 自动构建

可以设置 GitHub Actions 工作流自动构建 APK。

### 选项 3: 在浏览器中测试

虽然不是完整的 Android 应用，但可以在浏览器中测试核心功能：

```bash
cd /workspaces/RUthirsty-cordova
npx cordova serve
```

然后访问 http://localhost:8000

注意：浏览器模式下 `cordova.js` 不会加载，但 localStorage 功能仍可正常工作。

## 应用功能

1. **打卡功能** - 点击中间的大按钮记录喝水时间
2. **今日统计** - 顶部显示今日喝水次数
3. **历史记录** - 底部列表显示所有记录
4. **删除记录** - 每条记录可单独删除
5. **数据持久化** - 使用 localStorage 保存数据

## 技术细节

- **应用 ID**: com.ruthirsty.app
- **应用名称**: 喝水打卡
- **最低 Android 版本**: 5.1 (API 22)
- **目标 Android 版本**: 13 (API 33)
- **数据存储**: localStorage
- **UI 框架**: 原生 HTML/CSS/JavaScript

## 下一步

1. 在本地环境构建 Android APK
2. 在 Android 设备或模拟器上测试
3. 根据需要调整 UI 或功能
4. 发布到应用商店（可选）

## 故障排除

### 构建失败
- 确保 ANDROID_HOME 环境变量已设置
- 确保已安装 Java JDK 11+
- 运行 `npx cordova requirements` 检查环境

### 应用崩溃
- 检查浏览器控制台（使用 Chrome Remote Debugging）
- 确保 deviceready 事件正确触发

### 数据丢失
- localStorage 数据存储在应用沙箱中
- 卸载应用会清除数据
- 考虑添加数据导出功能
