import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [ keyword, setKeyword ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} inline >
                <Form.Control type="text" name="query" 
                    className="mr-sm-2 ml-sm-1 " 
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Sök efter produkter..." >
                </Form.Control>
                <Button type="submit" variant='success' className="p-2">
                <i className="fas fa-search fa-2x"></i>
                </Button>
                
            </Form>            
        </div>
    )
}

export default SearchBox
