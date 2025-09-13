interface HeadingProps {
  children: React.ReactNode;
}

const createHeading = (level: number) => {
  return function Heading({ children }: HeadingProps) {
    const text =
      typeof children === "string" ? children : children?.toString() || "";
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff]/g, "") // Keep Chinese characters
      .replace(/\s+/g, "-");

    const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
      <Component id={id} className="scroll-mt-8">
        {children}
      </Component>
    );
  };
};

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);
