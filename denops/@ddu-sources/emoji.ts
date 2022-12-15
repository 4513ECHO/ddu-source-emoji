import type { ActionData } from "https://pax.deno.dev/Shougo/ddu-kind-word/denops/@ddu-kinds/word.ts";
import type {
  GatherArguments,
  OnInitArguments,
} from "https://deno.land/x/ddu_vim@v2.0.0/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import EMOJIS from "https://unpkg.com/unicode-emoji-json@0.5.0/data-by-emoji.json" assert {
  type: "json",
};

type Params = {
  convertEmoji: boolean;
};

export class Source extends BaseSource<Params, ActionData> {
  override kind = "word";
  #items: Item<ActionData>[] = [];

  override onInit(args: OnInitArguments<Params>): Promise<void> {
    this.#items = Object.entries(
      EMOJIS as Record<string, { slug: string }>,
    ).map(([emoji, { slug }]) => ({
      word: `:${slug}:`,
      display: `${emoji}\t:${slug}:`,
      action: {
        text: args.sourceParams.convertEmoji ? emoji : `:${slug}:`,
      },
    }));
    return Promise.resolve();
  }

  override gather(
    _args: GatherArguments<Params>,
  ): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start: (controller) => {
        controller.enqueue(this.#items);
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
