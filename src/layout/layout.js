import React from 'react';
import Proptypes from 'prop-types';
import styles from './layout.module.css';

const Layout = props => (
    <>
        <header className={styles.Header}>
            <h1>trademarket</h1>
        </header>
            {props.children}
        <footer className={styles.Footer}>Made with &#8482; by <a href="https://www.robertmajuri.com/" target="blank">Rob Majuri</a></footer>
    </>
);

export default Layout;

Layout.propTypes = {
    children: Proptypes.node.isRequired
};
