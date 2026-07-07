import { createClient } from '@supabase/supabase-js';
import { MODULES } from './src/data/curriculum.js';
import { DEFAULT_EXERCISES } from './src/data/exercises.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('Migrating Modules...');
  for (const mod of MODULES) {
    const { error } = await supabase.from('modules').upsert({
      id: mod.id,
      title: mod.title,
      description: mod.description,
      required_xp: mod.requiredXP || 0
    });
    if (error) {
      console.error(`Failed to upsert module ${mod.id}:`, error.message);
      return;
    }

    console.log(`Migrating Lessons for Module ${mod.id}...`);
    for (let i = 0; i < mod.lessons.length; i++) {
      const lesson = mod.lessons[i];
      const { error: err2 } = await supabase.from('lessons').upsert({
        id: lesson.id,
        module_id: mod.id,
        order: i,
        title: lesson.title,
        content: lesson.content,
        xp_reward: lesson.xpReward || 10
      });
      if (err2) {
        console.error(`Failed to upsert lesson ${lesson.id}:`, err2.message);
        return;
      }
    }
  }

  console.log('Migrating Default Exercises...');
  for (let i = 0; i < DEFAULT_EXERCISES.length; i++) {
    const ex = DEFAULT_EXERCISES[i];
    const { error } = await supabase.from('exercises').upsert({
      id: ex.id,
      module_id: ex.moduleId,
      difficulty: ex.difficulty,
      "order": ex.order || i,
      title: ex.title,
      description: ex.description,
      starter_code: ex.starterCode,
      hint: ex.hint,
      test_cases: ex.testCases,
      xp_reward: ex.xpReward,
      is_custom: false
    });
    if (error) {
      console.error(`Failed to upsert exercise ${ex.id}:`, error.message);
      return;
    }
  }

  console.log('Migration complete!');
}

migrate();
