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

export type DashboardItem<T> = {
    dict : Record<string, string>,
    property : keyof T,
    title : string
}

export function ComboDashboard<T>({combos, setFilterFuncs, filterFuncs} : {combos : DashboardItem<T>[],
    filterFuncs : Array<(p: T) => boolean>, setFilterFuncs : (p: Array<(p: T) => boolean>) => void}) {
    return (
        <section className="dashboard">
            {combos.map((filter, index) => {
                return (
                <div className="vert">
                    <label>{`${filter.title}:`}</label>
                    <ComboFilter<T>
                        key={`combo-filter-${filter.title.replaceAll(" ","-")}`}
                        dict={filter.dict} property={filter.property}
                        changeFilter={(func) => {
                            const nextFuncs = filterFuncs.slice();
                            nextFuncs[index] = func;
                            setFilterFuncs(nextFuncs);
                        }}/>
                </div>
                );
            })}
        </section>
    );
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