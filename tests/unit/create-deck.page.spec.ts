import { shallowMount } from '@vue/test-utils';
import NewDeck from '@/views/deck/create-deck.page.vue';
import CardInput from '@/components/card-input.component.vue';

const factory = (values = {}) => shallowMount(NewDeck, {
  data() { return { ...values }; },
});

describe('Create deck page', () => {
  it('should be mounted', () => {
    const wrapper = factory();
    expect(wrapper).toBeTruthy();
  });

  it('should have CardInput Component', () => {
    const wrapper = factory();
    const inputs = wrapper.getComponent(CardInput);
    expect(inputs).toBeTruthy();
  });

  it('should have 11 inputs on page', () => {
    const wrapper = factory();
    const inputs = wrapper.findAllComponents(CardInput);
    expect(inputs).toHaveLength(11);
  });

  test('renders correctly', () => {
    const wrapper = factory();
    expect(wrapper).toMatchSnapshot();
  });
});
