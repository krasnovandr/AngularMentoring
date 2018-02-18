import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
    let pipe: DurationPipe;

    beforeEach(() => {
        pipe = new DurationPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should transform duration into hours correctly', () => {
        expect(pipe.transform(120)).toEqual('2 h');
    });
    it('should transform duration into hours correctly and minutes correclty', () => {
        expect(pipe.transform(125)).toEqual('2 h 5 min');
    });
    it('should transform duration into hours correctly and minutes correclty', () => {
        expect(pipe.transform(0)).toEqual('');
    });
    it('should transform duration into hours correctly and minutes correclty', () => {
        expect(pipe.transform(-1)).toEqual('');
    });
});
