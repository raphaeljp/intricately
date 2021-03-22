import { shallowMount } from '@vue/test-utils';
import CardInput from '@/components/card-input.component.vue';

const factory = (values = {}, props = {}) => shallowMount(CardInput, {
  data() { return { ...values }; },
  propsData: { id: '1', ...props },
});

describe('Card Input Component', () => {
  it('should be mounted', () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
  });

  it('should not have a label if props "hideLabel" is passed', () => {
    const wrapper = factory({}, { hideLabel: true });
    const label = wrapper.find('label');
    expect(label.exists()).toBe(false);
  });

  test('renders correctly', () => {
    const wrapper = factory();
    expect(wrapper).toMatchSnapshot();
  });
});
