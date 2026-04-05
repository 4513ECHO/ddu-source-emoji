import type { ActionData } from "@shougo/ddu-kind-word";
import { BaseSource, type GatherArguments } from "@shougo/ddu-vim/source";
import type { Item } from "@shougo/ddu-vim/types";
import EMOJIS from "unicode-emoji-json/data-by-emoji.json" with {
  type: "json",
};

export type Params = {
  convertEmoji: boolean;
};

export class Source extends BaseSource<Params, ActionData> {
  override kind = "word";

  override gather(
    args: GatherArguments<Params>,
  ): ReadableStream<Item<ActionData>[]> {
    const items: Item<ActionData>[] = Object.entries(EMOJIS)
      .map(([emoji, { slug }]) => ({
        word: `:${slug}:`,
        display: `${emoji}\t:${slug}:`,
        action: {
          text: args.sourceParams.convertEmoji ? emoji : `:${slug}:`,
        },
      }));
    return ReadableStream.from([items]);
  }

  override params(): Params {
    return {
      convertEmoji: true,
    };
  }
}
