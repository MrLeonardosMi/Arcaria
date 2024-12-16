"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Animation from "./_components/Animation";

export default function Home() {
  const t = useTranslations();

  return (
    <Animation>
      <div className="min-h-screen bg-gradient-to-b flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              {t('main.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('main.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/crafts/kubejs"
              className="group relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('main.buttons.kubejs')}
              </h2>
              <div className="text-gray-400 group-hover:text-gray-300">
                {t('main.buttons.description.kubejs')}
              </div>
            </Link>

            <Link
              href="/crafts/crafttweaker"
              className="group relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('main.buttons.crafttweaker')}
              </h2>
              <div className="text-gray-400 group-hover:text-gray-300">
                {t('main.buttons.description.crafttweaker')}
              </div>
            </Link>

            <Link
              href="/crafts/minetweaker"
              className="group relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('main.buttons.minetweaker')}
              </h2>
              <div className="text-gray-400 group-hover:text-gray-300">
                {t('main.buttons.description.minetweaker')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Animation>
  );
}
