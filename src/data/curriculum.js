// src/data/curriculum.js — Complete curriculum (EXPANDED)
import { module1 } from './modules/module1_flowchart';
import { module2 } from './modules/module2_variables';
import { module3 } from './modules/module3_io';
import { module4 } from './modules/module4_conditionals';
import { module5 } from './modules/module5_loops';
import { module6 } from './modules/module6_lists';
import { module7 } from './modules/module7_functions';

export const MODULES = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
];

export const getModuleById = (id) => MODULES.find(m => m.id === id);
export const getLessonById = (moduleId, lessonId) => {
  const mod = getModuleById(moduleId);
  if (!mod) return null;
  return mod.lessons.find(l => l.id === lessonId);
};
