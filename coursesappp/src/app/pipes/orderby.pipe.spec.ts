import { OrderbyPipe } from './orderby.pipe';
import { stubbedCourses } from './stubbed.data';

describe('OrderByPipe', () => {
    let orderbyPipe: OrderbyPipe;
    beforeEach(() => {
        orderbyPipe = new OrderbyPipe();
    });

    it('create an instance', () => {
        expect(orderbyPipe).toBeTruthy();
    });
    it('should order array by creationDate property in asc order', () => {
        const result = orderbyPipe.transform(stubbedCourses, 'creationDate');
        expect(result[0].id).toEqual(3);
        expect(result[1].id).toEqual(1);
        expect(result[2].id).toEqual(2);
        expect(result[3].id).toEqual(4);
    });
    it('should order array by creationDate property in desc order', () => {
        const result = orderbyPipe.transform(stubbedCourses, 'creationDate', 'desc');
        expect(result[0].id).toEqual(4);
        expect(result[1].id).toEqual(2);
        expect(result[2].id).toEqual(1);
        expect(result[3].id).toEqual(3);
    });
});
