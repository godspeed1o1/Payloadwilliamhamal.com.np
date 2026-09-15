import * as migration_20260915_151908_initial from './20260915_151908_initial';

export const migrations = [
  {
    up: migration_20260915_151908_initial.up,
    down: migration_20260915_151908_initial.down,
    name: '20260915_151908_initial'
  },
];
