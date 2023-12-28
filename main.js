const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);
  let total = counters.reduce((a,c) => a + c.number,0)
  console.log(total);
  console.log('App run', counters);

  // const hdlAddCounter = () => {
  //   let newItem = { id: counters.at(-1).id + 1, number: 0 };
  //   // console.log(newItem);
  //   // let cloneCounters = [...counters]
  //   // cloneCounters.push(newItem)
  //   // // console.log(cloneCounters)
  //   // setCounters(cloneCounters)

  //   // ท่าย่อ
  //   setCounters([...counters, newItem])
  // };

  const hdlAddCounter = () =>
    setCounters([...counters, { 
      id: counters.length === 0 ? 1 : counters.at(-1).id + 1, 
      number: 0 }
    ]);



//  const hdlUpdate = (id, num) => {
//   const CloneCounters = [...counters]
//   let idx = CloneCounters.findIndex(el => el.id === id)
//   if(CloneCounters[idx].number + num < 0){
//    return
//   }
//   CloneCounters[idx].number += num
//   setCounters(CloneCounters)
//  }

const hdlUpdate = (id, num) => setCounters(counters.map( el => ({ ...el, number: (el.id===id && el.number+num >=0) ? el.number + num : el.number })))

//  const hdlDelCounter = (id) => {
//     const cloneCounters = [...counters]
//     let idx = cloneCounters.findIndex(el => el.id === id)
//     cloneCounters.splice(idx,1)
//     setCounters(cloneCounters)
//  }
 // ให้ hdlDelCounter ผลลัพธ์เดียวกัน
// const hdlDelCounter = (id) => setCounters([...counters].filter(el => el.id !== id))

const hdlDelCounter = (id) =>{
    let newState = counters.filter( el => el.id !== id)
    setCounters(newState)
}

  return (
    <>
      <h1 className="text-center">CodeCamp Academy 01</h1>
      <button className="text-center" onClick={hdlAddCounter}>Add Counter</button>
      <Suminfo total={total}/>
      {/* <Counter number={counters[0].number}/>
            <Counter number={counters[1].number}/> */}

      {/* {counters.map(el => {
                let output = <Counter key={el.id} item={el}/>
                return output
            })} */}

      {counters.map((el) => (
        <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelCounter={hdlDelCounter}/>
      ))}
    </>
  );
}

function Suminfo(props) {
  return (
    <div className="suminfo">
      <h1>Sum = {props.total}</h1>
    </div>
  );
}

function Counter(props) {
  return (
    <div className="counter">
      <button onClick={() => props.hdlUpdate(props.item.id, -1)}>-</button>
      <h3>{props.item.number}</h3>
      <button onClick={() => props.hdlUpdate(props.item.id, 1)}>+</button>
      <button onClick={() => props.hdlUpdate(props.item.id, -props.item.number)}>C</button>
      <button onClick={() => props.hdlDelCounter(props.item.id)}>X</button>
    </div>
  );
}