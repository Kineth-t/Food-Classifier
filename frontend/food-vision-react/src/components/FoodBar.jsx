import cakeImg from "../assets/Icons/cake.png"
import chickenWingImg from "../assets/Icons/chicken-wing.png"
import cupcakeImg from "../assets/Icons/cupcake.png"
import friesImg from "../assets/Icons/fries.png"
import hamburgerImg from "../assets/Icons/hamburger.png"
import hotdogImg from "../assets/Icons/hotdog.png"
import iceCreamImg from "../assets/Icons/ice-cream.png"
import pizzaImg from "../assets/Icons/pizza.png"
import ramenImg from "../assets/Icons/ramen.png"
import riceImg from "../assets/Icons/rice.png"
import spagImg from "../assets/Icons/spaghetti.png"
import steakImg from "../assets/Icons/steak.png"
import sushiImg from "../assets/Icons/sushi.png"
import tacosImg from "../assets/Icons/tacos.png"
import toastImg from "../assets/Icons/toast.png"
import barImg from "../assets/Icons/barq.png"
import cheeseCakeImg from "../assets/Icons/cheese-cake.png"
import kebabImg from "../assets/Icons/kebab.png"
import saladImg from "../assets/Icons/salad.png"
import eggImg from "../assets/Icons/egg.png"
import donutImg from "../assets/Icons/donut.png"
import iceCream1Img from "../assets/Icons/ice-cream1.png"
import sandwichImg from "../assets/Icons/sandwich.png"
import tapasImg from "../assets/Icons/tapas.png"
import wrapImg from "../assets/Icons/wrap.png"
import soupImg from "../assets/Icons/soup.png"

import './FoodBar.css'

export default function FoodBar() {
    return (
        <div className="slider" style={{ '--width': '70px', '--height': '70px', '--quantity': '26'}}>
            <div className="list">
                <div className="item" style={{'--position': '1'}}>
                    <img src={cakeImg} />
                </div>
                <div className="item" style={{'--position': '2'}}>
                    <img src={chickenWingImg} />
                </div>
                <div className="item" style={{'--position': '3'}}>
                    <img src={cupcakeImg} />
                </div>
                <div className="item" style={{'--position': '4'}}>
                    <img src={friesImg} />
                </div>
                <div className="item" style={{'--position': '5'}}>
                    <img src={hamburgerImg} />
                </div>
                <div className="item" style={{'--position': '6'}}>
                    <img src={hotdogImg} />
                </div>
                <div className="item" style={{'--position': '7'}}>
                    <img src={iceCreamImg} />
                </div>
                <div className="item" style={{'--position': '8'}}>
                    <img src={pizzaImg} />
                </div>
                <div className="item" style={{'--position': '9'}}>
                    <img src={ramenImg} />
                </div>
                <div className="item" style={{'--position': '10'}}>
                    <img src={riceImg} />
                </div>
                <div className="item" style={{'--position': '11'}}>
                    <img src={spagImg} />
                </div>
                <div className="item" style={{'--position': '12'}}>
                    <img src={steakImg} />
                </div>
                <div className="item" style={{'--position': '13'}}>
                    <img src={sushiImg} />
                </div>
                <div className="item" style={{'--position': '14'}}>
                    <img src={tacosImg} />
                </div>
                <div className="item" style={{'--position': '15'}}>
                    <img src={toastImg} />
                </div>
                <div className="item" style={{'--position': '16'}}>
                    <img src={barImg} />
                </div>
                <div className="item" style={{'--position': '17'}}>
                    <img src={cheeseCakeImg} />
                </div>
                <div className="item" style={{'--position': '18'}}>
                    <img src={kebabImg} />
                </div>
                <div className="item" style={{'--position': '19'}}>
                    <img src={saladImg} />
                </div>
                <div className="item" style={{'--position': '20'}}>
                    <img src={eggImg} />
                </div>
                <div className="item" style={{'--position': '21'}}>
                    <img src={donutImg} />
                </div>
                <div className="item" style={{'--position': '22'}}>
                    <img src={iceCream1Img} />
                </div>
                <div className="item" style={{'--position': '23'}}>
                    <img src={sandwichImg} />
                </div>
                <div className="item" style={{'--position': '24'}}>
                    <img src={tapasImg} />
                </div>
                <div className="item" style={{'--position': '25'}}>
                    <img src={wrapImg} />
                </div>
                <div className="item" style={{'--position': '26'}}>
                    <img src={soupImg} />
                </div>
            </div>
        </div>
    )
}