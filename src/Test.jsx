export const UseTest = () => {
    return (
    <div>
        <h1>Test title</h1>
        <svg>
            <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
        </svg>
        <form>
            <input type="text" />
        </form>
    </div>
    )
}

// export function TodoList() {
//     return (
//         <>
//         <h1>Hedy Lamarr's Todos</h1>
//         <img 
//             src="https://i.imgur.com/yXOvdOSs.jpg" 
//             alt="Hedy Lamarr" 
//             className="photo"
//         />
//         <ul>
//             <li>Invent new traffic lights </li>
//             <li>Rehearse a movie scene </li>
//             <li>Improve the spectrum technology </li>
//         </ul>
//         </>
//     )
// }

export function Avatar() {
    const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
    const description = "Gregorio Y. Zara";
    return (
        <img
          className="avatar"
          src={avatar}
          alt={description}
        />
    );
}

const today = new Date();

function formateDate(date) {
    return new Intl.DateTimeFormat(
        'en-US',
        { weekday: 'long' }
    ).format(date);
}

export function TodoList() {
    const name = 'Hedy Lamarr';
    return (
        <h1>Todo List for {formateDate(today)}</h1>
    )
}

export function Animals() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    return(
        <div>
          <h1>Animals: </h1>
          <ul>
            {animals.map((animal) => {
              return <li key={animal}>{animal}</li>
            })}
          </ul>
        </div>
    );
}

function ListItem(props) {
    return <li>{props.animal}</li>;
}

function List(props) {
    return (
        <>
          {!props.animals && <div>Loading...</div>}
          {props.animals && props.animals.length > 0 && (
            <ul>
              {props.animals.map((animal) => {
                return <li key={animal}>{animal}</li>;
              })}
            </ul>
          )}
          {props.animals && props.animals.length === 0 && <div>There are no animals in the list!</div>}
        </>
      );
}

export function App() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    return (
        <div>
          <h1>Animals: </h1>
          <List animals={animals} />
        </div>
    );
}