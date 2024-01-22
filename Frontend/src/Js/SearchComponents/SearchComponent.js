import React from 'react'

const SearchBox = ({text,handleOnKeyDown}) => {
    return (
        <div className='searchbar_parent'>
            <input type="text" class="input-sm form-control" id="searchBox" onKeyDown={handleOnKeyDown} name={text} placeholder={`Search ${text}`}/>
        </div>
    )
}

export default SearchBox