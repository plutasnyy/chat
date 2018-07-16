import {combineReducers} from 'redux';
import rooms from "./rooms";
import auth from "./auth";


const reducer = combineReducers({
    rooms,
    auth,
})
export default reducer;