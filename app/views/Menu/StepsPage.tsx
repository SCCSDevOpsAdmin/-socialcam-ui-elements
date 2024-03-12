import React from 'react';
import { Steps } from 'src/elements';

type Props = {};
const StepsPage: React.FC<Props> = (props: Props) => {
    const [activeIndex, setActiveIndex] = React.useState(1);
    const items = [
        {
            label: 'Personal',
            command: (event: any) => {
                alert('Personal');
            },
        },
        {
            label: 'Seat',
            command: (event: any) => {
                alert('Seat');
            },
        },
        {
            label: 'Payment',
            command: (event: any) => {
                alert('Payment');
            },
        },
        {
            label: 'Confirmation',
            command: (event: any) => {
                alert('Confirmation');
            },
        },
    ];
    return (
        <div className="steps-demo">
            <div className="card">
                <h5>Basic</h5>
                <Steps model={items} />
                <h5>Interactive</h5>
                <Steps
                    model={items}
                    activeIndex={activeIndex}
                    onSelect={(e) => setActiveIndex(e.index)}
                    readOnly={false}
                />
            </div>
        </div>
    );
};

export default React.memo(StepsPage);
