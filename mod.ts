// Copyright 2023 Samuel Kopp. All rights reserved. MIT license.
import { parse } from 'https://deno.land/std@0.198.0/flags/mod.ts'
import { analyze } from './analyze.ts'
import { update } from './update.ts'

if (import.meta.main) {
  const args = parse(Deno.args)

  args._ = args._.filter((i) => typeof i === 'string')

  const files = args._.length > 0
    ? await analyze(...args._ as string[])
    : await analyze(Deno.cwd())

  await update({
    files,
    allowBreaking: args.breaking ?? args.b ?? false,
    allowUnstable: args.unstable ?? args.u ?? false,
    createChangelog: args.changelog ?? args.c ?? false,
    readonly: args['dry-run'] ?? args['readonly'] ?? false,
  })
}

export { analyze } from './analyze.ts'
export * from './types.ts'
export { update } from './update.ts'
