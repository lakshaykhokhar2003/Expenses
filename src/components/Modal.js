import {createPortal} from 'react-dom';
import {motion} from 'framer-motion';

export default function Modal({title, children, onClose}) {
    return createPortal(<>
        <div className="backdrop" onClick={onClose}/>
        <motion.dialog open className="modal" initial='hidden' animate='show'
                       exit='exit' variants={{
            hidden: {opacity: 0, y: -30}, show: {opacity: 1, y: 0}, exit: {opacity: 0, y: 30},
        }}>
            <h2>{title}</h2>
            {children}
        </motion.dialog>
    </>, document.getElementById('modal'));
}
