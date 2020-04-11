import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'

initStoryshots({
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '../__tests__/__snapshots__/'
  })
})
