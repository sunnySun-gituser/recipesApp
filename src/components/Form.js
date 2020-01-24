import React from 'react'

const Form = (props) => {
    return ( 
        <form onSubmit={props.onSubmit} style={{marginBottom: '2rem'}}>
            <input onChange={props.onChange} 
                    className='form__input'
                    type='text' 
                    name='searchInput'
                    value={props.searchInput}/>
            <button className='form__button'>Search</button>
        </form>
    );
}
 
export default Form;