const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.jsx', 'utf-8');

// 1. Add useCurriculumStore import
content = content.replace(
  "import { MODULES } from '../data/curriculum';",
  "import { useCurriculumStore } from '../store/curriculumStore';"
);

// 2. Inject LessonForm before AdminPage
const lessonForm = `
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
          <button key={l} onClick={() => setTab(l)} className={\`tab-item \${tab === l ? 'active' : ''}\`} style={{ border: 'none', background: 'none' }}>
            {l === 'th' ? '🇹🇭 ไทย' : '🇬🇧 English'}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Title</label>
        <input className="input-dark" value={form.title[tab]} onChange={e => updateField(\`title.\${tab}\`, e.target.value)} />
      </div>
      <div style={{ marginBottom: '0.875rem' }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Content (Markdown)</label>
        <textarea className="input-dark" rows={12} value={form.content[tab]} onChange={e => updateField(\`content.\${tab}\`, e.target.value)} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><X size={14} /> Cancel</button>
        <button onClick={() => onSave(form)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Save size={14} /> Save</button>
      </div>
    </div>
  );
}
`;

content = content.replace('export default function AdminPage() {', lessonForm + '\nexport default function AdminPage() {');

// 3. Update AdminPage state to use useCurriculumStore and add lesson editing logic
content = content.replace(
  'const { isLoggedIn, login, logout, customExercises, addExercise, updateExercise, deleteExercise } = useAdminStore();',
  \`const { isLoggedIn, login, logout, addExercise, updateExercise, deleteExercise, updateLesson } = useAdminStore();
  const { modules, exercises, fetchCurriculum } = useCurriculumStore();\`
);

// 4. Update the ExerciseForm module mapping to use modules from store instead of MODULES
content = content.replace(
  '{MODULES.map(m => (',
  '{useCurriculumStore.getState().modules.map(m => ('
);

// 5. Replace 'customExercises' with 'exercises' across the render mapping
content = content.replace(
  'const editingExercise = editingId ? customExercises.find(ex => ex.id === editingId) : null;',
  \`const editingExercise = editingId ? exercises.find(ex => ex.id === editingId) : null;
  const editingLesson = editingId ? modules.flatMap(m => m.lessons).find(l => l.id === editingId) : null;
  
  const handleSaveLesson = async (form) => {
    await updateLesson(editingId, form);
    await fetchCurriculum();
    toast.success(lang === 'th' ? 'อัปเดตบทเรียนแล้ว!' : 'Lesson updated!', { style: { background: '#1a1a2e', color: '#34d399' } });
    setShowForm(false);
    setEditingId(null);
  };\n\`
);

content = content.replace(
  /const handleSave = \(form\) => \{[\s\S]*?setEditingId\(null\);\n  \};/,
  \`const handleSave = async (form) => {
    if (editingId) {
      await updateExercise(editingId, form);
      toast.success(lang === 'th' ? 'อัปเดตแล้ว!' : 'Updated!', { style: { background: '#1a1a2e', color: '#34d399' } });
    } else {
      await addExercise(form);
      toast.success(lang === 'th' ? 'เพิ่มโจทย์แล้ว!' : 'Exercise added!', { style: { background: '#1a1a2e', color: '#34d399' } });
    }
    await fetchCurriculum();
    setShowForm(false);
    setEditingId(null);
  };\n\`
);

content = content.replace(
  /const handleDelete = \(id\) => \{[\s\S]*?\}\n  \};/,
  \`const handleDelete = async (id) => {
    if (confirm(lang === 'th' ? 'ต้องการลบโจทย์นี้?' : 'Delete this exercise?')) {
      await deleteExercise(id);
      await fetchCurriculum();
      toast(lang === 'th' ? 'ลบแล้ว' : 'Deleted', { style: { background: '#1a1a2e', color: '#fb7185' } });
    }
  };\n\`
);

// 6. Add "Lessons" tab button
const tabsReplacement = \`
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setAdminTab('exercises')}
          className={\`tab-item \${adminTab === 'exercises' ? 'active' : ''}\`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'โจทย์ (Exercises)' : 'Exercises'}
        </button>
        <button 
          onClick={() => setAdminTab('lessons')}
          className={\`tab-item \${adminTab === 'lessons' ? 'active' : ''}\`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'บทเรียน (Lessons)' : 'Lessons'}
        </button>
        <button 
          onClick={() => setAdminTab('users')}
          className={\`tab-item \${adminTab === 'users' ? 'active' : ''}\`}
          style={{ border: 'none', background: 'none' }}
        >
          {lang === 'th' ? 'ผู้เรียน (Users)' : 'Users'}
        </button>
      </div>
\`;
content = content.replace(/\{\/\* Tabs \*\/\}[\s\S]*?<\/div>/, tabsReplacement.trim());


// 7. Update rendering logic based on active tab
content = content.replace(
  /\{adminTab === 'users' \? \([\s\S]*?\{\/\* Custom Exercises List \*\//,
  \`{adminTab === 'users' ? (
        <UserSearchPanel lang={lang} t={t} />
      ) : adminTab === 'lessons' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              {lang === 'th' ? \`บทเรียนทั้งหมด\` : \`All Lessons\`}
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
              {lang === 'th' ? \`โจทย์ทั้งหมด (\${exercises.length})\` : \`All Exercises (\${exercises.length})\`}
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

      {/* Custom Exercises List */\`
);

content = content.replace(
  /\{customExercises.length === 0/g,
  '{exercises.length === 0'
);
content = content.replace(
  /customExercises\.map/g,
  'exercises.map'
);
content = content.replace(
  /const mod = MODULES.find\(m => m\.id === ex\.moduleId\);/g,
  'const mod = modules.find(m => m.id === ex.moduleId);'
);

fs.writeFileSync('src/pages/AdminPage.jsx', content, 'utf-8');
console.log('AdminPage updated successfully!');
