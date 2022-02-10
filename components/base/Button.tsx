import { FunctionComponent } from 'react';

import styles from '../../styles/components/base/Button.module.css';


const Button: FunctionComponent<React.HTMLProps<HTMLButtonElement>> = ({ children, className, type: _, ...attributes }) => {
	function injectMousePosition(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const button = event.currentTarget;
		const span = button.querySelector('span')!;

		const left = event.pageX - event.currentTarget.offsetLeft;
		const top = event.pageY - event.currentTarget.offsetTop;

		span.style.top = `${top}px`;
		span.style.left = `${left}px`;
		span.style.setProperty('--button-width', `${button.clientWidth * 3}px`);
	}


	return (
		<button className={className ? `${styles.button} ${className}` : styles.button} onMouseEnter={injectMousePosition} onMouseLeave={injectMousePosition} {...attributes}>
			{children}
			<span></span>
		</button>
	);
}


export default Button;