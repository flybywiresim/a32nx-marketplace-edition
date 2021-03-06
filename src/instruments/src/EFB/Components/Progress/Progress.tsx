import * as React from 'react';
import './Progress.scss';

export type ProgressBarProps = {
    completed: string | number;
    displayBar?: boolean;
    completedBar?: number;
    bgcolor?: string;
    baseBgColor?: string;
    height?: string;
    width?: string;
    borderRadius?: string;
    margin?: string;
    padding?: string;
    labelAlignment?: 'left' | 'center' | 'right' | 'outside';
    labelColor?: string;
    labelSize?: string;
    isLabelVisible?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    bgcolor,
    completed,
    displayBar,
    completedBar,
    baseBgColor,
    height,
    width,
    margin,
    padding,
    borderRadius,
    labelAlignment,
    labelColor,
    labelSize,
    isLabelVisible,
}) => {
    const getAlignment = (
        alignmentOption: ProgressBarProps['labelAlignment'],
    ) => {
        if (alignmentOption === 'left') {
            return 'flex-start';
        }
        if (alignmentOption === 'center') {
            return 'center';
        }
        if (alignmentOption === 'right') {
            return 'flex-end';
        }
        return null;
    };

    const formatBar = (percent: number) => `calc(${width} * (${percent} / 100))`;

    const alignment = getAlignment(labelAlignment);

    const containerStyles: React.CSSProperties = {
        height,
        backgroundColor: baseBgColor,
        borderRadius,
        padding,
        width,
        margin,
    };

    const fillerStyles: React.CSSProperties = {
        height,
        width:
            typeof completed === 'string' || completed > 100
                ? '100%'
                : `${completed}%`,
        backgroundColor: bgcolor,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent:
            labelAlignment !== 'outside' && alignment ? alignment : 'normal',
    };

    const labelStyles: React.CSSProperties = {
        padding: labelAlignment === 'outside' ? '0 0 0 5px' : '5px',
        color: labelColor,
        fontWeight: 'bold',
        fontSize: labelSize,
        display: !isLabelVisible ? 'none' : 'initial',
    };

    const outsideStyles = {
        display: labelAlignment === 'outside' ? 'flex' : 'initial',
        alignItems: labelAlignment === 'outside' ? 'center' : 'initial',
    };

    return (
        <>
            <div className="progress-bar">
                <div className={displayBar ? 'vertical-progress-bar' : 'hidden'} style={{ marginLeft: `${formatBar(completedBar || 0)}` }} />
                <div style={outsideStyles}>
                    <div style={containerStyles}>
                        <div style={fillerStyles}>
                            {labelAlignment !== 'outside' && (
                                <span style={labelStyles}>
                                    {typeof completed === 'number' ? `${completed}%` : `${completed}`}
                                </span>
                            )}
                        </div>
                    </div>
                    {labelAlignment === 'outside' && (
                        <span style={labelStyles}>
                            {typeof completed === 'number' ? `${completed}%` : `${completed}`}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

ProgressBar.defaultProps = {
    bgcolor: '#6a1b9a',
    height: '20px',
    width: '100%',
    borderRadius: '50px',
    labelAlignment: 'right',
    baseBgColor: '#e0e0de',
    labelColor: '#fff',
    labelSize: '15px',
    isLabelVisible: true,
    displayBar: false,
    completedBar: 0,
};
