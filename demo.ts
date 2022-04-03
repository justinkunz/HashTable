import HashTable from './index';

const table = new HashTable();

table.setItem('foo', 4);
console.log(table.getItem('foo'));

table.setItem('foo', 5);
console.log(table.getItem('foo'));

table.setItem('foo', 6);
console.log(table.getItem('foo'));

table.setItem('bar', 'ahh');

console.log(table.getItem('foo'));
console.log(table.getItem('bar'));
console.log(table.getItem('baz'));

table.setItem('baz', 'bop');
console.log(table.getItem('baz'));

console.log(table.has('hello'));

table.setItem('hello', 'world');
console.log(table.getItem('hello'));
