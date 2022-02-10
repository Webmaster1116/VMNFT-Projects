import { FunctionComponent } from 'react';

import styles from '../../styles/components/base/IconButton.module.css';


const Button: FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = ({ children, className, ...attributes }) => (
	<a className={className ? `${styles.button} ${className}` : styles.button} {...attributes}>
		{children}
		<span></span>
	</a>
);


export default Button;