import * as React from 'react';
import { Button } from '../buttons/Button';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const PageLinks = React.memo((props: any) => {
    const onPageLinkClick = (event, pageLink) => {
        if (props.onClick) {
            props.onClick({
                originalEvent: event,
                value: pageLink,
            });
        }

        event.preventDefault();
    };

    let elements;

    if (props.value) {
        const startPageInView = props.value[0];
        const endPageInView = props.value[props.value.length - 1];

        elements = props.value.map((pageLink) => {
            const className = classNames(
                'cs-paginator-page cs-paginator-element cs-link cs-button-icon-only',
                {
                    'cs-paginator-page-start': pageLink === startPageInView,
                    'cs-paginator-page-end': pageLink === endPageInView,
                    'cs-highlight': pageLink - 1 === props.page,
                }
            );

            let element = (
                <Button
                    type="button"
                    className={className}
                    onClick={(e) => onPageLinkClick(e, pageLink)}
                    aria-label={`'pageLabel'${pageLink + 1}`}
                >
                    {pageLink}
                </Button>
            );

            if (props.template) {
                const defaultOptions = {
                    onClick: (e) => onPageLinkClick(e, pageLink),
                    className,
                    view: {
                        startPage: startPageInView - 1,
                        endPage: endPageInView - 1,
                    },
                    page: pageLink - 1,
                    currentPage: props.page,
                    totalPages: props.pageCount,
                    element,
                    props,
                };

                element = ObjectUtils.getJSXElement(
                    props.template,
                    defaultOptions
                );
            }

            return <React.Fragment key={pageLink}>{element}</React.Fragment>;
        });
    }

    return <span className="cs-paginator-pages">{elements}</span>;
});

PageLinks.displayName = 'PageLinks';
const defaultProps = {
    __TYPE: 'PageLinks',
    value: null,
    page: null,
    rows: null,
    pageCount: null,
    links: null,
    template: null,
};
