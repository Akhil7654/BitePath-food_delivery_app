import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {
  const {menuList}=useContext(StoreContext)

  return (
    <div className='explore-menu' id='explore-menu'>
       <h1>Explore our Menu</h1>
       <p className='explore-menu-text'>Choose from a wide variety of mouth-watering dishes crafted to satisfy every craving. Whether you're in the mood for a quick bite or a gourmet meal, our menu has something for everyone. </p>
       <div className="explore-menu-list">
        {menuList.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.name?"active":""} src={`http://localhost:8000${item.image}`} alt='' />
                    <p>{item.name}</p>
                </div>
            )
        })}
       </div>
       <hr />
    </div>
  )
}

export default ExploreMenu