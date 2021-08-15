interface InputData {
    value: string;
    onChange: any;
}


export default function SearchInput({value, onChange} : InputData) {

    function handleChange(event) {
        onChange(event.target.value)
    }

    return (
        <input type='search' value={value} onChange={handleChange} placeholder="Digite o nome de busca..."/>
    )

}