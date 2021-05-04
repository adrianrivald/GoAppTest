import React, { CSSProperties, FC } from 'react';

import styles from './Popup.module.scss';

interface PopupProps {
    value: string;
    style?: CSSProperties;
    icon?: string
}

const Popup: FC<PopupProps> = (props) => {
    const { value, icon } = props;

    return (
        <div className={`${styles['popup-container']}`}>
            <div className={`${styles['popup-box']}`} style={styles}>
                <div className={`${styles['popup-content']}`}>
                    <img src={icon} alt="icon" />
                    <div className={`${styles['popup-text']}`}>
                        {value}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Popup;