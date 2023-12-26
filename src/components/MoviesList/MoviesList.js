import React from "react";
import MoviCard from "../MoviCard/MoviCard";

import './MoviesList.css'

 const MoviesList = ({movies})=>  {
   
const moviCads = movies.map((movie) =>{
    const {id } = movie;
    return(
        <li className='cardItem'
        key={id}>
    <MoviCard 
            movie={movie}/>
        </li>
    )
}
)
    



    return (
        <ul className="moviesList">
        {moviCads}
        </ul>
    )

}
        
export default MoviesList