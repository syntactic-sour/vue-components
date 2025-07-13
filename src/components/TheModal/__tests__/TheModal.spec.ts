import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheModal from '../TheModal.vue'

describe('TheModal', () => {
  it('renders properly', () => {
    const wrapper = mount(TheModal, { props: { heading: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
