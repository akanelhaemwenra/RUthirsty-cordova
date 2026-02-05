# 喝水打卡 Cordova 应用

一个简单的喝水打卡移动应用，使用 Cordova 框架开发，支持 Android 平台。

## 功能特性

- ✅ 一键打卡记录喝水时间
- ✅ 显示今日喝水次数统计
- ✅ 查看所有历史喝水记录
- ✅ 删除单条记录
- ✅ 数据本地持久化存储

## 技术栈

- Apache Cordova
- 原生 HTML5/CSS3/JavaScript
- localStorage API

## 项目结构

```
RUthirsty-cordova/
├── config.xml              # Cordova 配置文件
├── package.json            # 项目依赖配置
├── www/                    # 应用源代码
│   ├── index.html         # 主界面
│   ├── css/
│   │   └── index.css      # 样式文件
│   ├── js/
│   │   └── index.js       # 应用逻辑
│   └── img/               # 图片资源
├── platforms/             # 平台相关代码（自动生成）
└── plugins/               # Cordova 插件（自动生成）
```

## 开发环境要求

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn
- Android SDK (用于 Android 平台构建)
- Java JDK 11 或更高版本

## 安装步骤

1. 克隆项目到本地
```bash
git clone <repository-url>
cd RUthirsty-cordova
```

2. 安装依赖
```bash
npm install
```

3. 添加 Android 平台
```bash
npx cordova platform add android
```

## 构建和运行

### 在浏览器中测试（开发模式）
```bash
npx cordova serve
```
然后在浏览器中访问 http://localhost:8000

注意：浏览器模式下 cordova.js 不会加载，但核心功能仍可测试。

### 构建 Android APK
```bash
npx cordova build android
```

构建完成后，APK 文件位于：
`platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### 在 Android 设备或模拟器上运行
```bash
npx cordova run android
```

确保：
- Android 设备已通过 USB 连接并启用了开发者模式
- 或者已启动 Android 模拟器

## 使用说明

1. **打卡喝水**：点击中间的大圆形按钮记录当前喝水时间
2. **查看统计**：顶部显示今日已喝水次数
3. **查看记录**：底部列表显示所有历史记录（最新的在前）
4. **删除记录**：点击每条记录右侧的"删除"按钮

## 数据存储

应用使用浏览器的 localStorage API 存储数据，数据格式：

```javascript
{
  records: [
    {
      timestamp: 1234567890000,  // Unix 时间戳
      date: "2026-02-05",        // 日期
      time: "10:30:25"           // 时间
    },
    ...
  ]
}
```

## 配置说明

### config.xml 主要配置

- **应用 ID**: com.ruthirsty.app
- **应用名称**: 喝水打卡
- **版本**: 1.0.0
- **最低 Android SDK**: 22 (Android 5.1)
- **目标 Android SDK**: 33 (Android 13)

## 故障排除

### 常见问题

1. **cordova 命令未找到**
   ```bash
   npm install -g cordova
   ```

2. **Android SDK 路径未配置**
   设置环境变量：
   ```bash
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

3. **Gradle 构建失败**
   确保已安装 Java JDK 11 或更高版本

## 开发计划

- [ ] 添加每日喝水目标设置
- [ ] 添加喝水提醒功能
- [ ] 添加数据统计图表
- [ ] 支持自定义喝水量
- [ ] 添加数据导出功能

## 许可证

ISC

## 贡献

欢迎提交 Issue 和 Pull Request！