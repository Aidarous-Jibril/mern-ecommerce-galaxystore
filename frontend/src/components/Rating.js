import React from 'react'

const Rating = ({ value, textRating, color }) => {
    return (
        <div className='rating'>
            <span style={{color}} >
                <i className={value >= 1 ? 'fas fa-star' : value >= 0.5  ? 'fas fa-star-half-alt' : 'far fa-star' } />
            </span>
            <span style={{color}}>
                <i className={value >= 2 ? 'fas fa-star' : value >= 1.5  ? 'fas fa-star-half-alt' : 'far fa-star' } />
            </span>
            <span style={{color}}>
                <i className={value >= 3 ? 'fas fa-star' : value >= 2.5  ? 'fas fa-star-half-alt' : 'far fa-star' } />
            </span>
            <span style={{color}}>
                <i className={value >= 4 ? 'fas fa-star' : value >= 3.5  ? 'fas fa-star-half-alt' : 'far fa-star' } />
            </span>
            <span style={{color}}>
                <i className={value >= 5 ? 'fas fa-star' : value >= 4.5  ? 'fas fa-star-half-alt' : 'far fa-star' } />
            </span>
             {' '}
    <span>{textRating && textRating }</span>
            
        </div>
    )
}

//defualt props for Rating comp
Rating.defaultProps = {
    color: '#FF9529'
}
export default Rating
