import { mount } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

describe('asd', () => {
  it('test', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'test',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
