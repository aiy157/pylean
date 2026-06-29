// src/pages/AdminPage.jsx
import { useState } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { useAdminStore } from '../store/adminStore';
import { MODULES } from '../data/curriculum';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Shield, LogOut, Save, X, Lock, Eye } from 'lucide-react';

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

function LoginPanel({ onLogin, lang, t }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const ok = onLogin(pwd);
    if (!ok) { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div style={{
      maxWidth: 400, margin: '6rem auto', padding: '2.5rem',
      background: 'var(--color-bg-card)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: '1rem',
      textAlign: 'center',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '1rem',
        background: 'rgba(124,58,237,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
        border: '1px solid rgba(124,58,237,0.3)',
      }}>
        <Shield size={24} style={{ color: '#a78bfa' }} />
      </div>
      <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem' }}>{t.admin.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
        {lang === 'th' ? 'กรุณาเข้าสู่ระบบเพื่อจัดการโจทย์' : 'Please login to manage exercises'}
      </p>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="password"
          className="input-dark"
          placeholder={t.admin.password}
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ borderColor: error ? 'rgba(244,63,94,0.5)' : undefined }}
        />
        {error && <p style={{ color: '#fb7185', fontSize: '0.8rem', marginTop: '0.4rem' }}>{t.admin.wrong_password}</p>}
      </div>
      <button onClick={handleLogin} className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Lock size={14} /> {t.admin.login}
      </button>
    </div>
  );
}

function ExerciseForm({ initial, onSave, onCancel, lang, t }) {
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
            {MODULES.map(m => (
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

export default function AdminPage() {
  const { lang, t } = useLanguageStore();
  const { isLoggedIn, login, logout, customExercises, addExercise, updateExercise, deleteExercise } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  if (!isLoggedIn) {
    return <LoginPanel onLogin={login} lang={lang} t={t} />;
  }

  const handleSave = (form) => {
    if (editingId) {
      updateExercise(editingId, form);
      toast.success(lang === 'th' ? 'อัปเดตแล้ว!' : 'Updated!', { style: { background: '#1a1a2e', color: '#34d399' } });
    } else {
      addExercise(form);
      toast.success(lang === 'th' ? 'เพิ่มโจทย์แล้ว!' : 'Exercise added!', { style: { background: '#1a1a2e', color: '#34d399' } });
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm(lang === 'th' ? 'ต้องการลบโจทย์นี้?' : 'Delete this exercise?')) {
      deleteExercise(id);
      toast(lang === 'th' ? 'ลบแล้ว' : 'Deleted', { style: { background: '#1a1a2e', color: '#fb7185' } });
    }
  };

  const editingExercise = editingId ? customExercises.find(ex => ex.id === editingId) : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{t.admin.title}</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{t.admin.exercises}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); }}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={15} /> {t.admin.add_exercise}
          </button>
          <button onClick={logout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={14} /> {t.admin.logout}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
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
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
          {lang === 'th' ? `โจทย์ที่สร้างเอง (${customExercises.length})` : `Custom Exercises (${customExercises.length})`}
        </h2>
        {customExercises.length === 0 ? (
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
            {customExercises.map(ex => {
              const mod = MODULES.find(m => m.id === ex.moduleId);
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
  );
}
