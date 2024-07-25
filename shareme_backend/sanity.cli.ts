import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'projectid',
    dataset: 'production'
  }
})
