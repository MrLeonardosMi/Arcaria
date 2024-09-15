"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { types } from "./constants";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="container flex flex-col gap-10 px-4 py-16 items-center justify-center h-screen">
      <h1 className="font-bold text-6xl">Arcadia</h1>
      <div className="flex items-center">
        <div className="dropdown">
          <label className="btn btn-solid-primary btn-lg my-2 shadow-xl" tabIndex={0}>{t('main.buttons.crafts')}</label>
          <div className="dropdown-menu">
            {types.map(el => <Link href={`/crafts/${el.toLowerCase()}`} key={el} className="dropdown-item text-sm">{el}</Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}
