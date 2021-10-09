const array = ["a", "b", "c"];
const result = array.reduce((result, element) => {
  result.push(element);
  return result;
}, []);
console.log(result);
