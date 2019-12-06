# deep-merge
[![Build Status](https://travis-ci.com/henry781/deep-merge.svg?branch=master)](https://travis-ci.com/henry781/deep-merge)

Deep merge allows to merge with context.
```
const obj1 = {
    A: 'A obj1',
};
const obj2 = {
    B: 'B obj2',
};

let result = Merge.merge({}, obj1, {context: 'obj1'});
result = Merge.merge(result, obj2, {context: 'obj2'});

console.log(result._context.A);
// obj1

console.log(result._context.B);
// obj2

console.log(result);
// {
//    A: "A obj1",
//    B: "B obj2"
// }
```
