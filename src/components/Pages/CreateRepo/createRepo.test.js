import { gitIgnore, license, CreateRepo } from './index';

describe('CreateRepoTests', () => {
        it('gitIgnore and license should be objects', () => {
            expect(typeof gitIgnore).toBe('object');
            expect(typeof license).toBe('object');
        });

        it('CreateRepo should be functions', () => {
            expect(typeof CreateRepo).toBe('function');
        });
});

