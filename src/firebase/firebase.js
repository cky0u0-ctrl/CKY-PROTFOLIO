import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app = null;
let auth = null;
let db = null;
export const firebaseReady = !!firebaseConfig.apiKey;

if (firebaseReady) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn('Firebase 초기화 실패 — 로그인/게시판 기능이 비활성화됩니다.', err);
  }
} else {
  console.warn('Firebase 환경변수가 설정되지 않았습니다 — 배포 플랫폼(Vercel 등)의 Environment Variables에 REACT_APP_FIREBASE_* 값을 등록해주세요.');
}

export { auth, db };
