type TextBoxProps = {
    text?: string
}

const TextBox = ({ text }: TextBoxProps) => {
    return (
        <div className="line">
            {text}
        </div>
    )
}

export default TextBox