type InputFunction = (e : React.ChangeEvent<HTMLInputElement>) => void;

type ComboProps<Item> = {
    dict : Record<string, string>
    property : keyof Item,
    changeFilter: (fn: (note: Item) => boolean) => void,
    anyValue ?: string
}

/* Makes the filter options more aesthetic */
function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ComboFilter<T>({dict, property, changeFilter, anyValue = "Cualquiera"} : ComboProps<T>) {
    function valueFilter(value : string) {
        if(value === anyValue) return () => true;
        return (item : T) => item[property] === value;
    }

    return (
        <select
        defaultValue={anyValue}
        onChange={(event) => changeFilter(valueFilter(event.currentTarget.value))}>
            <option key="anyvalue">{anyValue}</option>
            {Object.keys(dict).map((dictKey, index) => {
                return <option key={index} value={dictKey}>{capitalize(dictKey)}</option>;
            })}
        </select>
    );
}

export function SearchFilter({onSearch} : {onSearch : InputFunction}) {
    return (       
        <section>
            <input
            id="search"
            type='search'
            placeholder='Buscar asignaturas'
            onChange={onSearch}/>
        </section>);
}