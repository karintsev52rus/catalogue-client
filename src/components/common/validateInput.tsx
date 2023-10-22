
import { FormControl } from "react-bootstrap"
import { validatorInputType } from "../../helpers/validators"

interface InputProps {
    setValue: Function
    value: string
    type?: "password" | "text" | "number"
    validator?: validatorInputType,
    compareValue? : string,
    setError? : Function,
    error?: boolean
}

const ValidateInput: React.FC<InputProps> = ({validator, compareValue, setError, error, setValue, value, type})=>{

    const onInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
        if (validator){
          if (validator(e.target.value, compareValue)){
            setError(false)
          } else setError(true)
        }
      }

    return (
        <FormControl
        type = {type}
        value={value}
        onChange={onInput}
        isInvalid = {error}
        />
    )
}

export {ValidateInput}