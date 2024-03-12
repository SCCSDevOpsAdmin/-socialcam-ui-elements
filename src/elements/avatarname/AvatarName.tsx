import { isEmpty } from 'lodash';
import React from 'react';
import { Avatar } from '../avatar/Avatar';
import classnames from 'classnames';
import noProfileMale from '../../icons/avatar/noprofile-male.jpg';
import noProfileFemale from '../../icons/avatar/noprofile-female.jpg';
import './AvatarName.scss';

export interface AvatarNameProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    url?: string;
    gender?: string;
    name?: string;
}

export const AvatarName = React.forwardRef((props: AvatarNameProps, ref?) => {
    function displayName(name: string): string {
        if (isEmpty(name)) name = 'Anonymous';
        const res = name.split(/\s+/);
        const literal =
            res.length > 1
                ? (res[0][0] + res[1][0]).toUpperCase()
                : res[0][0].toUpperCase();
        return literal;
    }
    function defaultProfileGenderImg(gender: string | undefined) {
        return gender === 'GENDER_FEMALE' || gender == 'female'
            ? noProfileFemale
            : noProfileMale;
    }
    return (
        <>
            {!isEmpty(props.url) ? (
                <Avatar
                    image={props.url}
                    className={classnames(
                        'cs-avatar-name-image',
                        props.className ?? ''
                    )}
                    shape="square"
                    onImageError={(e) => {
                        <img src={defaultProfileGenderImg(props.gender)} />;
                    }}
                    disableRightClick={true}
                />
            ) : (
                <div
                    className={classnames(
                        'cs-avatar-name',
                        props.className ?? '',
                        {
                            'cs-bg-primary': props.gender != 'GENDER_FEMALE',
                            'cs-bg-secondary': props.gender == 'GENDER_FEMALE',
                        }
                    )}
                >
                    <span>{displayName(props.name ?? 'Anonymous')}</span>
                </div>
            )}
        </>
    );
});
