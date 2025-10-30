import React from "react";
import clsx from "clsx";
import styles from "./text.module.css";

type FontWeight = "regular" | "semibold" | "bold";
type FontSize = "m" | "l" | "xl" | "2xl";

interface TextProps {
    as?: React.ElementType,
    weight?: FontWeight,
    size?: FontSize,
    className?: string,
    children: React.ReactNode,
    onClick?: () => void | Promise<void>
}

export const TextCustom: React.FC<TextProps> = ({
                                                    as: Component = "p",
                                                    weight = "regular",
                                                    size = "m",
                                                    className,
                                                    children,
                                                    onClick,
                                                    ...rest
                                                }) => {
    const normalizedSize = size === "2xl" ? "_2xl" : size;

    return (
        <Component
            className={clsx(
                styles.text,
                styles[normalizedSize],
                styles[weight],
                className
            )}
            {...rest}
        >
            {children}
        </Component>
    );
};
