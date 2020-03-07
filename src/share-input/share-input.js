import React, { useState } from 'react';
import { Input, Snackbar } from '@material-ui/core';
import { Link } from '@material-ui/icons';
import styles from './share-input.module.css';

const ShareInput = ({ history }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const copyToUserClipBoard = () => {
        setOpen(true);

        const shareInputText = document.getElementById('share-input');
        shareInputText.select();
        shareInputText.setSelectionRange(0, 99999)
        document.execCommand('copy');
    }

    return history.location.search ? (
        <div className={styles.ShareComponents}>
            <Input className={styles.Input} value={window.location.href} id="share-input" />
            <div onClick={copyToUserClipBoard} className={styles.CopyComponent}>
                <Link className={styles.Icon} />
                <p className={styles.ShareMessage}>Copy link to search results</p>
            </div>
            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  autoHideDuration={3000}
                message="Link copied to clip board" />
        </div>
    ) : null;
};

export default ShareInput;
