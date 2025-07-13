import type { Meta, StoryObj } from '@storybook/vue3-vite'

// import { fn } from 'storybook/test'

import TheModal from '../TheModal.vue'

const meta = {
  title: 'Components/TheModal',
  component: TheModal,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
  parameters: {
    pageLayout: 'page',
  },
} satisfies Meta<typeof TheModal>

export default meta

export const Primary: StoryObj = {
  render: () => ({
    components: { TheModal },
    template:
      '<main><TheModal heading="My modal"><div>Content <button>Yo!</button></div></TheModal></main>',
  }),
  args: {
    primary: true,
    label: 'Modal',
  },
}
