import React from "react";
import clsx from "clsx";

type FontWeight = "regular" | "semibold" | "bold";
type FontSize = "m" | "l" | "xl" | "2xl";

interface TextProps {
    as?: React.ElementType;
    weight?: FontWeight;
    size?: FontSize;
    className?: string;
    children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
                                              as: Component = "p",
                                              weight = "regular",
                                              size = "m",
                                              className,
                                              children,
                                          }) => {
    return (
        <Component className={clsx(`text--${size}`, `text--${weight}`, className)}>
            {children}
        </Component>
    );
};
