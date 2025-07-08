# 📊 React Native Risk Profiler App

This is a React Native application that guides users through a series of questions to assess their investment risk profile. The app calculates a risk score and classifies the user as **Low**, **Medium**, or **High** risk. It supports dark mode, smooth navigation, and animated result screens using Lottie.

---

## 🧩 Features

- 🔢 **Step-by-step Questionnaire** – Each question appears on a new screen.
- 🎯 **Auto-advance Logic** – Automatically proceeds to the next question after answering.
- 🧠 **Risk Calculation** – Based on user responses and a scoring model.
- 📊 **Animated Result Screen** – Displays user's risk category using Lottie animations.
- 🧪 **Unit Testing with Jest** and code coverage support.
- 🧱 **Modular Code Structure** – Constants, styles, and color management in separate files.

---

## 📦 Dependencies

| Package                                           | Description                  |
| ------------------------------------------------- | ---------------------------- |
| react-native                                      | Core mobile framework        |
| react-navigation                                  | Screen navigation            |
| redux, react-redux                                | State management             |
| @reduxjs/toolkit                                  | Simplified Redux setup       |
| lottie-react-native                               | JSON-based animations        |
| react-native-gesture-handler, reanimated, screens | Required by navigation stack |
| jest, @testing-library/react-native               | Unit testing                 |

---

## 🛠️ Getting Started

> ✅ Prerequisite: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for your OS (Android/iOS).

### 📁 Clone the Project

```bash
git clone https://github.com/your-username/risk-profiler-app.git
cd risk-profiler-app
```

### 📥 Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

---

## 📱 Running the App

### 🚀 Start Metro Bundler

```bash
npm start
# or
yarn start
```

### 🤖 Run on Android

Make sure you have an Android emulator running or an Android device connected.

```bash
npm run android
# or
yarn android
```

### 🍎 Run on iOS

> macOS & Xcode required

1. Install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

2. Run on iOS simulator:

```bash
npm run ios
# or
yarn ios
```

---

## 🧪 Running Tests

### 🔬 Run All Unit Tests

```bash
npm test
# or
yarn test
```

### 📈 Generate Code Coverage Report

```bash
npm test -- --coverage
# or
yarn test --coverage
```

---

## 🎯 Risk Scoring Logic

The app uses the following rules to compute a total score and risk level:

- **Questions 1 & 2**: Score range 1–3
  - Example: _Novice = 1, Intermediate = 2, Advanced = 3_
- **Questions 3, 4 & 5**: Score range 1–5
  - Example: _Very Risk Averse = 1, Risk-Tolerant = 5_

### 🏷️ Risk Category Mapping

| Score Range | Category |
| ----------- | -------- |
| 5 - 9       | Low      |
| 10 - 14     | Medium   |
| 15+         | High     |

---

## 📂 Project Structure

```
.
├── App.tsx
├── __tests__/
├── src/
│   ├── assets/
│   ├── constants/
│   ├── redux/
│   ├── navigation/
│   ├── screens/
│   ├── styles/
│   └── utils/
├── README.md
├── package.json
└── jest.config.js
```

---

## 🎉 Bonus Features

- 📱 Fully responsive layout
- 🧩 Modular architecture with reusable components

---

## 🧰 Troubleshooting

- If you encounter build issues, try:

```bash
cd android && ./gradlew clean && cd ..
npm start --reset-cache
```

- For iOS:

```bash
cd ios && pod install && cd ..
```

Visit [React Native Troubleshooting Docs](https://reactnative.dev/docs/troubleshooting) for more help.

---

## 📚 Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [Lottie Animations](https://airbnb.io/lottie/#/)
