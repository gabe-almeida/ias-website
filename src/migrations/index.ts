import * as migration_20260707_154247_initial from './20260707_154247_initial';
import * as migration_20260713_225815_submissions from './20260713_225815_submissions';

export const migrations = [
  {
    up: migration_20260707_154247_initial.up,
    down: migration_20260707_154247_initial.down,
    name: '20260707_154247_initial',
  },
  {
    up: migration_20260713_225815_submissions.up,
    down: migration_20260713_225815_submissions.down,
    name: '20260713_225815_submissions'
  },
];
