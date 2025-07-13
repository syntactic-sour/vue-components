import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheModal from '../TheModal.vue'

describe('TheModal', () => {
  it('renders properly', async () => {
    const wrapper = mount(TheModal, { props: { heading: 'Hello Vitest' } })
    await wrapper.get('button').trigger('click')
    const dialog = document.body.querySelector('dialog')
    expect(dialog?.innerText).toContain('Hello Vitest')
  })
})
