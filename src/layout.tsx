interface Props extends React.PropsWithChildren {}

export const Layout = ({ children }: Props) => {
  return <main>{children}</main>;
};
