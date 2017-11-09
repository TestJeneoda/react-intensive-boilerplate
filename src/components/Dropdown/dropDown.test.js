import { Dropdown } from './index';

describe('Dropdown', () => {
    describe('toggleDropdown', () => {
        it('toggleDropdown should not return anything', () => {
            expect(Dropdown.toggleDropdown).toBeUndefined();
        });

        it('setDropDownOption should be a function', () => {
            expect(typeof Dropdown).toBe('function');
        });
    });
});
