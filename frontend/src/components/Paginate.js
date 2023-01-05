import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ page, totalPages, keyword, isAdmin=false, }) => {
    // const navigate = useNavigate()
    return totalPages > 1 && (
        <Pagination>
            {[...Array(totalPages).keys()].map(x => (
                // if it's not admin then show /search/${keyword}/page/${x+1} OR /page/${x+1} based on existanceof keyword
                <LinkContainer key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` :
                 `/page/${x+1}` : `/admin/productlist/${x+1}` }>
                   <Pagination.Item active={x + 1 === page}> {x+1} </Pagination.Item>
                </LinkContainer>
                
            ))}

        </Pagination>
    )
    
}

export default Paginate

