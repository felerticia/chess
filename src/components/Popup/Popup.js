import React from 'react';
import { Status } from '../../constants';
import { useAppContext }from '../../contexts/Context'
import { closePopup } from '../../reducer/actions/popup';
import PromotionBox from './PromotionBox/PromotionBox'
import './Popup.css'

const Popup = ({children}) => {

    const { appState : {status}, dispatch } = useAppContext();

    const onClosePopup = () => {
        dispatch(closePopup())
    }

    if (status === Status.ongoing)
        return null

    return <div className="popup">
        {React.Children
            .toArray(children)
            .map (child => React.cloneElement(child, { onClosePopup }))}
    </div>
}

export default Popup