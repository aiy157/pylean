import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: lessons } = await supabase.from('lessons').select('id, module_id');
  const { data: exercises } = await supabase.from('exercises').select('id, module_id');
  console.log('Lessons:', lessons?.length, 'Exercises:', exercises?.length);
  
  if (lessons && exercises) {
    const modules = {};
    lessons.forEach(l => {
      modules[l.module_id] = modules[l.module_id] || { lessons: [], exercises: [] };
      modules[l.module_id].lessons.push(l.id);
    });
    exercises.forEach(e => {
      modules[e.module_id] = modules[e.module_id] || { lessons: [], exercises: [] };
      modules[e.module_id].exercises.push(e.id);
    });
    
    console.log(JSON.stringify(modules, null, 2));
  }
}
run();
