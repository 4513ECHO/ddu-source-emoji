# ddu-source-emoji

Emoji source for ddu.vim

This source collects GitHub style emojis.

Emojis data are fetched from
[muan/unicode-emoji-json](https://github.com/muan/unicode-emoji-json) which
supports unicode emoji version `15.0`.

Please read [help](doc/ddu-source-emoji.txt) for details.

## Requirements

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](https://github.com/Shougo/ddu.vim)
- [ddu-kind-word](https://github.com/Shougo/ddu-kind-word)

## Examples

```vim
" Use emoji source.
call ddu#start({ 'sources': [{ 'name': 'emoji' }] })

" Define mapping for insert mode.
" NOTE: `:help ddu-source-emoji-faq` for details.
inoremap <C-x><C-e> <Cmd>call ddustart({
      \ 'sources': [
      \   { 'name': 'emoji', 'options': { 'defaultAction': 'feedkeys' } },
      \ ],
      \ 'uiParams': {
      \   'ff': { 'replaceCol': col('.') }
      \ },
      \ })<CR>
```
