import React from "react";

type HighlightRule = {
  word: string;
  className: string;
};

export function highlightText(
  text: string,
  rules: HighlightRule[]
) {
  if (!text) return null;

  let result: (string | React.ReactElement)[] = [text];

  rules.forEach(({ word, className }) => {
    result = result.flatMap((chunk, i) => {
      if (typeof chunk !== "string") return chunk;

      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = chunk.split(new RegExp(`(${escapedWord})`, "gi"));

      return parts.map((part, index) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <span key={`${word}-${i}-${index}`} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      );
    });
  });

  return result;
}