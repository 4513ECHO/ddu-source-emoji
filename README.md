# ddu-source-emoji

Emoji source for ddu.vim

This source collects GitHub style emojis.

Emojis data are fetched from
[muan/unicode-emoji-json](https://github.com/muan/unicode-emoji-json) which
supports unicode emoji version `14.0`.

Please read [help](doc/ddu-source-emoji.txt) for details.

## Requirements

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](https://github.com/Shougo/ddu.vim)
- [ddu-kind-word](https://github.com/Shougo/ddu-kind-word)

## Configuration

```vim
" Use emoji source.
call ddu#start({'sources': [{'name': 'emoji'}]})

" Insert emoji mapping.
inoremap <C-x><C-e> <Cmd>call ddu#start({'sources': [{'name': 'emoji'}]})<CR>
```
