import * as chai from 'chai';
import {Merge} from './Merge';

describe('Merge', () => {

  describe('merge', () => {
    it('should the "merge" adds one property from obj2 into obj1', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: 'B obj2',
      };

      const expectedResult = {
        A: 'A obj1',
        B: 'B obj2',
      };
      const expectedObj2 = {
        B: 'B obj2',
      };

      const result = Merge.merge(obj1, obj2);
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" overrides one property from obj2 into obj1', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        A: 'A obj2',
      };

      const expectedResult = {
        A: 'A obj2',
      };
      const expectedObj2 = {
        A: 'A obj2',
      };

      const result = Merge.merge(obj1, obj2);
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays from obj2 into obj1', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: ['B obj2'],
      };

      const expectedResult = {
        A: 'A obj1',
        B: ['B obj2'],
      };
      const expectedObj2 = {
        B: ['B obj2'],
      };

      const result = Merge.merge(obj1, obj2);
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" overrides entries of arrays from obj2 into obj1', () => {
      const obj1 = {
        A: ['B obj1'],
      };
      const obj2 = {
        A: ['A obj2'],
      };

      const expectedResult = {
        A: ['A obj2'],
      };
      const expectedObj2 = {
        A: ['A obj2'],
      };

      const result = Merge.merge(obj1, obj2);
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds one property from obj2 into obj1', () => {
      const obj1 = {A: 'A obj1'};
      const obj2 = {B: 'B obj2'};

      const expectedObj2 = {B: 'B obj2'};
      const expectedResult = {
        A: 'A obj1',
        B: 'B obj2',
      };

      const result = Merge.merge(obj1, obj2, {});
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" overrides entries of arrays from obj2 into obj1', () => {
      const obj1 = {
        A: ['A obj1'],
      };
      const obj2 = {
        B: ['B obj2'],
      };

      const expectedObj2 = {
        B: ['B obj2'],
      };
      const expectedResult = {
        A: ['A obj1'],
        B: ['B obj2'],
      };

      const result = Merge.merge(obj1, obj2, {});
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays by index from obj2 into obj1', () => {
      const obj1 = {
        A: ['A obj1 N1'],
      };
      const obj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };

      const expectedResult = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };
      const expectedObj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };

      const result = Merge.merge(obj1, obj2);
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays by index from obj2 into obj1', () => {
      const obj1 = {
        A: [null, undefined, 'A obj1 N3'],
      };
      const obj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };

      const expectedObj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };
      const expectedResult = {
        A: ['A obj2 N1', 'A obj2 N2', 'A obj1 N3'],
      };

      const result = Merge.merge(obj1, obj2, {});
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays by concat from obj2 into obj1', () => {
      const obj1 = {
        A: ['A obj1 N1'],
      };
      const obj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };

      const expectedResult = {
        A: ['A obj1 N1', 'A obj2 N1', 'A obj2 N2'],
      };
      const expectedObj2 = {
        A: ['A obj2 N1', 'A obj2 N2'],
      };

      const result = Merge.merge(obj1, obj2, {arrayMode: 'concat'});
      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays by reference from obj2 into obj1', () => {
      const arrayObj1 = ['A obj1 N1'];
      const obj1 = {
        A: arrayObj1,
      };
      const arrayObj2 = ['A obj2 N1', 'A obj2 N2'];
      const obj2 = {
        A: arrayObj2,
      };

      const expectedResult = {
        A: ['A obj2 N1', 'A obj2 N2', 'A obj2 N3'],
      };
      const expectedObj2 = {
        A: ['A obj2 N1', 'A obj2 N2', 'A obj2 N3'],
      };

      const result = Merge.merge(obj1, obj2, {arrayMode: 'reference'});

      arrayObj1.push('A obj1 N2');
      arrayObj2.push('A obj2 N3');

      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    it('should the "merge" adds entries of arrays by reference from obj2 into obj1', () => {
      const arrayObj1 = ['A obj1 N1'];
      const obj1 = {
        A: arrayObj1,
      };
      const arrayObj2 = ['A obj2 N1', 'A obj2 N2'];
      const obj2 = {
        A: arrayObj2,
      };

      const expectedResult = {
        A: ['A obj2 N1', 'A obj2 N2', 'A obj2 N3'],
      };
      const expectedObj2 = {
        A: ['A obj2 N1', 'A obj2 N2', 'A obj2 N3'],
      };

      const result = Merge.merge(obj1, obj2, {arrayMode: 'reference'});

      arrayObj1.push('A obj1 N2');
      arrayObj2.push('A obj2 N3');

      chai.expect(result).to.deep.equal(expectedResult);
      chai.expect(obj1).to.deep.equal(expectedResult);
      chai.expect(obj2).to.deep.equal(expectedObj2);
    });

    // ### one merge iteration

    it('should the "merge" add context for one merge iteration (obj2 into obj1) for one string property', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: 'B obj2',
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.A).to.be.undefined;
      chai.expect(result._context.B).to.equal('mergeONE');
    });

    it('should the "merge" add context for one merge iteration (obj2 into obj1) for one array property', () => {
      const obj1 = {
        A: ['A obj1'],
      };
      const obj2 = {
        B: ['B obj2'],
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.A).to.be.undefined;
      chai.expect(result._context.B).to.equal('mergeONE');
      chai.expect(result.B._context['0']).to.equal('mergeONE');
    });

    it('should the "merge" add context for one merge iteration (obj2 into obj1) for one complex array property', () => {
      const obj1 = {
        A3: [{
          p0: 'p0',
          p1: 'p1',
          p2: {p22: 'p22', p23: 'p23'},
        }, {
          t0: 't0',
        }],
      };
      const obj2 = {
        A3: [{
          p1: 'p1',
          p2: {p22: 'p22'},
        }],
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.A3).to.equal('mergeONE');
      chai.expect(result.A3._context['0']).to.equal('mergeONE');
      chai.expect(result.A3._context['1']).to.be.undefined;

      chai.expect(result.A3[0]._context.p0).to.be.undefined;
      chai.expect(result.A3[0]._context.p1).to.equal('mergeONE');
      chai.expect(result.A3[0]._context.p2).to.equal('mergeONE');
      chai.expect(result.A3[0].p2._context.p22).to.equal('mergeONE');
      chai.expect(result.A3[0].p2._context.p23).to.be.undefined;
    });

    it('should the "merge" add context for one merge iteration (obj2 into obj1) for one string property', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: 'B obj2',
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.A).to.be.undefined;
      chai.expect(result._context.B).to.equal('mergeONE');
      chai.expect(result._context.C).to.be.undefined;
    });

    it('should the "merge" add context for one merge iteration (obj2 into obj2) for one array property', () => {
      const obj1 = {
        A: ['A obj1'],
      };
      const obj2 = {
        B: ['B obj2'],
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.B).to.equal('mergeONE');
      chai.expect(result.B._context['0']).to.equal('mergeONE');
    });

    it('should the "merge" add context for one merge iteration (obj2 into obj1) for one complex array property', () => {
      const obj1 = {
        A3: [{
          p0: 'p0',
          p1: 'p1',
          p2: {p22: 'p22', p23: 'p23'},
        }, {
          t0: 't0',
        }],
      };
      const obj2 = {
        A3: [{
          p1: 'p1',
          p2: {p22: 'p22'},
          p6: 'p6',
        }],
      };

      const result = Merge.merge(obj1, obj2, {context: 'mergeONE'});

      chai.expect(result._context.A3).to.equal('mergeONE');
      chai.expect(result.A3._context['0']).to.equal('mergeONE');
      chai.expect(result.A3._context['1']).to.be.undefined;

      chai.expect(result.A3[0]._context.p0).to.be.undefined;
      chai.expect(result.A3[0]._context.p1).to.equal('mergeONE');
      chai.expect(result.A3[0]._context.p2).to.equal('mergeONE');
      chai.expect(result.A3[0].p2._context.p22).to.equal('mergeONE');

      chai.expect(result.A3[0]._context.p6).to.equal('mergeONE');
      chai.expect(result.A3[0]._context.p3).to.be.undefined;
      chai.expect(result.A3[0]._context.p4).to.be.undefined;
    });

    // ### multiple merge iteration

    it('should the "merge" add context for multiple merge iterations (obj2 into obj1) for one string property', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: 'B obj2',
      };
      const obj2bis = {
        C: 'C obj2bis',
      };

      let result = Merge.merge(obj1, obj2, {context: 'mergeONE'});
      result = Merge.merge(result, obj2bis, {context: 'mergeTWO'});

      chai.expect(result._context.A).to.be.undefined;
      chai.expect(result._context.B).to.equal('mergeONE');
      chai.expect(result._context.C).to.equal('mergeTWO');
    });

    it('should the "merge" add context for multiple merge iterations (obj2 into obj1) for one array property', () => {
      const obj1 = {
        A: ['A obj1'],
      };
      const obj2 = {
        B: ['B obj2'],
      };
      const obj2bis = {
        C: ['C obj2bis'],
      };

      let result = Merge.merge(obj1, obj2, {context: 'mergeONE'});
      result = Merge.merge(result, obj2bis, {context: 'mergeTWO'});

      chai.expect(result._context.A).to.be.undefined;
      chai.expect(result._context.B).to.equal('mergeONE');
      chai.expect(result.B._context['0']).to.equal('mergeONE');
      chai.expect(result._context.C).to.equal('mergeTWO');
      chai.expect(result.C._context['0']).to.equal('mergeTWO');
    });

    it('should the "merge" add context for multiple merge iterations (obj2 into obj1) for one complex array property', () => {
      const obj1 = {
        A3: [{
          p0: 'p0',
          p1: 'p1',
          p2: {p22: 'p22', p23: 'p23'},
        }, {
          t0: 't0',
        }],
      };
      const obj2 = {
        A3: [{
          p1: 'p1',
          p2: {p22: 'p22'},
        }],
      };
      const obj2bis = {
        A3: [{
          p11: 'p11',
          p2: {p43: 'p43'},
        }],
      };

      let result = Merge.merge(obj1, obj2, {context: 'mergeONE'});
      result = Merge.merge(result, obj2bis, {context: 'mergeTWO'});

      chai.expect(result._context.A3).to.equal('mergeTWO');
      chai.expect(result.A3._context['0']).to.equal('mergeTWO');
      chai.expect(result.A3._context['1']).to.be.undefined;

      chai.expect(result.A3[0]._context.p0).to.be.undefined;
      chai.expect(result.A3[0]._context.p1).to.equal('mergeONE');
      chai.expect(result.A3[0]._context.p11).to.equal('mergeTWO');
      chai.expect(result.A3[0]._context.p2).to.equal('mergeTWO');
      chai.expect(result.A3[0].p2._context.p22).to.equal('mergeONE');
      chai.expect(result.A3[0].p2._context.p23).to.be.undefined;
      chai.expect(result.A3[0].p2._context.p43).to.equal('mergeTWO');
    });

    it('should the "merge" add context for multiple merge iteration (obj2 and obj1) for one string property', () => {
      const obj1 = {
        A: 'A obj1',
      };
      const obj2 = {
        B: 'B obj2',
      };
      const obj3 = {
        B: 'B obj3',
      };

      const result = Merge.merge(obj1, obj2, {context: 'obj2'});
      const result2 = Merge.merge(result, obj3, {context: 'obj3'});

      chai.expect(result2._context.A).to.be.undefined;
      chai.expect(result2._context.B).to.equal('obj3');
    });

    it('should the "merge" add context for multiple merge iteration (obj2 and obj1) for one array property', () => {
      const obj1 = {
        A: ['A obj1'],
      };
      const obj2 = {
        B: ['B obj2'],
      };
      const obj3 = {
        B: ['B obj3'],
      };

      const result = Merge.merge(obj1, obj2, {context: 'obj2'});
      const result2 = Merge.merge(result, obj3, {context: 'obj3'});

      chai.expect(result2._context.B).to.equal('obj3');
      chai.expect(result2.B._context['0']).to.equal('obj3');
      chai.expect(result2._context.A).to.be.undefined;
    });

    it('should the "merge" add context for multiple merge iteration (obj2 and obj1) for one complex array property', () => {
      const obj1 = {
        A3: [{
          p0: 'p0',
          p1: 'p1',
          p2: {p22: 'p22', p23: 'p23'},
        }, {
          t0: 't0',
        }],
      };
      const obj2 = {
        A3: [{
          p1: 'p1',
          p2: {p22: 'p22'},
          p6: 'p6',
        }],
      };
      const obj3 = {
        A3: [{
          p1: 'p1',
          p2: {p22: 'p22'},
          p7: 'p7',
        }],
      };

      const result = Merge.merge(obj1, obj2, {context: 'obj2'});
      const result2 = Merge.merge(result, obj3, {context: 'obj3'});

      chai.expect(result2._context.A3).to.equal('obj3');
      chai.expect(result2.A3._context['0']).to.equal('obj3');
      chai.expect(result2.A3._context['1']).to.be.undefined;

      chai.expect(result2.A3[0]._context.p0).to.be.undefined;
      chai.expect(result2.A3[0]._context.p1).to.equal('obj3');
      chai.expect(result2.A3[0]._context.p2).to.equal('obj3');
      chai.expect(result2.A3[0].p2._context.p22).to.equal('obj3');
      chai.expect(result2.A3[0].p2._context.p23).to.be.undefined;

      chai.expect(result2.A3[0]._context.p6).to.equal('obj2');
    });

    it('should merge array value even if property in obj1 does not exist', () => {
      const obj1 = {};

      const obj2 = {
        'dockerclient::images:%{unique_id}:multiselect': [
          '1',
          '2',
          '4',
          '5',
        ],
        'dockerclient::images:%{unique_id}:name': 'name mod',
        'dockerclient::images:%{unique_id}:sid': 'AESN',
      };

      const result = Merge.merge(obj1, obj2, {context: '5ab24fddc2be4c1a14dc8a90', allowUndefined: true});

      chai.expect(result['dockerclient::images:%{unique_id}:multiselect']).to.eql([
        '1',
        '2',
        '4',
        '5',
      ]);
    });

    it('should return context for arrays', () => {

      const obj1 = {
        a: [],
        b: 'valu',
      };

      const obj2 = {};

      const result1 = Merge.merge({}, obj1, {context: 'obj1'});
      const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

      chai.expect(result2['_context']['b']).equal('obj1');
      chai.expect(result2['_context']['a']).equal('obj1');
    });

    describe('merge with different types', () => {

      it('should return empty object', () => {

        const obj1 = {a: ''};
        const obj2 = {a: {}};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).deep.equal({});
      });

      it('should return empty array', () => {

        const obj1 = {a: ''};
        const obj2 = {a: []};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).deep.equal([]);
      });

      it('should return empty string (overriding object)', () => {

        const obj1 = {a: {}};
        const obj2 = {a: ''};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).equal('');
      });

      it('should return empty string (overriding array)', () => {

        const obj1 = {a: []};
        const obj2 = {a: ''};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).equal('');
      });

      it('should return empty array (overriding an object)', () => {

        const obj1 = {a: {}};
        const obj2 = {a: []};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).deep.equal([]);
      });

      it('should return empty object (overriding an array)', () => {

        const obj1 = {a: []};
        const obj2 = {a: {}};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).deep.equal({});
      });

      it('should return array of empty object', () => {

        const obj1 = {a: ['']};
        const obj2 = {a: [{}]};

        const result1 = Merge.merge({}, obj1, {context: 'obj1'});
        const result2 = Merge.merge(result1, obj2, {context: 'obj2'});

        chai.expect(result2['a']).deep.equal([{}]);
      });
    });
  });
});
