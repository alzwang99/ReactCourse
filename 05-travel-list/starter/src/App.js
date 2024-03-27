import { useState } from "react"
import { Logo, Form, PackingList, Stats } from "./content"

const initialItems = [
  {
    id: 1, name: "passport", amt: 1, packed: false,
  },
  {
    id: 2, name: "sports pants", amt: 2, packed: false,
  }
]

const App = () => {
  const [items, setItems] = useState(initialItems)
  const handleAddItems = (item) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter(item => item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  const handleClearList = () => {
    setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} items={items} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  );
}

export default App;
