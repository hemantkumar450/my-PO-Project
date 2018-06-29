import { CartListModule } from './cart-list.module';

describe('CartListModule', () => {
  let cartListModule: CartListModule;

  beforeEach(() => {
    cartListModule = new CartListModule();
  });

  it('should create an instance', () => {
    expect(cartListModule).toBeTruthy();
  });
});
