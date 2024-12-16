"use client";

import { useTranslations } from "next-intl";
import { RecipeTypeConfig } from "~/config/config";

interface CraftModalProps {
    modalRef: React.RefObject<HTMLInputElement>;
    modalType: string;
    recipeConfig: RecipeTypeConfig | undefined;
    onCopy: () => void;
    onClear: () => void;
}

export default function CraftModal({ modalRef, modalType, recipeConfig, onCopy, onClear }: CraftModalProps) {
    const t = useTranslations();

    const renderAdditionalInput = (input: { name: string; type: string; default?: string | boolean | number }) => {
        const label = t(`crafts.additional_inputs.${input.name}`);
        
        switch (input.type) {
            case 'checkbox':
                return (
                    <label key={input.name} className="flex items-center gap-2 text-gray-300 cursor-pointer mt-2">
                        <input 
                            type="checkbox" 
                            id={input.name} 
                            className="checkbox" 
                            defaultChecked={input.default as boolean} 
                        />
                        <span>{label}</span>
                    </label>
                );
            case 'number':
                return (
                    <div key={input.name} className="flex flex-col gap-2">
                        <label htmlFor={input.name} className="text-sm text-gray-300">
                            {label}
                        </label>
                        <input 
                            type="number" 
                            id={input.name}
                            className="input bg-gray-800 bg-opacity-20 border-gray-700 focus:border-gray-500 transition-colors"
                            defaultValue={input.default as number}
                        />
                    </div>
                );
            default:
                return (
                    <div key={input.name} className="flex flex-col gap-2">
                        <label htmlFor={input.name} className="text-sm text-gray-300">
                            {label}
                        </label>
                        <input 
                            type="text" 
                            id={input.name}
                            className="input bg-gray-800 bg-opacity-20 border-gray-700 focus:border-gray-500 transition-colors"
                            defaultValue={input.default as string}
                        />
                    </div>
                );
        }
    };

    const getGridStyle = () => {
        if (!recipeConfig?.columns) return {};
        
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${recipeConfig.columns}, minmax(0, 1fr))`,
            gap: '0.75rem',
            maxWidth: recipeConfig.columns === 9 ? '600px' : 'none'
        };
    };

    return (
        <>
            <input className="modal-state" id="modal-craft" type="checkbox" ref={modalRef} />
            <div className="modal !m-0">
                <label className="modal-overlay" htmlFor="modal-craft"></label>
                <div className="modal-content flex flex-col gap-6 max-w-full">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <h2 className="text-2xl font-bold">{t(`crafts.buttons.${modalType}`)}</h2>
                        <label htmlFor="modal-craft" className="btn btn-sm btn-circle btn-ghost">✕</label>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-3">{t('crafts.text.input')}</h3>
                            <div style={getGridStyle()}>
                                {recipeConfig && new Array(recipeConfig.rows * recipeConfig.columns).fill(0).map((_, i) => 
                                    <input 
                                        id={`input-${i}`} 
                                        key={i}
                                        className="input bg-gray-800 bg-opacity-20 border-gray-700 focus:border-gray-500 transition-colors h-12"
                                        placeholder="modid:item" 
                                    />
                                )}
                            </div>
                        </div>

                        {recipeConfig?.requiresOutput && (
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3">{t('crafts.text.output')}</h3>
                                <input 
                                    id="output"
                                    className="input bg-gray-800 bg-opacity-20 border-gray-700 focus:border-gray-500 transition-colors w-full"
                                    placeholder="modid:item" 
                                />
                            </div>
                        )}

                        {recipeConfig?.additionalInputs && recipeConfig.additionalInputs.length > 0 && (
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3">{t('crafts.text.additional_inputs')}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {recipeConfig.additionalInputs.map(input => renderAdditionalInput(input))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 border-t border-gray-700 pt-4">
                        <button
                            className="flex-1 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                            onClick={onCopy}
                        >
                            {t('crafts.buttons.copy')}
                        </button>
                        <button
                            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                            onClick={onClear}
                        >
                            {t('crafts.buttons.cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
