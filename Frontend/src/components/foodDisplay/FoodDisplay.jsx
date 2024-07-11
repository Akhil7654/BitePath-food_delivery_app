import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'

const FoodDisplay = ({category}) => {

   const {foodList} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item,index)=>{
            if(category==='All' || category===item.category.name) {
                return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
            return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
