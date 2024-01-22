import '../../App.css';
import { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import AddItems from './AddItems';
import $ from 'jquery'
import Loader from './Loader';
import { fetchData } from '../Client/AxiosClient';
import { Link } from 'react-router-dom';
import ApiConstants from '../Constants/Endpoints';
import RefreshBox from '../SearchComponents/RefreshComponent';
import RedisFlush from '../SearchComponents/RedisFlushComponent';
import { toastFunctions } from '../Status/StatusBar';
import SearchBox from '../SearchComponents/SearchComponent';
import { ToastContainer } from 'react-toastify';

function FinalToDo({ setMiddle }) {
  var [items, setItems] = useState(JSON.parse(window.localStorage.getItem("listItems")) || []);

  setMiddle('Employee ToDo')

  var [inputItem, setInputItem] = useState('');

  var [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const syncData = async () => await fetchDataFromJSONServer();
    syncData();
  }, [])

  const handleRefresh = () => {
    setShowLoader('true');
    setItems([])
    setTimeout(() => {
      fetchDataFromJSONServer();
    }, 300)
  }

  const fetchDataFromJSONServer = async () => {
    try {
      var response = await fetchData(ApiConstants.TODO_RESOURCE)
      var courseItems;
      if (response.status == 200) {
        courseItems = response.data;
        setTimeout(() => {
          courseItems ? setItems(courseItems) : setItems([]);
          setShowLoader(false);
        }, 1000);
      } else {
        setShowLoader(false)
        setItems([]);
      }
    } catch (error) {
      console.log('Error occured while fetching data', error);
      setShowLoader(false)
      setItems([]);
    } finally {
    }
  }

  const handleOnKeyDown = e => {
    if (e.keyCode == 13) {
        const searchedValue = $("#searchBox").val();
        const filteredTodoItems = items.filter(item => {
            const todoName = item.toDoName.toLowerCase();
            const searchedValueLower = searchedValue.toLowerCase();
            const partialMatch = todoName.includes(searchedValueLower);
            const caseSensitiveMatch = todoName === searchedValue;
            const caseInsensitiveMatch = todoName.toLowerCase() === searchedValueLower;
            return partialMatch || caseSensitiveMatch || caseInsensitiveMatch;
        });

        setItems(filteredTodoItems);
    }
  }

  const handleRedisFlush = async () => {
    try {
      var response = await fetchData(ApiConstants.TODO_RESOURCE + '/flush')
      if (response.status == 200 && response.data) {
        toastFunctions.showInfoToast('To do Data has been flushed out in Redis,Click on the refresh Todo button for fresh data',3000)
      } else {
        toastFunctions.showErrorToast('Something wrong in redis flush', 1000)
      }
    } catch (error) {
      console.log('Error occured in redis flush ', error)

    }
  }

  //if u pass empty array as dependency,the useeffect will be called only once after this particular component rendered in dom,whreas if you pass [somestatevariable] in use effect,the use effect will be exceuted once after the component rerendered and whenever somestatevariable state changes that time also it will be executed.

  const addItem = () => {
    var id = items.length !== 0 ? items[items.length - 1].id + 1 : 1

    var newItem = {
      id,
      checked: false,
      name: inputItem
    }

    const listItems = [...items, newItem];
    window.localStorage.setItem("listItems", JSON.stringify(listItems));
    setItems(listItems)
  }

  return (
    <div id='finalToDo' style={{
      border: "4px solid blue"
    }}
    >
      <Header />
      {items.length >= 5 && <SearchBox text="Todo" handleOnKeyDown={handleOnKeyDown} />}
      <RefreshBox text="todo" handleRefresh={handleRefresh} />
      <RedisFlush text="todo" handleRefresh={handleRedisFlush} />
      <Link to="/home"><div className="btn btn-success skillNav a12">Back to Home</div></Link>
      <AddItems
        inputItem={inputItem}
        setInputItem={setInputItem}
        items={items}
        setItems={setItems}
        addItem={addItem}
      />
      <Loader
        showLoader={showLoader}
        items={items}
        setItems={setItems}
      />
      <ToastContainer/>
      <Footer
        length={items.length}
      />
    </div>

  );
}

export default FinalToDo;
