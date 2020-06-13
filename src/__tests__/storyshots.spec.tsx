import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'

// https://stackoverflow.com/questions/61706963/typeerror-require-requireactual-is-not-a-function
// Jest deprecated require.requireActual a while back and recently removed it in version 26.
// storybook v6になるまで待つ
// initStoryshots({
//   test: multiSnapshotWithOptions(),
//   stories2snapsConverter: new Stories2SnapsConverter({
//     snapshotsDirName: '../__tests__/__snapshots__/',
//   }),
// })
describe('Storybook', (): void => {
  it.todo('Snapshot TODO')
})
