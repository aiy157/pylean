// src/data/exercises.js — Aggregated Exercise Bank
import { exercises1 } from './exercises/module1_flowchart_exercises';
import { exercises2 } from './exercises/module2_variables_exercises';
import { exercises3 } from './exercises/module3_io_exercises';
import { exercises4 } from './exercises/module4_conditionals_exercises';
import { exercises5 } from './exercises/module5_loops_exercises';
import { exercises6 } from './exercises/module6_lists_exercises';
import { exercises7 } from './exercises/module7_functions_exercises';

export const DEFAULT_EXERCISES = [
  ...exercises1,
  ...exercises2,
  ...exercises3,
  ...exercises4,
  ...exercises5,
  ...exercises6,
  ...exercises7,
];
