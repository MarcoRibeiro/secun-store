import { Heading } from "@modules/common/components/ui"
import { getStorefrontContent } from "@lib/content/storefront"
import React from "react"

const Help = () => {
  const content = getStorefrontContent()

  return (
    <section className="border-t border-slate-200 bg-slate-50 p-6 small:p-10">
      <Heading className="text-base-semi">Precisas de ajuda?</Heading>
      <div className="my-3 text-base-regular text-slate-600">
        <ul className="flex flex-col gap-y-2">
          <li>
            <a href={content.footer.phoneUrl} className="hover:text-sky-600">
              {content.footer.phone}
            </a>
          </li>
          <li>
            <a
              href={content.footer.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-600"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Help
