"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type MapEmbedProps = {
  title: string;
  loadLabel: string;
  note: string;
  src: string;
  coordinatesLabel: string;
};

export function MapEmbed({ title, loadLabel, note, src, coordinatesLabel }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (loaded) iframeRef.current?.focus();
  }, [loaded]);

  return (
    <div className="relative min-h-[24rem] overflow-hidden bg-surface lg:min-h-[28rem]">
      <div className="industrial-grid absolute inset-0 opacity-45" aria-hidden="true" />
      {loaded ? (
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="grid place-items-center gap-4 text-center">
            <span className="grid size-12 place-items-center bg-accent text-light-text" aria-hidden="true">
              <MapPin className="size-5" />
            </span>
            <span className="text-xs font-bold tracking-[0.12em] text-text-secondary">{coordinatesLabel}</span>
            <button
              type="button"
              onClick={() => {
                trackEvent("map_load", { link_location: "contact_section" });
                setLoaded(true);
              }}
              className="min-h-12 bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {loadLabel}
            </button>
            <p className="max-w-[38ch] text-xs leading-5 text-text-secondary">{note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
