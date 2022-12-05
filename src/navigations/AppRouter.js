import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppRouter() {

    const { userData } = useSelector(state => state.AuthReducer);
    const [authState, setAuthState] = useState(null)
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        (async () => {
            const getParseData = await AsyncStorage.getItem('userInfo');
            const convertPaeseData = JSON.parse(getParseData)
            if (userData != null || convertPaeseData != null) {
                setAuthState(true)
            } else {
                setAuthState(false)
            }
            forceUpdate()
        })()
    }, [userData])

    return (
        authState == false ? <AuthNavigator /> : <DrawerNavigator />
    );
}
