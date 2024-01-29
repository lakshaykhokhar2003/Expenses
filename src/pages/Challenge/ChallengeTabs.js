import Badge from '../../components/Badge'
import {motion} from 'framer-motion';
import RazorPay from "../../rarzorpay/RazorPay";

function Tab({isSelected, onSelect, badgeCaption, children}) {
    return (<li>
        <button
            className={isSelected ? 'selected' : undefined}
            onClick={onSelect}
        >
            {children}
            <Badge key={badgeCaption} caption={badgeCaption}></Badge>
        </button>
        {isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator"/>}
    </li>);
}

const ChallengeTabs = ({selectedType, onSelectType, challenges, children,}) => {
    return (<>
        <menu id="tabs">
            <Tab
                isSelected={selectedType === 'active'}
                onSelect={() => onSelectType('active')}
                badgeCaption={challenges.active.length}
            >
                Active
            </Tab>
            <Tab
                isSelected={selectedType === 'completed'}
                onSelect={() => onSelectType('completed')}
                badgeCaption={challenges.completed.length}
            >
                Completed
            </Tab>
            <Tab
                isSelected={selectedType === 'failed'}
                onSelect={() => onSelectType('failed')}
                badgeCaption={challenges.failed.length}
            >
                Failed
            </Tab>
            <li>
                <span>₹ 1 /- Monthly</span>
                <RazorPay/>
            </li>
        </menu>
        <div>{children}</div>
    </>);
}

export default ChallengeTabs;
