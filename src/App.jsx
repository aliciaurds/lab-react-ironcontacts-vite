import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";
console.log(allContacts);
function App() {
  //Iteration 1, mostrar solo los primeros 5 contactos 
  //*anteriormente: const contacts = allContacts.slice(0, 5);
  const [contactsToShow, setContactsToShow] = useState(allContacts.splice(0, 5));
  //IT 3, funcion que maneje mi "event lister"
  const handleRandomContact = () => {
    //buscar un random index
    const randomIndex = Math.floor(Math.random() * allContacts.length);
    //mi contacto random => de mi lista de contactos con un indice aleatorio
    const randomContact = allContacts[randomIndex];
    //no necesito hacer shift porque ya el randomContacto me da el elemento. Además shift solo se aplia a arrays, y esto es un obj
    //TODO Necesito eliminarlo del json y ademas tambien conseguir que los contactos iniciales tampoco se repitan (splice)
    console.log(randomContact);
    //para añadirlo a mi array tengo que clonarlo para no mutar el original
    const clone = JSON.parse(JSON.stringify(contactsToShow));
    const cloneallContacts = JSON.parse(JSON.stringify(allContacts));
    clone.unshift(randomContact);
    cloneallContacts.splice(randomIndex, 1); //!no funciona
    setContactsToShow(clone);
  };
  const handleSortbyName = () => {
    const clone = JSON.parse(JSON.stringify(contactsToShow));
    clone.sort((a, b) => a.name.localeCompare(b.name));
    setContactsToShow(clone);
  }
   //1. se realiza una copia
  //2. utilizamos sort para ordenarlo por nombrem comparando un elemento "a" y otro "b", el localcompare los ordena alfabeticamente
  //3. actualizamos estado
  const handleSortbyPopularity = () => {
    const clone = JSON.parse(JSON.stringify(contactsToShow));
    clone.sort((a, b) => b.popularity - a.popularity); //ordenar por popularity de mayor a menor. Si la resta es positiva "b" irá antes que "a"
    setContactsToShow(clone);
  }
 
  return (
    <div className="App">
      <h1>IronContacts</h1>
      {/* //Boton con mi metodo "handleRandomContact" */}
      <button onClick={handleRandomContact}>Add Random Contact</button> 
      <button onClick={handleSortbyName}>Sort by name</button>
      <button onClick={handleSortbyPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
        {/* map para iterar sobre el array y ejecutar por cada elemento, en este caso quiero visualizar mi randomContact */}
           {contactsToShow.map((eachContact) => (
            <tr key={eachContact.id}>
              <td>
                <img
                  src={eachContact.pictureUrl}
                  alt="contactPic"
                  width="100px"
                />
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity.toFixed(2)}</td>
              <td>{eachContact.wonOscar === true &&  "🏆" }</td>
              <td>{eachContact.wonEmmy === true && "🌟"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
