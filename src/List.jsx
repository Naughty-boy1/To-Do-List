
function List(){
const fruits = [{id: 1, name: "apple", calorles: 95},
     {id: 2, name: "orange", calorles: 45},
     {id: 3, name: "banana", calorles: 105},
      {id: 4, name: "pineapple", calorles: 37}];
    //   fruits.sort((a, b) => a.name.localeCompare(b.name));   //Alphatical
      fruits.sort((a, b) => b.name.localeCompare(a.name))
const listItems = fruits.map(fruit => <li Key={fruit.id}>
    {fruit.name}: &nbsp;
<b>{fruit.calorles}</b></li>);
return (<ol>{listItems}</ol>);
}
export default List