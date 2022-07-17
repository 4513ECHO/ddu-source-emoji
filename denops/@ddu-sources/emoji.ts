import type { ActionData } from "https://pax.deno.dev/Shougo/ddu-kind-word/denops/@ddu-kinds/word.ts";
import type { GatherArguments } from "https://deno.land/x/ddu_vim@v1.8.7/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v1.8.7/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v1.8.7/types.ts";
import EMOJIS from "https://unpkg.com/unicode-emoji-json@0.3.1/data-by-emoji.json" assert {
  type: "json",
};

interface Params {
  convertEmoji: boolean;
}
interface EmojiData {
  slug: string;
}
interface Emoji {
  name: string;
  emoji: string;
}

function getEmojis(): Emoji[] {
  return Object.entries(EMOJIS as Record<string, EmojiData>).map((
    [key, value],
  ): Emoji => ({
    name: `:${value.slug}:`,
    emoji: key,
  }));
}

export class Source extends BaseSource<Params, ActionData> {
  kind = "word";

  gather(args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start(controller) {
        const emojis: Emoji[] = getEmojis();
        controller.enqueue(
          emojis.map((i) => {
            return {
              word: i.name,
              display: `${i.emoji}\t${i.name}`,
              action: {
                text: args.sourceParams.convertEmoji ? i.emoji : i.name,
              },
            };
          }),
        );
        controller.close();
      },
    });
  }

  params(): Params {
    return {
      convertEmoji: true,
    };
  }
}
