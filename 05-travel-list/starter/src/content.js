'use strict'

import { useState } from "react"

export const Logo = () => {
    return (<h1>🌴 Far Away 💼</h1>)
}

export const Form = ({ onAddItems, items }) => {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1)
    const [counter, setCounter] = useState(items.length)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description) return;
        setCounter(counter => counter + 1)
        const newItem = { id: counter + 1, name: description, amt: quantity, packed: false }
        onAddItems(newItem)

        setDescription("")
        setQuantity(1)
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What are we bringing to the trip? 🧳</h3>
            <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
                {Array.from({ length: 20 }, (_, i) => i + 1)
                    .map(val =>
                        <option value={val} key={val}>
                            {val}
                        </option>)}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <button>Add</button>
        </form>
    )
}

export const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {

    const [sortBy, setSortBy] = useState("input")

    let sortedItems;

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === "name") sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item item={item} deleteItem={onDeleteItem} toggleItem={onToggleItem} key={item.id} />)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="name">Sort by name</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    )
}

export const Item = ({ item, deleteItem, toggleItem }) => {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => toggleItem(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.amt} {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)}>❌</button>
        </li>
    )
}

export const Stats = ({ items }) => {

    if (!items.length) return (
        <footer className="stats">
            <p>You need to start packing now</p>
        </footer>
    )

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length
    const percentPacked = Math.round((numPacked / numItems) * 100)

    return (
        <footer className="stats">
            {percentPacked === 100 ? `You have packed everything today` :
                percentPacked === 0 ? `You need to start packing soon` :
                    `You have ${numItems} items on your list and you already packed ${numPacked} item or (${percentPacked})%`
            }
        </footer>
    )
}