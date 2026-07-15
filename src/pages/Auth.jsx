import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import '../styles/pages/Auth.scss';

function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await setDoc(doc(db, 'users', cred.user.uid), {
          name, company, email,
          role: 'recruiter',
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/contact');
    } catch (err) {
      console.log('🔥 FIREBASE ERROR:', err.code, err.message); // 이 줄 추가
      setError('');
      const msgs = {
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
        'auth/user-not-found': '가입되지 않은 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
      };
      setError(msgs[err.code] || '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />
      <div className="auth-bg-text">{mode === 'login' ? 'LOGIN' : 'JOIN'}</div>

      <div className="auth-card">
        <Link to="/" className="auth-card__back">← 홈</Link>

        <div className="auth-card__logo">
          <span>KY</span><span className="auth-card__heart">♥</span>
        </div>

        <h1 className="auth-card__title">
          {mode === 'login' ? '로그인' : '회원가입'}
        </h1>
        <p className="auth-card__sub">
          {mode === 'login'
            ? '스카우트 제안 및 게시판 이용을 위해 로그인해주세요'
            : '기업/채용 담당자를 위한 회원가입입니다'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className="auth-form__field">
                <label>담당자명 *</label>
                <input
                  type="text" placeholder="홍길동"
                  value={name} onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="auth-form__field">
                <label>회사명</label>
                <input
                  type="text" placeholder="(주)회사이름"
                  value={company} onChange={e => setCompany(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="auth-form__field">
            <label>이메일 *</label>
            <input
              type="email" placeholder="example@company.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form__field">
            <label>비밀번호 *</label>
            <input
              type="password" placeholder="6자 이상"
              value={password} onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button type="submit" className="btn btn-fill auth-form__submit" disabled={loading}>
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '가입하기'}
          </button>
        </form>

        <div className="auth-card__toggle">
          {mode === 'login' ? (
            <>
              계정이 없으신가요?{' '}
              <button onClick={() => { setMode('signup'); setError(''); }}>
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button onClick={() => { setMode('login'); setError(''); }}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
