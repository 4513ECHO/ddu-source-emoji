import type { ActionData } from "https://pax.deno.dev/Shougo/ddu-kind-word/denops/@ddu-kinds/word.ts";
import type {
  GatherArguments,
} from "https://deno.land/x/ddu_vim@v2.8.4/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v2.8.4/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v2.8.4/types.ts";
import EMOJIS from "https://unpkg.com/unicode-emoji-json@0.5.0/data-by-emoji.json" assert {
  type: "json",
};

type Params = {
  convertEmoji: boolean;
};

export class Source extends BaseSource<Params, ActionData> {
  override kind = "word";

  override gather(
    args: GatherArguments<Params>,
  ): ReadableStream<Item<ActionData>[]> {
    const items = Object.entries(
      EMOJIS as Record<string, { slug: string }>,
    ).map(([emoji, { slug }]) => ({
      word: `:${slug}:`,
      display: `${emoji}\t:${slug}:`,
      action: {
        text: args.sourceParams.convertEmoji ? emoji : `:${slug}:`,
      },
    }));
    return new ReadableStream({
      start(controller) {
        controller.enqueue(items);
        controller.close();
      },
    });
  }

  override params(): Params {
    return {
      convertEmoji: true,
    };
  }
}
