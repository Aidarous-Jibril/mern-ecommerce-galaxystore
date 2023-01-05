import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();

    const [ keyword, setKeyword ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler}   className='form'>
                <Form.Control 
                    type="text" name="query" 
                    className="mr-sm-2 ml-sm-1 form-input" 
                    placeholder="Sök efter produkter..." 
                    onChange={(e) => setKeyword(e.target.value)}
                    >
                </Form.Control>
                
                <Button type="submit" variant='Dark' className="p-2">
                    <i className="fas fa-search fa-2x form-icon"></i>
                </Button>
            </Form>            


                 
        </div>
    )
}

export default SearchBox
