export const abilitiesColumns = [
  { title: 'name', field: 'name' },
  { title: 'group', field: 'group' },
  { title: 'type', field: 'type' },
  { title: 'specialty', field: 'specialty' },
  { title: 'target', field: 'target' },
  { title: 'recoil', field: 'recoil' },
  { title: 'effect', field: 'effect' },
]

export const itemsColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Number', field: 'number', type: 'numeric' as 'numeric' },
  { title: 'Value', field: 'j', type: 'numeric' as 'numeric' },
  { title: 'Weight', field: 'weight', type: 'numeric' as 'numeric' },
  { title: 'Type', field: 'type' },
  { title: 'Area', field: 'area' },
  { title: 'Specialty', field: 'specialty' },
  { title: 'Target', field: 'target' },
  { title: 'Trait', field: 'trait' },
  { title: 'Effect', field: 'effect' },
]

export const equipmentColumns = [
  { title: 'Type', field: 'type' },
  { title: 'Specialty', field: 'specialty' },
  { title: 'Target', field: 'target' },
  { title: 'Trait', field: 'trait' },
  { title: 'Effect', field: 'effect' },
]

export const statusAilments = [
  {
    name: 'Poison',
    effect:
      'Character takes 1D6 damage to their [Stamina] at the end of each round. Does not cause Body Part damage.',
  },
  {
    name: 'Burning',
    effect:
      'At the end of each round, character takes 1 damage to [Willpower] and [Stamina]。',
  },
  {
    name: 'Paralysis',
    effect: 'The results of all checks made by this character are -1',
  },
  {
    name: 'Captured',
    effect: 'The results of all Hit Checks made by this character are -1.',
  },
  {
    name: 'Downed',
    effect: 'The results of all Evasion Checks made by this character are -2.',
  },
  {
    name: 'Heavily Wounded',
    effect: 'The results of all Death Checks made by this character are -1.',
  },
  {
    name: 'Exposed',
    effect:
      'All data on this character is revealed. Also, all damage dealt to this character through attacks is +1.',
  },
]

export const items = []
