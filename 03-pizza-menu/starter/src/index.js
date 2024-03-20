
import React from "react";
import ReactDom from "react-dom/client";
import { pizzaData } from "./data";
import "./index.css";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>)
}

/*
function Pizza2() {
    return <h2>Pizza2</h2>
}
*/

const Header = () => {

    const style = {};

    return (
        <header className="header footer">
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>)
}

const Menu = () => {
    const pizzas = pizzaData;

    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {pizzas.length > 0 ? (
                <ul className="pizzas">
                    {pizzas.map((pizza, index) => (
                        <Pizza key={pizza.name} num={index} />
                    ))}
                </ul>) : null}
        </div>
    )
}

const Footer = () => {
    return (
        <footer className="footer">
            <Order />
        </footer >
    )
}

const Pizza = ({ num }) => {
    const pizza = pizzaData[num]
    //For Display
    const soldOut = pizza.soldOut ? "Sold Out" : +pizza.price
    //For Classname
    const sold = pizza.soldOut ? "sold-out" : "";
    return (
        <div className={`pizza ${sold}`}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>Made with: {pizza.ingredients}</p>
                <span>Price: {soldOut}</span>
            </div>
        </div>
    )
}

const Order = () => {
    const currentHour = new Date().getHours()
    console.log(currentHour)
    const hours = {
        open: 8,
        close: 22
    }
    const open = (currentHour >= hours.open && currentHour <= hours.close)

    return (
        <div className="order">
            {new Date().toLocaleTimeString()}
            <br />
            {open ? (
                <>
                    <p>We are open until {hours.close}:00. Place an order below</p>
                    <button className="btn">Order</button>
                </>
            ) : (
                <p>We are closed. We open orders at {hours.open}:00</p>
            )}
        </div>
    )

}
const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)