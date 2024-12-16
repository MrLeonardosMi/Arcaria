"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";
import { ModType, Recipe, RecipeFactory } from "~/lib/classes/Recipe/index";
import { DeleteFields, RecipeTypes } from "~/config/config";
import { toast } from "nextjs-toast-notify";
import copy from "clipboard-copy";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import { useParams } from "next/navigation";
import CraftModal from "~/app/_components/CraftModal";
import DeleteModal from "~/app/_components/DeleteModal";
import Animation from "~/app/_components/Animation";

export default function VersionPage() {
    const mods = useParams().mods as string;
    const t = useTranslations();
    const modalRef = useRef<HTMLInputElement>(null);
    const deleteModalRef = useRef<HTMLInputElement>(null);
    const [modalType, setModalType] = useState('');
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
    const recipeConfig = modalType ? RecipeTypes[modalType] : undefined;

    const handleModal = (type: string) => {
        setModalType(type);
        setCurrentRecipe(RecipeFactory.create(type, mods.toLowerCase() as ModType));
        (modalRef.current as any).click();
    }

    const handleCopy = () => {
        if (!currentRecipe) return;

        Array.from({ length: currentRecipe.getSlotCount() }, (_, i) => {
            const value = (document.getElementById(`input-${i}`) as HTMLInputElement)?.value || null;
            currentRecipe?.setInput(i, value);
        });

        const recipeConfig = RecipeTypes[modalType];
        if (recipeConfig?.requiresOutput !== false) {
            const output = (document.getElementById("output") as HTMLInputElement)?.value || "";
            currentRecipe.setOutput(output);
        }

        if (recipeConfig?.additionalInputs) {
            recipeConfig.additionalInputs.forEach(inputName => {
                const value = (document.getElementById(`input-${inputName.name}`) as HTMLInputElement)?.value || "";
                currentRecipe?.setAdditionalInput(inputName.name, value);
            });
        }

        const script = currentRecipe.generateScript();
        if (script) {
            copy(script);
            toast.success(t('crafts.text.copied'), {
                position: "top-right",
                duration: 3000,
                transition: "fadeIn",
                sonido: true,
                progress: true
            });
        } else {
            toast.error(t('crafts.text.error'), {
                position: "top-right",
                duration: 3000,
                transition: "fadeIn",
                sonido: true,
                progress: true
            });
        }
    }

    const handleClear = () => {
        if (!currentRecipe) return;
        currentRecipe.clear();
        Array.from({ length: currentRecipe.getSlotCount() }, (_, i) =>
            (document.getElementById(`input-${i}`) as HTMLInputElement).value = '');
        (document.getElementById('output') as HTMLInputElement).value = '';
    }

    const handleDeleteModal = () => {
        (deleteModalRef.current as any).click();
    }

    const handleDelete = () => {
        const deleteRecipe = RecipeFactory.create('delete', mods.toLowerCase() as ModType);
        if (!deleteRecipe) return;

        DeleteFields[mods.toLowerCase() as ModType]?.forEach(field => {
            const value = (document.getElementById(`delete-${field}`) as HTMLInputElement).value;
            if (value) {
                deleteRecipe.setAdditionalInput(field, value);
            }
        });

        const script = deleteRecipe.generateScript();
        if (script) {
            copy(script);
            toast.success(t('crafts.text.deleted'), {
                position: "top-right",
                duration: 3000,
                transition: "fadeIn",
                sonido: true,
                progress: true
            });
        }
    }

    const handleDeleteClear = () => DeleteFields[mods.toLowerCase() as ModType]?.map(field =>
        (document.getElementById(`delete-${field}`) as HTMLInputElement).value = '');

    return (
        <Animation>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-6">
                            {t(`main.buttons.crafts`)} ({mods})
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 justify-center gap-4">
                        {Object.entries(RecipeTypes)
                            .filter(([_, value]) => value.supportedMods.includes(mods.toLowerCase() as ModType))
                            .map(([el]) => (
                                <button
                                    key={el}
                                    onClick={() => handleModal(el)}
                                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg text-lg font-medium"
                                >
                                    {t(`crafts.buttons.${el}`)}
                                </button>
                            ))}
                    </div>
                    <div className="flex justify-center mt-8 gap-3">
                        <button
                            className="w-1/4 px-6 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-all duration-200 hover:shadow-lg text-lg font-medium"
                            onClick={handleDeleteModal}
                        >
                            {t('crafts.buttons.delete')}
                        </button>
                        <Link
                            href="/"
                            className="w-1/4 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg text-lg font-medium text-center"
                        >
                            {t('crafts.buttons.leave')}
                        </Link>
                    </div>

                    <CraftModal
                        modalRef={modalRef}
                        modalType={modalType}
                        recipeConfig={recipeConfig}
                        onCopy={handleCopy}
                        onClear={handleClear}
                    />

                    <DeleteModal
                        modalRef={deleteModalRef}
                        mods={mods}
                        onDelete={handleDelete}
                        onClear={handleDeleteClear}
                    />
                </div>
            </div>
        </Animation>
    );
}