import React from "react";
import {
    ActivityIndicator
} from "react-native";

import { COLORS } from "../constants";
import { getEmployeeAction } from "../Redux/actions/EmployeeAction";
import { useSelector, useDispatch } from 'react-redux';



const ListLoader = () => {
    const { listLoading, } = useSelector(state => state.EmployeeReducer);
    return (
        listLoading === true?
            <ActivityIndicator 
            size={ "large"} 
            color={COLORS.black} 
            style={{ padding: 10 }}
        />
        :
            <></>
        
      
    )
}

export default ListLoader;
