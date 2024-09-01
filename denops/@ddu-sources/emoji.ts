import type { ActionData } from "jsr:@shougo/ddu-kind-word@^0.4.1";
import {
  BaseSource,
  type GatherArguments,
} from "jsr:@shougo/ddu-vim@^6.0.0/source";
import type { Item } from "jsr:@shougo/ddu-vim@^6.0.0/types";
import EMOJIS from "https://unpkg.com/unicode-emoji-json@0.6.0/data-by-emoji.json" with {
  type: "json",
};

export type Params = {
  convertEmoji: boolean;
};

export class Source extends BaseSource<Params, ActionData> {
  kind = "word";

  gather(args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    const items = Object.entries(
      EMOJIS as Record<string, { slug: string }>,
    ).map(([emoji, { slug }]) => ({
      word: `:${slug}:`,
      display: `${emoji}\t:${slug}:`,
      action: {
        text: args.sourceParams.convertEmoji ? emoji : `:${slug}:`,
      },
    }));
    return ReadableStream.from([items]);
  }

  params(): Params {
    return {
      convertEmoji: true,
    };
  }
}
