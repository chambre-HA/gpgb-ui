'use client'
import { createContext, useContext } from 'react'
import type { ElementType } from 'react'

const LinkContext = createContext<ElementType>('a')

/** Tell the design-system components which link component to render, once, near the root:
 *  `<LinkProvider value={Link}>` with `import Link from 'next/link'`. Default is a plain `<a>` (full page loads). */
export const LinkProvider = LinkContext.Provider

/** The link component for the current app. Use for any internal navigation inside design-system components. */
export const useLink = () => useContext(LinkContext)
