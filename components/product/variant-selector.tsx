'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  const isValidCSSColor = (value: string) => {
    if (typeof window === 'undefined') {
      return false;
    }
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
  };

  const handleSelection = (name: string, value: string) => {
    updateOption(name, value);

    // Update the URL without price
    const { price, ...filteredState } = { ...state, [name.toLowerCase()]: value };
    updateURL(filteredState);
  };

  return options.map((option) => {
    const selectedValue = state[option.name.toLowerCase()];
    const isColorOption = /colou?r/i.test(option.name);

    return (
      <div key={option.id}>
        <dl className="border-b border-t py-6">
          <dt className="mb-4 text-[0.9rem] tracking-wide">
            Select a {option.name}:{' '}
            <span
              className={clsx('font-semibold', {
                'text-black-600': selectedValue,
                'text-red-600': !selectedValue
              })}
            >
              {selectedValue || `Select a ${option.name}`}
            </span>
          </dt>
          <dd className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();

              // Base option params on current selectedOptions so we can preserve any other param state.
              const optionParams = { ...state, [optionNameLowerCase]: value };

              // Filter out invalid options and check if the option combination is available for sale
              const filtered = Object.entries(optionParams).filter(([key, value]) =>
                options.find(
                  (option) => option.name.toLowerCase() === key && option.values.includes(value)
                )
              );

              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) => combination[key] === value && combination.availableForSale
                )
              );

              // The option is active if it's in the selected options
              const isActive = state[optionNameLowerCase] === value;

              const isCSSColor = isValidCSSColor(value);

              const showColorSwatches = isCSSColor && isColorOption;

              return (
                <button
                  key={value}
                  type="button"
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  onClick={() => handleSelection(option.name, value)}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                  className={clsx(
                    'flex items-center justify-center rounded-[2px] border bg-neutral-100 px-2 py-1 text-sm',
                    {
                      'cursor-default ring-2 ring-black': isActive,
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
                        !isActive && isAvailableForSale,
                      'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                        !isAvailableForSale
                    },
                    showColorSwatches ? 'h-[34px] w-[34px] rounded-full p-2' : 'min-w-[48px]'
                  )}
                  style={showColorSwatches ? { backgroundColor: value } : {}}
                >
                  {!showColorSwatches && value}
                </button>
              );
            })}
          </dd>
        </dl>
      </div>
    );
  });
}
