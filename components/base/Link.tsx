import { FunctionComponent } from 'react';

import styles from '../../styles/components/base/Link.module.css';


const Button: FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = ({ children, className, ...attributes }) => {
	function injectMousePosition(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		const button = event.currentTarget;
		const span = button.querySelector('span')!;

		const left = event.pageX - event.currentTarget.offsetLeft;
		const top = event.pageY - event.currentTarget.offsetTop;

		span.style.top = `${top}px`;
		span.style.left = `${left}px`;
		span.style.setProperty('--button-width', `${button.clientWidth * 2}px`);
	}


	return (
		<a className={className ? `${styles.link} ${className}` : styles.link} onMouseEnter={injectMousePosition} onMouseLeave={injectMousePosition} {...attributes}>
			{children}
			<span></span>
		</a>
	);
}


export default Button;