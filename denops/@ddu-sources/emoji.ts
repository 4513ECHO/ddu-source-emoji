import type { ActionData } from "https://pax.deno.dev/Shougo/ddu-kind-word/denops/@ddu-kinds/word.ts";
import type { GatherArguments } from "https://deno.land/x/ddu_vim@v1.3.0/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v1.3.0/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v1.3.0/types.ts";
import {
  EMOJIS,
  EMOJIS_ALIAS,
} from "https://pax.deno.dev/99x/emojideno/src/constants.ts";

type Params = Record<never, never>;
type Emojis = Record<string, string>;
interface EmojiData {
  name: string;
  emoji: string;
}

function getEmojis(): EmojiData[] {
  const emojis = Object.entries(EMOJIS as Emojis).map(([key, value]) => ({
    name: key,
    emoji: value,
  }));
  emojis.push(
    ...Object.entries(EMOJIS_ALIAS as Emojis).map(([key, value]) => ({
      name: key,
      emoji: value,
    })),
  );
  return emojis;
}
export class Source extends BaseSource<Params, ActionData> {
  kind = "word";

  gather(_args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start(controller) {
        const emojis: EmojiData[] = getEmojis();
        controller.enqueue(
          emojis.map((i) => {
            return {
              word: i.name,
              display: `${i.name}\t${i.emoji}`,
              action: {
                text: i.emoji,
              },
            };
          }),
        );
        controller.close();
      },
    });
  }

  params(): Params {
    return {};
  }
}
