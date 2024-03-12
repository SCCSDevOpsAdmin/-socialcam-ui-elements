import classnames from 'classnames';
import React, { FC } from 'react';
import { localeOptions } from 'src/api/Api';
import CsReact from 'src/api/CsReact';
export type StatusElementType =
    | 'OFFLINE'
    | 'AWAY'
    | 'ONLINE'
    | 'LIVE'
    | 'ON_BREAK'
    | 'BUSY'
    | 'UNKNOWN';

export interface StatusElementProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    status: StatusElementType | string;
    size?: 'small' | 'normal';
    locale?: string;
}

export const StatusElement: FC<StatusElementProps> = (props) => {
    return (
        <div className="flex-row-start-center gap-6">
            <span
                className={classnames('flex-row-center-center', {
                    'cs-color-gray-2':
                        props.status === 'OFFLINE' ||
                        props.status === 'UNKNOWN',
                    'cs-color-light-green':
                        props.status === 'ONLINE' || props.status === 'LIVE',
                    'cs-color-alternate':
                        props.status === 'BUSY' || props.status === 'ON_BREAK',
                    'cs-text-t2': props.size !== 'small',
                    'cs-text-t3': props.size === 'small',
                })}
            >
                {props.status == 'LIVE' ? (
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                    >
                        <path
                            d="M13.4154 4.08398L9.33203 7.00065L13.4154 9.91732V4.08398Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.16536 2.91602H1.7487C1.10437 2.91602 0.582031 3.43835 0.582031 4.08268V9.91602C0.582031 10.5603 1.10437 11.0827 1.7487 11.0827H8.16536C8.8097 11.0827 9.33203 10.5603 9.33203 9.91602V4.08268C9.33203 3.43835 8.8097 2.91602 8.16536 2.91602Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <i
                        className="csi csi-circle-fill"
                        style={{ fontSize: '12px' }}
                    />
                )}
            </span>
            <span
                className={classnames('cs-color-gray-1', {
                    'cs-text-t2': props.size !== 'small',
                    'cs-text-t3': props.size === 'small',
                })}
            >
                {localeOptions(props.locale || CsReact.locale)['status'][
                    props.status
                ] ??
                    localeOptions(props.locale || CsReact.locale)['status'][
                        'UNKNOWN'
                    ]}
            </span>
        </div>
    );
};
