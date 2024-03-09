import React, { useState } from 'react'
import MyContext from './myContext';

function MyState(props) {
    const [Loading, setLoading] = useState(false);
    const [OpenSide, setOpenSide] = useState(false);

    function triggerLoading(val) {
        setLoading(val)
    }
    function triggerOpenSide(val) {
        setOpenSide(val)
    }
    return (
        <MyContext.Provider value={{Loading, triggerLoading, OpenSide, triggerOpenSide}}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState