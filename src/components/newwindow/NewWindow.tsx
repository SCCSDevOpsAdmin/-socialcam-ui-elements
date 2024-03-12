import React, {
    useState,
    useEffect,
    useRef,
    FC,
    PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';
import { copyStyles } from './copy-styles';

interface NewWindowProps extends PropsWithChildren {
    onClose?: any;
    onResize?: any;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
    title?: string;
    url?: string;
}

const NewWindow: FC<NewWindowProps> = (props) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const newWindow = useRef(window);
    useEffect(() => {
        const div = document.createElement('div');
        setContainer(div);
    }, []);

    useEffect(() => {
        if (container) {
            initWindow(container);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container]);
    function initWindow(cnt: HTMLElement) {
        const win = window.open(
            props.url ?? '',
            '',
            `width=${props.width},height=${props.height},left=${props.left},right=${props.right},top=${props.top},bottom=${props.bottom}`
        );
        newWindow.current = win as Window & typeof globalThis;
        newWindow.current.document.body.appendChild(cnt);
        copyStyles(document, newWindow.current.document);
        newWindow.current.addEventListener('beforeunload', () => {
            props.onClose();
        });
        newWindow.current.addEventListener('resize', () => {
            props.onResize(
                newWindow.current.innerWidth,
                newWindow.current.innerHeight
            );
        });

        const curWindow = newWindow.current;
        return () => curWindow.close();
    }

    return (
        container &&
        createPortal(
            <>
                <title>{props.title}</title>
                {props.children}
            </>,
            container
        )
    );
};

NewWindow.defaultProps = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 1920,
    height: 1080,
    title: 'New window',
    onClose: function () {},
    onResize: function () {},
};

export default NewWindow;
