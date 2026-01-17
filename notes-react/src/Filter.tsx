import { useState } from "react";
import { isBlank } from "./css/strutils";

type InputFunction = (e : React.ChangeEvent<HTMLInputElement>) => void;
type DictType = Record<string, string>

type ComboProps<Item> = {
    dict : DictType
    property : keyof Item,
    changeFilter: (fn: (note: Item) => boolean) => void,
    anyValue ?: string
}

export type DashboardItem<T> = {
    dict : DictType,
    property : keyof T,
    title : string
}

export function ComboDashboard<T>({combos, title, setFilterFuncs, filterFuncs} : {combos : DashboardItem<T>[], title:string,
    filterFuncs : Array<(p: T) => boolean>, setFilterFuncs : (p: Array<(p: T) => boolean>) => void}) {
    return (
        <fieldset className="dashboard">
            <legend className="dashboardTitle">{title}</legend>
            <div className="dashboardContents">
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
            </div>
        </fieldset>
    );
}

export function ComboFilter<T>({dict, property, changeFilter, anyValue = "Cualquiera"} : ComboProps<T>) {
    const [activeClass, setActiveClass] = useState<string>("");

    function valueFilter(value : string) {
        if(value === anyValue) {
            setActiveClass("");
            return () => true;
        }
        setActiveClass("active");
        return (item : T) => item[property] == value;
    }

    return (
        <select
        className={activeClass}
        defaultValue={anyValue}
        onChange={(event) => changeFilter(valueFilter(event.currentTarget.value))}>
            <option key="anyvalue">{anyValue}</option>
            {Object.keys(dict).map((dictKey, index) => {
                return <option key={index} value={dictKey}>{dict[dictKey]}</option>;
            })}
        </select>
    );
}

export function SearchFilter({onSearch, identifier = ""} : {onSearch : InputFunction, identifier?: string}) {
    const [active, setActive] = useState<string>("");
    return (       
            <input
            className={active}
            id={`search${identifier && `-${identifier}`}`}
            type='search'
            placeholder='Buscar asignaturas'
            onChange={(event) => {
                setActive(isBlank(event.currentTarget.value) ? "" : "active");
                onSearch(event);
            }}/>
        );
}