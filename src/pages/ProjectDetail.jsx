import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import '../styles/pages/ProjectDetail.scss';

function ProjectDetail() {
  const { id } = useParams();
  const [activeId, setActiveId] = useState(id || 'laftel');
  const project = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  return (
    <div className="pj-layout">
      {/* ── 사이드바 */}
      <aside className="pj-sidebar">
        <div className="pj-sidebar__blob" />
        <ul className="pj-sidebar__list">
          {PROJECTS.map(p => (
            <li
              key={p.id}
              className={`pj-list-item ${activeId === p.id ? 'active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              <span className="pj-list-item__name">{p.name}</span>
              <span className="pj-list-item__sub">{p.sub}</span>
            </li>
          ))}
        </ul>
        <div className="pj-sidebar__vertical">{project.verticalText}</div>
        <p className="pj-sidebar__sub">웹 퍼블리싱 실력을 담은 {PROJECTS.length}개의 프로젝트 입니다.</p>
        <h2 className="pj-sidebar__big">PROJECTS</h2>
      </aside>

      {/* ── 상세 */}
      <main className="pj-detail" key={activeId}>
        {/* 링크 뱃지 */}
        <div className="pj-detail__links">
          {project.links.map(l => (
            <a key={l.label} href={l.href} className="pj-link-badge" target="_blank" rel="noopener noreferrer">
              <div className="pj-link-badge__icon">{l.icon}</div>
              <span className="pj-link-badge__label">{l.label}</span>
            </a>
          ))}
        </div>

        {/* 메타 카드 */}
        <div className="pj-detail__card">
          <h3 className="pj-detail__card-title">{project.name} 프로젝트</h3>
          <div className="pj-meta">
            <div><p className="pj-meta__label">역할</p><p className="pj-meta__value">{project.role}</p></div>
            <div><p className="pj-meta__label">기간</p><p className="pj-meta__value">{project.period}</p></div>
            <div><p className="pj-meta__label">형태</p><p className="pj-meta__value">{project.type}</p></div>
          </div>
          <p className="pj-detail__lang-title">활용언어</p>
          <div className="pj-detail__lang-tags">
            {project.langs.map(l => <span key={l} className="lang-tag">{l}</span>)}
          </div>
        </div>

        {/* 구현 사항 */}
        <div className="pj-detail__impl">
          <h4 className="pj-detail__impl-title">주요 구현사항</h4>
          <ul className="pj-impl-list">
            {project.impl.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="pj-detail__back">
          <Link to="/#projects" className="btn btn-ghost">← 목록으로</Link>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetail;
