"use client";

import {
  FilterSelect,
  NearMeButton,
  SearchBox,
} from "@/components/donde-comprar/finder-parts";
import { PRESENTATION_LABELS, type Presentation } from "@/lib/jabato-api";

const PRESENTATIONS: Presentation[] = ["draft", "bottle", "can"];

interface FiltersBarProps {
  buscar: string;
  estilo: string;
  presentacion: string;
  barrio: string;
  onBuscarChange: (value: string) => void;
  onEstiloChange: (value: string) => void;
  onPresentacionChange: (value: string) => void;
  onBarrioChange: (value: string) => void;
  styles: string[];
  neighborhoods: string[];
  nearActive: boolean;
  nearLoading: boolean;
  onNearMe: () => void;
}

export function FiltersBar({
  buscar,
  estilo,
  presentacion,
  barrio,
  onBuscarChange,
  onEstiloChange,
  onPresentacionChange,
  onBarrioChange,
  styles,
  neighborhoods,
  nearActive,
  nearLoading,
  onNearMe,
}: FiltersBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-center">
      <SearchBox value={buscar} onChange={onBuscarChange} className="flex-1" />
      <div className="grid grid-cols-3 gap-2 lg:flex">
        <FilterSelect
          value={estilo}
          onChange={onEstiloChange}
          options={styles}
          placeholder="Estilo"
          className="lg:w-40"
        />
        <FilterSelect
          value={presentacion}
          onChange={onPresentacionChange}
          options={PRESENTATIONS}
          optionLabel={(v) => PRESENTATION_LABELS[v as Presentation]}
          placeholder="Presentación"
          className="lg:w-40"
        />
        <FilterSelect
          value={barrio}
          onChange={onBarrioChange}
          options={neighborhoods}
          placeholder="Barrio"
          className="lg:w-40"
        />
      </div>
      <NearMeButton
        active={nearActive}
        loading={nearLoading}
        onClick={onNearMe}
        className="shrink-0"
      />
    </div>
  );
}
