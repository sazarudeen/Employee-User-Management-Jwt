import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import '../../Css/todo.css'
import { deleteData, updateDataOnlyById } from '../Client/AxiosClient'
import ApiConstants from '../Constants/Endpoints'

const Content = ({items,setItems}) => {

    const handleCheckboxOnClick = async (id) => {
      try {
        const response = await updateDataOnlyById(ApiConstants.TODO_RESOURCE+`/${id}`)
        if(response.status==200){
          setItems(response.data)
        }else{
          console.log('update failed for id ',id);
        }
      } catch (error) {
        console.log('update failed for id ',id,error);
      }
    }


    const handleDeleteOnClick = async (id) => {
      try {
          const response = await deleteData(ApiConstants.TODO_RESOURCE+`/${id}`)
          if(response.status==200){
            setItems(response.data)
          }else{
            console.log('delete failed for id ',id);
          }
      } catch (error) {
        console.log('delete failed for id ',id,error);
      }
    }    

    return (
        <main>
            <ul>
            {
              items.length!==0 ? (
                  items.map(item=>(
                  <li className='item' key={item.toDoId}>
                    <input type="checkbox" onClick={()=>handleCheckboxOnClick(item.toDoId)} checked={item.finished}/>
                    <label style={{
                      textDecoration : item.finished ? "line-through" : "none"
                    }}><strong>{item.toDoName}</strong></label>
                    <FaTrashAlt
                    title={`Delete ${item.toDoName}`}
                    role='button'
                    id='todoListButton'
                    onClick={()=>handleDeleteOnClick(item.toDoId)}
                    />
                  </li>
                ))
                ) : <p><strong> No results to display </strong></p>
            }
            </ul>
        </main>
    )
}

export default Content