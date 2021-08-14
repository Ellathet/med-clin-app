import options  from '../functionoptions'

interface InputData {
    value: string;
    onChange: any;
}


export default function FunctionSearchInput({value, onChange} : InputData) {

    function handleChange(event) {
        onChange(event.target.value)
    }

    return (
        <select value={value} onChange={handleChange}>
            <option value="all" selected> Todos </option>
            {options.map((option, index) => {
              return (
                <>
                <option value={option.value}>{option.label}</option>
                </>
              )
            })}
        </select>
    )

}