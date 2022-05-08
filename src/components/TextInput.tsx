// TODO: event handling

import { useState } from 'react'

type TextInputProps = {
    label?: string
}

const TextInput = ({ label }: TextInputProps) => {
    const [name, setName] = useState("")

  return (
    <div>
        <form>
            <label>
                {label}
                <input
                    type = "text"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
            </label>
        </form>
    </div>
  )
}

TextInput.defaultProps = {
	label: "TextInput",
};

export default TextInput