import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import '../../Css/todo.css'
import { postData } from '../Client/AxiosClient';
import ApiConstants from '../Constants/Endpoints';

const AddItems = ({inputItem,setInputItem,items,setItems,addItem}) => {

    const textInputRef = useRef();

    const handleOnSubmit = async (e)=>{
       e.preventDefault();
       console.log('Form submitted with value ',inputItem);
       try{
          var response = await postData(ApiConstants.TODO_RESOURCE,{
            toDoName : inputItem,
            finished : false
          })
          if(response.status==200){
            setItems(response.data);
          }
       }catch{

       }
    //    addItem();
       setInputItem('');
       textInputRef.current.focus();
    }

    return (
        <form onSubmit={e=>handleOnSubmit(e)}>
            <input
                type="text"
                ref={textInputRef}
                autoFocus
                id='addItem'
                placeholder='Add an item'
                required
                value={inputItem}
                onChange={e=>setInputItem(e.target.value)}
            />
            <button
                type='submit'
                title='add item to to do list'
            >
            <FaPlus/>
            </button>
        </form>
    )
}

export default AddItems