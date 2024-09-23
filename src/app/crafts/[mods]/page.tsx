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
import { useParams } from "next/navigation";

const types: Record<string, string[]> = {
    "kubejs": ["workbench", "smelting", "blasting", "smoking", "campfireCooking", "stonecutting"],
    "minetweaker": ["workbench", "smelting", "smelt_fuel", "oredict_add", "oredict_mirror", "tooltip", "bloodmagic_altar", "bloodmagic_orb", "bloodmagic_alchemy", "ic2_canner", "ic2_compressor", "ic2_extractor", "ic2_macerator", "ic2_metalformer", "ic2_orewasher", "ic2_recycler", "ic2_thermalcentrifuge", "ic2_scrapbox", "nei_hide", "nei_nameoverride", "nei_addentry"]
}
const typedDelete: Record<string, string[]> = {
    "kubejs": ["output", "input", "mod", "type", "id"],
    "minetweaker": ["output"]
}
const dataTypes: Record<string, number[]> = {
    "workbench": [3, 3],
    "smelting": [1, 1],
    "blasting": [1, 1],
    "smoking": [1, 1],
    "campfireCooking": [1, 1],
    "stonecutting": [1, 1],
    "oredict_add": [1, 1],
    "oredict_mirror": [1, 1],
    "smelt_fuel": [1, 1],
    "tooltip": [1, 1],
    "bloodmagic_altar": [1, 1],
    "bloodmagic_orb": [3, 3],
    "bloodmagic_alchemy": [3, 3],
    "ic2_canner": [1, 1],
    "ic2_compressor": [1, 1],
    "ic2_extractor": [1, 1],
    "ic2_macerator": [1, 1],
    "ic2_metalformer": [1, 1],
    "ic2_orewasher": [2, 1],
    "ic2_recycler": [1, 1],
    "ic2_thermalcentrifuge": [2, 1],
    "ic2_scrapbox": [1, 1],
    "nei_hide": [1, 1],
    "nei_nameoverride": [1, 1],
    "nei_addentry": [1, 1]
}
const additionalTitles: string[] = ["smelt_fuel", "tooltip"];
const additionalInputs: Record<string, string[]> = {
    "bloodmagic_altar": ["blood_tier", "blood_lp", "blood_usage_rate", "blood_drain_rate"],
    "bloodmagic_alchemy": ["blood_tier", "blood_lp"],
    "ic2_canner": ["ic2_wateringredient"],
    "ic2_orewasher": ["ic2_water"],
    "ic2_thermalcentrifuge": ["ic2_temperature"],
    "ic2_scrapbox": ["ic2_chance"],
    "nei_nameoverride": ["nei_name"]
}
const outputBlacklist: string[] = ["ic2_recycler", "nei_hide", "nei_nameoverride", "nei_addentry"];

export default function VersionPage() {
    const mods = useParams().mods as string;
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
        Array.from({ length: (dataTypes[modalType]?.[0] || 0) * (dataTypes[modalType]?.[1] || 0) }, (_, i) => document.getElementById(`input-${i}`) as HTMLInputElement).map(input => input.value = "");
        const outputElement = document.getElementById("output") as HTMLInputElement;
        if (outputElement)
            outputElement.value = "";
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
        typedDelete[mods]?.forEach(field => {
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

    const handleDeleteClear = () => typedDelete[mods]?.map(field => (document.getElementById(`delete-${field}`) as HTMLInputElement).value = '');

    return (
        <div className="container flex flex-col gap-10 px-4 py-16 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{t(`main.buttons.crafts`)} ({mods})</h1>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {types[mods]?.map(el => <button key={el} className="btn btn-solid-primary text-lg transition-all w-1/4" onClick={() => handleModal(el)}>{t(`crafts.buttons.${el}`)}</button>)}
                <button className="btn btn-solid-error text-lg transition-all w-1/4" onClick={handleDeleteModal}>{t('crafts.buttons.delete')}</button>
            </div>
            <Link href="/" className="btn btn-solid-secondary w-1/4 text-lg">{t('crafts.buttons.leave')}</Link>

            <input className="modal-state" id="modal-craft" type="checkbox" ref={modalRef} />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-craft"></label>
                <div className="modal-content flex flex-col gap-6 max-w-full w-1/2">
                    <label htmlFor="modal-craft" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h2 className="text-xl">{t(`crafts.buttons.${modalType}`)}</h2>
                    <div className="flex w-full justify-center">
                        <div className="w-1/2 text-center">
                            <h2 className="text-md mb-3">{t('crafts.text.input')}</h2>
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                {new Array((dataTypes[modalType]?.[0] || 0) * (dataTypes[modalType]?.[1] || 0)).fill(0).map((_, i) => <input id={`input-${i}`} className={`input ${((dataTypes[modalType]?.[0] || 0) * (dataTypes[modalType]?.[1] || 0)) == 1 ? "w-3/4" : "w-1/4"} max-w-full`} placeholder="modid:item" key={i} />)}
                            </div>
                        </div>
                        {!outputBlacklist.includes(modalType) && <div className="w-1/2 text-center">
                            <h2 className="text-md mb-3">{additionalTitles.includes(modalType) ? t(`crafts.additional_titles.${modalType}`) : t('crafts.text.output')}</h2>
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <input id="output" className="input w-3/4 max-w-full" placeholder="" />
                            </div>
                            {modalType === "workbench" && (
                                <div className="mt-3 flex justify-center">
                                    <label className="flex items-center">
                                        <input type="checkbox" checked={isShaped} onChange={(e) => setIsShaped(e.currentTarget.checked)} className="checkbox mr-2" />
                                        {t('crafts.text.shaped')}
                                    </label>
                                </div>
                            )}
                        </div>}
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-5">
                        {additionalInputs[modalType]?.map(el => <div key={el}  className="form-group w-fit">
                            <label htmlFor={`input-${el}`} className="form-label">{t(`crafts.additional_inputs.${el}`)}</label>
                            <input id={`input-${el}`} className="input w-full max-w-full" />
                        </div>)}
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
                        {typedDelete[mods]?.map(field =>
                            <div className="form-group w-fit">
                                <label htmlFor={`delete-${field}`} className="form-label">{t(`crafts.delete.${field}`)}</label>
                                <input id={`delete-${field}`} className="input w-full" />
                            </div>)}
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