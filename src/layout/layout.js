import React from 'react';
import Proptypes from 'prop-types';
import styles from './layout.module.css';

    // Render out this component with a React Fragment (<></>)instead of wrapping it in div tags, since this component will already be 
    // wrapped by the #root div where the app gets mounted in server.js

    //This functional component will wrap the app's main content. It returns only it's all children.
    //By wrapping all the app content in this Layout component, we can ensure that the header and footer are always positioned
    //in the same place.

const Layout = props => (
    <>
        <header className={styles.Header}>
            <h1>trademarkit</h1>
        </header>
            {props.children}
        <footer className={styles.Footer}>
            Made with{' '}<span aria-label="trademark symbol">&#8482;</span>by{' '}<a href="https://www.robertmajuri.com/" target="blank">Rob Majuri</a>
        </footer>
    </>
);

export default Layout;

Layout.propTypes = {
    children: Proptypes.node.isRequired
};
