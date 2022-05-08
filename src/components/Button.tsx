type ButtonProps = {
    Component?: React.ComponentType
    color?: string
    text?: string
}

const Button = ({ text, color }: ButtonProps) => {
  return (
    <div>
        <button style = {{ backgroundColor: color }} className = 'btn'>
            {text}
        </button>
    </div>
  )
}

Button.defaultProps = {
    text: "Button",
    color: "#111111"
}

export default Button