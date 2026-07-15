import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection, addDoc, getDocs, orderBy, query,
  serverTimestamp, doc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import '../styles/pages/ContactBoard.scss';

function ContactBoard() {
  const [user,        setUser]        = useState(null);
  const [posts,       setPosts]       = useState([]);
  const [showForm,    setShowForm]    = useState(false);
  const [selected,    setSelected]    = useState(null);
  const [form,        setForm]        = useState({
    title: '', company: '', message: '', isPrivate: false,
  });
  const navigate = useNavigate();

  /* 비밀글 열람 권한: 작성자 본인만 내용 확인 가능 */
  const canView = (post) => !post.isPrivate || (user && user.uid === post.authorUid);

  /* 인증 상태 */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  /* 게시글 불러오기 */
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch { /* Firebase 미연결 시 빈 배열 유지 */ }
  };

  /* 글 작성 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/auth'); return; }
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        authorName:  user.displayName || user.email,
        authorEmail: user.email,
        authorUid:   user.uid,
        likes:       [],
        createdAt:   serverTimestamp(),
      });
      setForm({ title: '', company: '', message: '', isPrivate: false });
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      alert('게시글 등록에 실패했습니다. Firebase 설정을 확인해주세요.');
    }
  };

  /* 좋아요 토글 */
  const toggleLike = async (post) => {
    if (!user) { navigate('/auth'); return; }
    const ref = doc(db, 'contacts', post.id);
    const liked = post.likes?.includes(user.uid);
    await updateDoc(ref, {
      likes: liked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
    fetchPosts();
  };

  return (
    <div className="board-page">
      <div className="board-blob board-blob--1" />
      <div className="board-blob board-blob--2" />
      <div className="board-bg-text">CONTACT</div>

      <div className="board-inner">

        {/* 헤더 */}
        <div className="board-header">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h1 className="board-header__title">Contact Board</h1>
            <p className="board-header__sub">
              스카우트 제안, 협업, 문의를 자유롭게 남겨주세요 ♥
            </p>
          </div>
          <div className="board-header__actions">
            {user ? (
              <div className="board-user">
                <span className="board-user__name">👋 {user.displayName || user.email}</span>
                <button className="board-user__logout" onClick={() => signOut(auth)}>
                  로그아웃
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-fill">로그인 / 회원가입</Link>
            )}
            <Link to="/resume" className="btn btn-ghost">이력서 보기</Link>
          </div>
        </div>

        {/* 글쓰기 버튼 */}
        <div className="board-filter">
          <button
            className="btn btn-fill board-write-btn"
            onClick={() => user ? setShowForm(!showForm) : navigate('/auth')}
          >
            {showForm ? '닫기' : '✍️ 글쓰기'}
          </button>
        </div>

        {/* 글쓰기 폼 */}
        {showForm && (
          <form className="board-form" onSubmit={handleSubmit}>
            <h3 className="board-form__title">새 게시글 작성</h3>
            <div className="board-form__field">
              <label>회사명</label>
              <input
                type="text" placeholder="(주)회사이름"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="board-form__field">
              <label>제목 *</label>
              <input
                type="text" placeholder="제목을 입력해주세요"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="board-form__field">
              <label>내용 *</label>
              <textarea
                rows={5}
                placeholder="제안 내용, 채용 조건, 연락처 등을 자유롭게 적어주세요"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <label className="board-form__checkbox">
              <input
                type="checkbox"
                checked={form.isPrivate}
                onChange={e => setForm({ ...form, isPrivate: e.target.checked })}
              />
              🔒 비밀글로 작성 (작성자 본인만 내용을 볼 수 있어요)
            </label>
            <div className="board-form__btns">
              <button type="submit" className="btn btn-fill">등록하기</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                취소
              </button>
            </div>
          </form>
        )}

        {/* 게시글 상세 모달 */}
        {selected && (
          <div className="board-modal" onClick={() => setSelected(null)}>
            <div className="board-modal__inner" onClick={e => e.stopPropagation()}>
              <h2 className="board-modal__title">
                {selected.isPrivate && '🔒 '}{selected.title}
              </h2>

              {canView(selected) ? (
                <>
                  <div className="board-modal__meta">
                    <span>✍️ {selected.authorName}</span>
                    {selected.company && <span>🏢 {selected.company}</span>}
                    <span>📧 {selected.authorEmail}</span>
                  </div>
                  <p className="board-modal__body">{selected.message}</p>
                </>
              ) : (
                <div className="board-modal__locked">
                  <p>🔒 비밀글입니다.</p>
                  <p>작성자만 내용을 확인할 수 있어요.</p>
                </div>
              )}

              <div className="board-modal__footer">
                <button
                  className={`board-like-btn ${selected.likes?.includes(user?.uid) ? 'liked' : ''}`}
                  onClick={() => toggleLike(selected)}
                >
                  ♥ {selected.likes?.length || 0}
                </button>
                <button className="btn btn-ghost" onClick={() => setSelected(null)}>닫기</button>
              </div>
            </div>
          </div>
        )}

        {/* 게시글 목록 */}
        {posts.length === 0 ? (
          <div className="board-empty">
            <p>아직 게시글이 없습니다.</p>
            <p>첫 번째 스카우트 제안을 남겨주세요! 🎉</p>
          </div>
        ) : (
          <div className="board-list">
            {posts.map(post => (
              <div
                key={post.id}
                className="board-item"
                onClick={() => setSelected(post)}
              >
                <div className="board-item__left">
                  <h3 className="board-item__title">
                    {post.isPrivate && <span className="board-item__lock">🔒</span>}
                    {post.title}
                  </h3>
                  <p className="board-item__preview">
                    {canView(post)
                      ? `${post.message?.slice(0, 80)}${post.message?.length > 80 ? '...' : ''}`
                      : '비밀글입니다. 작성자만 내용을 볼 수 있어요.'}
                  </p>
                </div>
                <div className="board-item__right">
                  <span className="board-item__author">{post.authorName}</span>
                  {post.company && <span className="board-item__company">{post.company}</span>}
                  <button
                    className={`board-like-btn ${post.likes?.includes(user?.uid) ? 'liked' : ''}`}
                    onClick={e => { e.stopPropagation(); toggleLike(post); }}
                  >
                    ♥ {post.likes?.length || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ContactBoard;
