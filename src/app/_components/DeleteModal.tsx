"use client";

import { useTranslations } from "next-intl";
import { type ModType } from "~/lib/classes/Recipe/base";
import { DeleteFields } from "~/config/config";

interface DeleteModalProps {
    modalRef: React.RefObject<HTMLInputElement>;
    mods: string;
    onDelete: () => void;
    onClear: () => void;
}

export default function DeleteModal({ modalRef, mods, onDelete, onClear }: DeleteModalProps) {
    const t = useTranslations();

    return (
        <>
            <input className="modal-state" id="modal-delete" type="checkbox" ref={modalRef} />
            <div className="modal !m-0">
                <label className="modal-overlay" htmlFor="modal-delete"></label>
                <div className="modal-content flex flex-col gap-6 max-w-3xl">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <h2 className="text-2xl font-bold">{t('crafts.buttons.delete')}</h2>
                        <label htmlFor="modal-delete" className="btn btn-sm btn-circle btn-ghost">✕</label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {DeleteFields[mods.toLowerCase() as ModType]?.map(field => (
                            <div key={field} className="flex flex-col gap-2">
                                <label htmlFor={field} className="text-sm text-gray-300">
                                    {t(`crafts.delete_fields.${field}`)}
                                </label>
                                <input
                                    id={`delete-${field}`}
                                    className="input bg-gray-800 bg-opacity-20 border-gray-700 focus:border-gray-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 border-t border-gray-700 pt-4">
                        <button
                            className="flex-1 px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                            onClick={onDelete}
                        >
                            {t('crafts.buttons.delete')}
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
