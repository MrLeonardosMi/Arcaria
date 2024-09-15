"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";
import { generateRecipe as generateWorkbenchRecipe, CraftingRecipe } from "~/lib/utils/kubejs/workbench";
import { generateRecipe as generateSCRecipe, SCRecipe, SCType } from "~/lib/utils/kubejs/smeltCooking";
import { toast } from "nextjs-toast-notify";
import copy from "clipboard-copy";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { generateDeleteScript } from "~/lib/utils/kubejs/remove";

const types: Record<string, string[]> = {
    "kubejs": ["workbench", "smelting", "blasting", "smoking", "campfireCooking", "stonecutting"]
};
const dataTypes: Record<string, number> = {
    "workbench": 3,
    "smelting": 1,
    "blasting": 1,
    "smoking": 1,
    "campfireCooking": 1,
    "stonecutting": 1
}

export default function VersionPage({ params: { version } }: { params: { version: string }, searchParams: any }) {
    const t = useTranslations();
    const modalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [modalType, setModalType] = useState<string>("")
    const [isShaped, setIsShaped] = useState(true)

    const handleModal = (type: string) => {
        if (modalType != type)
            handleClear();

        setModalType(type);
        (modalRef.current as any).click();
    }

    const handleClear = () => {
        Array.from({ length: dataTypes[modalType]! ** 2 || 0 }, (_, i) => document.getElementById(`input-${i}`) as HTMLInputElement).map(input => input.value = "");
        (document.getElementById("output") as HTMLInputElement).value = "";
    }

    const handleCopy = () => {
        let recipe;
        const output = (document.getElementById("output") as HTMLInputElement).value;

        if (modalType === "workbench") {
            const input = new Array(9).fill(null).map((_, i) => (document.getElementById(`input-${i}`) as HTMLInputElement).value || null);
            recipe = generateWorkbenchRecipe({
                output,
                input: [input.slice(0, 3), input.slice(3, 6), input.slice(6, 9)],
                shaped: isShaped
            } as CraftingRecipe);
        } else if (SCType[modalType as keyof typeof SCType]) {
            const input = (document.getElementById("input-0") as HTMLInputElement).value;
            recipe = generateSCRecipe({
                output,
                input,
                type: modalType as unknown as SCType
            } as SCRecipe);
        }

        copy(recipe as string);
        toast.success(t('crafts.text.copied'), {
            position: "top-right",
            duration: 3000,
            transition: "fadeIn",
            sonido: true,
            progress: true
        });
    }

    const handleDeleteModal = () => {
        (deleteModalRef.current as any).click();
    }

    const handleDelete = () => {
        const filters: Record<string, string> = {};
        ['output', 'input', 'mod', 'type', 'id'].forEach(field => {
            const value = (document.getElementById(`delete-${field}`) as HTMLInputElement).value;
            if (value)
                filters[field] = value;
        });

        copy(generateDeleteScript(filters));
        toast.success(t('crafts.text.deleted'), {
            position: "top-right",
            duration: 3000,
            transition: "fadeIn",
            sonido: true,
            progress: true
        });
    }

    const handleDeleteClear = () => ['output', 'input', 'mod', 'type', 'id'].map(field => (document.getElementById(`delete-${field}`) as HTMLInputElement).value = '');

    return (
        <div className="container flex flex-col gap-10 px-4 py-16 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{t(`main.buttons.crafts`)} ({version})</h1>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {types[version]?.map(el => <button key={el} className="btn btn-solid-primary text-lg transition-all w-1/4" onClick={() => handleModal(el)}>{t(`crafts.buttons.${el}`)}</button>)}
                <button className="btn btn-solid-error text-lg transition-all w-1/4" onClick={handleDeleteModal}>{t('crafts.buttons.delete')}</button>
            </div>
            <Link href="/" className="btn btn-solid-secondary w-1/4 text-lg">{t('crafts.buttons.leave')}</Link>

            <input className="modal-state" id="modal-craft" type="checkbox" ref={modalRef} />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-craft"></label>
                <div className="modal-content flex flex-col gap-6 max-w-full w-1/2">
                    <label htmlFor="modal-craft" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h2 className="text-xl">{t(`crafts.buttons.${modalType}`)}</h2>
                    <div className="flex w-full">
                        <div className="w-1/2 text-center">
                            <h2 className="text-md mb-3">{t('crafts.text.input')}</h2>
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                {new Array((dataTypes[modalType]! * dataTypes[modalType]!) || 0).fill(0).map((_, i) => <input id={`input-${i}`} className={`input ${dataTypes[modalType]! == 1 ? "w-3/4" : "w-1/4"} max-w-full`} placeholder="modid:item" key={i} />)}
                            </div>
                        </div>
                        <div className="w-1/2 text-center">
                            <h2 className="text-md mb-3">{t('crafts.text.output')}</h2>
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <input id="output" className="input w-3/4 max-w-full" placeholder="modid:item" />
                            </div>
                            {modalType === "workbench" && (
                                <div className="mt-3 flex justify-center">
                                    <label className="flex items-center">
                                        <input type="checkbox" checked={isShaped} onChange={(e) => setIsShaped(e.currentTarget.checked)} className="checkbox mr-2" />
                                        {t('crafts.text.shaped')}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-success btn-block" onClick={handleCopy}>{t('crafts.buttons.copy')}</button>
                        <button className="btn btn-block" onClick={handleClear}>{t(`crafts.buttons.cancel`)}</button>
                    </div>
                </div>
            </div>

            <input className="modal-state" id="modal-delete" type="checkbox" ref={deleteModalRef} />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-delete"></label>
                <div className="modal-content flex flex-col gap-6 max-w-full w-1/2">
                    <label htmlFor="modal-delete" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h2 className="text-xl">{t('crafts.buttons.delete')}</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="form-group w-fit">
                            <label htmlFor="delete-output" className="form-label">{t('crafts.delete.output')}</label>
                            <input id="delete-output" className="input w-full" />
                        </div>
                        <div className="form-group w-fit">
                            <label htmlFor="delete-input" className="form-label">{t('crafts.delete.input')}</label>
                            <input id="delete-input" className="input w-full" />
                        </div>
                        <div className="form-group w-fit">
                            <label htmlFor="delete-mod" className="form-label">{t('crafts.delete.mod')}</label>
                            <input id="delete-mod" className="input w-full" />
                        </div>
                        <div className="form-group w-fit">
                            <label htmlFor="delete-type" className="form-label">{t('crafts.delete.type')}</label>
                            <input id="delete-type" className="input w-full" />
                        </div>
                        <div className="form-group w-fit">
                            <label htmlFor="delete-id" className="form-label">{t('crafts.delete.id')}</label>
                            <input id="delete-id" className="input w-full" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-error btn-block" onClick={handleDelete}>{t('crafts.buttons.delete')}</button>
                        <button className="btn btn-block" onClick={handleDeleteClear}>{t('crafts.buttons.cancel')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}