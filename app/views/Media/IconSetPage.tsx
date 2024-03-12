import React, { ReactNode } from 'react';
import { Add, Arrow, Phone, Sound } from 'src/icons/svg';

type Props = {};

const style = {
    //.ch-icon {
    //width: '1.5rem',
    //height: '1.5rem',
    //border-radius: 100%,
    //}
};
const IconSetPage: React.FC<Props> = (props: Props) => {
    let icons: ReactNode[] = [<Add />, <Arrow />, <Phone />, <Sound />];
    return (
        <div className="flex-col">
            <h1>IconSet</h1>
            <div className="flex-row">
                {icons.map((icon, index) => {
                    return (
                        <>
                            <div
                                key={index}
                                style={{
                                    width: '1.5rem',
                                    height: '1.5rem',
                                    borderRadius: '100%',
                                }}
                            >
                                {icon}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(IconSetPage);
