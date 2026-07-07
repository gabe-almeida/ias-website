import * as migration_20260707_154247_initial from './20260707_154247_initial';

export const migrations = [
  {
    up: migration_20260707_154247_initial.up,
    down: migration_20260707_154247_initial.down,
    name: '20260707_154247_initial'
  },
];
