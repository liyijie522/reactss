/*
  Layout.tsx is a functional component in React that serves as a wrapper for other child components. This is useful for including components that should appear on every page, such as headers and footers.

  The component accepts a single prop:
  - `children`: This is a ReactNode type, which means it can be any valid React child, including a string, a React element, or an array of these types. This prop is used to render the child components passed to the Layout component.

  The component returns a div element and the child components passed in.
*/


type Props = {
  children: React.ReactNode
}


export const Layout: React.FC<Props> = ({children}) => {
  return (
    <div>
      {/* TEST LAYOUT */}
      {children}
    </div>
  )
}