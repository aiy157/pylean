// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { useAdminStore } from '../store/adminStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Shield, LogOut, Save, X, Lock, Eye, Search, User } from 'lucide-react';

const EMPTY_EXERCISE = {
  moduleId: 1,
  difficulty: 'easy',
  order: 99,
  title: { th: '', en: '' },
  description: { th: '', en: '' },
  starterCode: '# เขียนโค้ดที่นี่\n',
  hint: { th: '', en: '' },
  testCases: [{ input: '', expectedOutput: '' }],
  xpReward: 25,
};

function UserSearchPanel({ lang, t }) {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { searchUserProgress } = useAdminStore();

  const handleSearch = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await searchUserProgress(username.trim());
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ background: 'var(--color-bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--color-border-subtle)' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
        {lang === 'th' ? 'ค้นหาความคืบหน้าผู้เรียน' : 'Search User Progress'}
      </h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          className="input-dark" 
          placeholder={lang === 'th' ? 'พิมพ์ Username...' : 'Type Username...'}
          value={username} 
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1 }}
        />
        <button onClick={handleSearch} disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={16} /> {loading ? '...' : (lang === 'th' ? 'ค้นหา' : 'Search')}
        </button>
      </div>

      {result && !result.found && (
        <div style={{ padding: '1rem', background: 'rgba(244,63,94,0.1)', color: '#fb7185', borderRadius: '0.5rem', textAlign: 'center' }}>
          {result.error 
            ? (lang === 'th' ? `เกิดข้อผิดพลาด: ${result.error}` : `Error: ${result.error}`)
            : (lang === 'th' ? 'ไม่พบผู้ใช้นี้ในระบบ' : 'User not found')}
        </div>
      )}

      {result && result.found && (
        <div style={{ padding: '1.25rem', background: 'var(--color-bg-elevated)', borderRadius: '0.75rem', border: '1px solid rgba(124,58,237,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{result.profile.username}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{result.profile.id}</div>
            </div>
          </div>

          {result.progress ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--color-bg-card)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>XP</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>{result.progress.xp}</div>
              </div>
              <div style={{ background: 'var(--color-bg-card)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{lang === 'th' ? 'บทเรียนที่ผ่าน' : 'Lessons'}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{result.progress.completed_lessons?.length || 0}</div>
              </div>
              <div style={{ background: 'var(--color-bg-card)', padding: '1rem', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{lang === 'th' ? 'โจทย์ที่ผ่าน' : 'Exercises'}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6' }}>{result.progress.completed_exercises?.length || 0}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              {lang === 'th' ? 'ผู้ใช้นี้ยังไม่มีความคืบหน้า (ยังไม่ได้เริ่มเรียน)' : 'No progress recorded yet.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function ExerciseForm({ initial, onSave, onCancel, lang, t }) {
  const { modules } = useCurriculumStore();
  const [form, setForm] = useState(initial || EMPTY_EXERCISE);
  const [tab, setTab] = useState('th');

  const updateField = (path, value) => {
    const keys = path.split('.');
    const updated = { ...form };
    let ref = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      ref[keys[i]] = { ...ref[keys[i]] };
      ref = ref[keys[i]];
    }
    ref[keys[keys.length - 1]] = value;
    setForm(updated);
  };

  const addTestCase = () => {
    setForm({ ...form, testCases: [...form.testCases, { input: '', expectedOutput: '' }] });
  };

  const removeTestCase = (i) => {
    const updated = form.testCases.filter((_, idx) => idx !== i);
    setForm({ ...form, testCases: updated });
  };

  const updateTestCase = (i, field, value) => {
    const updated = form.testCases.map((tc, idx) =>
      idx === i ? { ...tc, [field]: value } : tc
    );
    setForm({ ...form, testCases: updated });
  };

  return (
    <div style={{
      background: 'var(--color-bg-card)',
      border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: '0.875rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>{t.admin.module}</label>
          <select
            className="input-dark"
            value={form.moduleId}
            onChange={e => updateField('moduleId', parseInt(e.target.value))}
          >
            {modules.map(m => (
              <option key={m.id} value={m.id} style={{ background: '#1a1a2e' }}>Module {m.id}: {m.title[lang]}</option>
            ))}
          </select>
        </div>
        <div style={{ minWidth: 120 }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>{t.admin.difficulty}</label>
          <select
            className="input-dark"
            value={form.difficulty}
            onChange={e => updateField('difficulty', e.target.value)}
          >
            <option value="easy" style={{ background: '#1a1a2e' }}>{t.admin.easy}</option>
            <option value="medium" style={{ background: '#1a1a2e' }}>{t.admin.medium}</option>
            <option value="hard" style={{ background: '#1a1a2e' }}>{t.admin.hard}</option>
          </select>
        </div>
        <div style={{ minWidth: 80 }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>XP</label>
          <input
            className="input-dark"
            type="number"
            value={form.xpReward}
            onChange={e => updateField('xpReward', parseInt(e.target.value))}
            min={5} max={200} step={5}
          />
        </div>
      </div>

      {/* Lang tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
        {['th', 'en'].map(l => (
          <button key={l} onClick={() => setTab(l)}
            className={`tab-item ${tab === l ? 'active' : ''}`}
            style={{ border: 'none', background: 'none' }}>
            {l === 'th' ? '🇹🇭 ไทย' : '🇬🇧 English'}
          </button>
        ))}
      </div>

      {/* Title */}
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
          {tab === 'th' ? t.admin.title_th : t.admin.title_en}
        </label>
        <input
          className="input-dark"
          value={form.title[tab]}
          onChange={e => updateField(`title.${tab}`, e.target.value)}
          placeholder={tab === 'th' ? 'ชื่อโจทย์ภาษาไทย' : 'Exercise title in English'}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
          {tab === 'th' ? t.admin.desc_th : t.admin.desc_en}
        </label>
        <textarea
          className="input-dark"
          rows={4}
          value={form.description[tab]}
          onChange={e => updateField(`description.${tab}`, e.target.value)}
          placeholder={tab === 'th' ? 'คำอธิบายโจทย์...' : 'Problem description...'}
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      {/* Hint */}
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
          {tab === 'th' ? t.admin.hint_th : t.admin.hint_en}
        </label>
        <input
          className="input-dark"
          value={form.hint[tab]}
          onChange={e => updateField(`hint.${tab}`, e.target.value)}
          placeholder="คำใบ้..."
        />
      </div>

      {/* Starter code */}
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>{t.admin.starter_code}</label>
        <textarea
          className="input-dark"
          rows={5}
          value={form.starterCode}
          onChange={e => updateField('starterCode', e.target.value)}
          style={{ resize: 'vertical', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}
        />
      </div>

      {/* Test Cases */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{t.exercise.test_cases}</label>
          <button onClick={addTestCase} className="btn-ghost" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Plus size={11} /> {lang === 'th' ? 'เพิ่ม' : 'Add'}
          </button>
        </div>
        {form.testCases.map((tc, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
            <input
              className="input-dark"
              placeholder={`Input ${i + 1} (${lang === 'th' ? 'เว้นว่างถ้าไม่มี' : 'empty if none'})`}
              value={tc.input || ''}
              onChange={e => updateTestCase(i, 'input', e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              className="input-dark"
              placeholder={`Expected Output ${i + 1}`}
              value={tc.expectedOutput || ''}
              onChange={e => updateTestCase(i, 'expectedOutput', e.target.value)}
              style={{ flex: 1 }}
            />
            {form.testCases.length > 1 && (
              <button onClick={() => removeTestCase(i)} style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '0.4rem' }}>
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <X size={14} /> {t.admin.cancel}
        </button>
        <button onClick={() => onSave(form)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Save size={14} /> {t.admin.save}
        </button>
      </div>
    </div>
  );
}

function LessonForm({ initial, onSave, onCancel, lang }) {
  const [form, setForm] = useState(initial);
  const [tab, setTab] = useState('th');

  const updateField = (path, value) => {
    const keys = path.split('.');
    const updated = { ...form };
    let ref = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      ref[keys[i]] = { ...ref[keys[i]] };
      ref = ref[keys[i]];
    }
    ref[keys[keys.length - 1]] = value;
    setForm(updated);
  };

  return (
    <div style={{ background: 'var(--color-bg-card)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '0.875rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Edit Lesson</h3>
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
        {['th', 'en'].map(l => (
          <button key={l} onClick={() => setTab(l)} className={`tab-item ${tab === l ? 'active' : ''}`} style={{ border: 'none', background: 'none' }}>
            {l === 'th' ? '🇹🇭 ไทย' : '🇬🇧 English'}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Title</label>
        <input className="input-dark" value={form.title[tab]} onChange={e => updateField(`title.${tab}`, e.target.value)} />
      </div>
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Content (Markdown)</label>
        <textarea className="input-dark" rows={12} value={form.content[tab]} onChange={e => updateField(`content.${tab}`, e.target.value)} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><X size={14} /> Cancel</button>
        <button onClick={() => onSave(form)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Save size={14} /> Save</button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { modules, exercises, fetchCurriculum } = useCurriculumStore();
  const { lang, t } = useLanguageStore();
  const { user } = useAuthStore();
  const { isLoggedIn, checkAdminStatus, logout, addExercise, updateExercise, deleteExercise, updateLesson } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [adminTab, setAdminTab] = useState('exercises');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAdminStatus(user?.id).finally(() => setIsChecking(false));
  }, [user, checkAdminStatus]);

  if (isChecking) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '6rem auto', padding: '2.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)', borderRadius: '1rem', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '1rem', background: 'rgba(244,63,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', border: '1px solid rgba(244,63,94,0.3)' }}>
          <Shield size={24} style={{ color: '#fb7185' }} />
        </div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem' }}>{lang === 'th' ? 'ไม่มีสิทธิ์เข้าถึง' : 'Access Denied'}</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
          {lang === 'th' ? 'เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถเข้าถึงหน้านี้ได้' : 'Only administrators can access this page.'}
        </p>
      </div>
    );
  }

  const handleSave = async (form) => {
    if (editingId) {
      updateExercise(editingId, form);
      toast.success(lang === 'th' ? 'อัปเดตแล้ว!' : 'Updated!', { style: { background: '#1a1a2e', color: '#34d399' } });
    } else {
      await addExercise(form);
      toast.success(lang === 'th' ? 'เพิ่มโจทย์แล้ว!' : 'Exercise added!', { style: { background: '#1a1a2e', color: '#34d399' } });
    }
    await fetchCurriculum();
    setShowForm(false);
    setEditingId(null);
  };

  const handleSaveLesson = async (form) => {
    await updateLesson(editingId, form);
    await fetchCurriculum();
    toast.success(lang === 'th' ? 'อัปเดตบทเรียนแล้ว!' : 'Lesson updated!', { style: { background: '#1a1a2e', color: '#34d399' } });
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm(lang === 'th' ? 'ต้องการลบโจทย์นี้?' : 'Delete this exercise?')) {
      await deleteExercise(id);
      await fetchCurriculum();
      toast(lang === 'th' ? 'ลบแล้ว' : 'Deleted', { style: { background: '#1a1a2e', color: '#fb7185' } });
    }
  };

  const editingExercise = editingId ? exercises.find(ex => ex.id === editingId) : null;
  const editingLesson = editingId ? modules.flatMap(m => m.lessons).find(l => l.id === editingId) : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{t.admin.title}</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Admin Dashboard</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={logout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={14} /> {t.admin.logout}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setAdminTab('exercises')}
          className={`tab-item ${adminTab === 'exercises' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'จัดการโจทย์ (Exercises)' : 'Manage Exercises'}
        </button>
        <button 
          onClick={() => setAdminTab('lessons')}
          className={`tab-item ${adminTab === 'lessons' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'บทเรียน (Lessons)' : 'Lessons'}
        </button>
        <button 
          onClick={() => setAdminTab('users')}
          className={`tab-item ${adminTab === 'users' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'ผู้เรียน (Users)' : 'Users'}
        </button>
      </div>

      {adminTab === 'users' ? (
        <UserSearchPanel lang={lang} t={t} />
      ) : adminTab === 'lessons' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              {lang === 'th' ? 'บทเรียนทั้งหมด' : 'All Lessons'}
            </h2>
          </div>

          <AnimatePresence>
            {showForm && adminTab === 'lessons' && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <LessonForm
                  initial={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => { setShowForm(false); setEditingId(null); }}
                  lang={lang}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {modules.flatMap(m => m.lessons).map(lesson => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{lesson.title[lang]}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>ID: {lesson.id}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => { setEditingId(lesson.id); setShowForm(true); }}
                    className="btn-ghost"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Edit2 size={12} /> {t.admin.edit}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              {lang === 'th' ? `โจทย์ทั้งหมด (${exercises.length})` : `All Exercises (${exercises.length})`}
            </h2>
            <button
              onClick={() => { setShowForm(true); setEditingId(null); }}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <Plus size={14} /> {t.admin.add_exercise}
            </button>
          </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && adminTab === 'exercises' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <ExerciseForm
              initial={editingExercise}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingId(null); }}
              lang={lang}
              t={t}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Exercises List */}
      <div>
        {exercises.length === 0 ? (
          <div style={{
            padding: '3rem', textAlign: 'center',
            background: 'var(--color-bg-card)',
            border: '1px dashed var(--color-border-subtle)',
            borderRadius: '0.875rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem',
          }}>
            {lang === 'th' ? 'ยังไม่มีโจทย์ที่สร้างเอง กดปุ่ม "เพิ่มโจทย์ใหม่" เพื่อเริ่มต้น' : 'No custom exercises yet. Click "Add New Exercise" to get started.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {exercises.map(ex => {
              const mod = modules.find(m => m.id === ex.moduleId);
              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{ex.title[lang]}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Module {ex.moduleId}: {mod?.title[lang]} •
                      <span style={{ marginLeft: '0.3rem', color: ex.difficulty === 'easy' ? '#10b981' : ex.difficulty === 'medium' ? '#f59e0b' : '#f43f5e' }}>
                        {ex.difficulty}
                      </span>
                      {' '}• {ex.xpReward} XP
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => { setEditingId(ex.id); setShowForm(true); }}
                      className="btn-ghost"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Edit2 size={12} /> {t.admin.edit}
                    </button>
                    <button
                      onClick={() => handleDelete(ex.id)}
                      style={{
                        background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
                        borderRadius: '0.4rem', padding: '0.35rem 0.75rem',
                        color: '#fb7185', cursor: 'pointer', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                      }}
                    >
                      <Trash2 size={12} /> {t.admin.delete}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      </div>
      )}
    </div>
  );
}
