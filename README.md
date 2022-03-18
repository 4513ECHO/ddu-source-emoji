# ddu-source-emoji

emoji source for ddu.vim

This source collects GitHub style emojis.

## Requirements

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddu.vim](https://github.com/Shoguo/ddu.vim)
- [ddu-kind-word](https://github.com/Shougo/ddu-kind-word)

## Configuration

```vim
" Use emoji source.
call ddu#start({'sources': [{'name': 'emoji'}]})

" Insert emoji mapping.
inoremap <C-x><C-e> <Cmd>call ddu#start({'sources': [{'name': 'emoji'}]})<CR>
```

