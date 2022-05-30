import './index.scss';

type TCButton = {
    onClick?: () => void;
    className?: string
    children: React.ReactNode;
};

export const CButton = function({ children, className, onClick }: TCButton) {
    return <button className={className} onClick={onClick}>{children}</button>;
}