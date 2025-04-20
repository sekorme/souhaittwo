'use client';

import React from 'react';
import Select from 'react-select';
import useCountries from "@/hooks/useCountries";
import { useTheme } from 'next-themes'; // to detect dark/light mode

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();
    const { theme } = useTheme();

    const fOptionLabel = (option: any) => (
        <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
                {option.label},
                <span className="ml-1 text-muted-foreground">{option.region}</span>
            </div>
        </div>
    );

    return (
        <div>
            <Select
                placeholder="Country"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={fOptionLabel}
                classNames={{
                    control: () =>
                        'p-3 border-2 bg-white dark:bg-neutral-800 text-black dark:text-white',
                    input: () => 'text-lg text-black dark:text-white',
                    placeholder: () => 'text-gray-400 dark:text-gray-500',
                    option: () => 'text-lg text-black dark:text-white bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700',
                    menu: () => 'bg-white dark:bg-neutral-800',
                }}
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        borderColor: theme === 'dark' ? '#333' : '#ccc',
                        color: theme === 'dark' ? '#fff' : '#000',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: theme === 'dark' ? '#888' : '#999',
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: theme === 'dark' ? '#fff' : '#000',
                    }),
                    input: (base) => ({
                        ...base,
                        color: theme === 'dark' ? '#fff' : '#000',
                    }),
                    option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused
                            ? theme === 'dark' ? '#333' : '#f0f0f0'
                            : theme === 'dark' ? '#111' : '#fff',
                        color: theme === 'dark' ? '#fff' : '#000',
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: theme === 'dark' ? '#111' : '#fff',
                    }),
                }}
                theme={(themeSelect) => ({
                    ...themeSelect,
                    borderRadius: 6,
                    colors: {
                        ...themeSelect.colors,
                        primary25: theme === 'dark' ? '#333' : '#f0f0f0',
                        primary: theme === 'dark' ? '#0f0' : '#00d346',
                    },
                })}
            />
        </div>
    );
};

export default CountrySelect;
