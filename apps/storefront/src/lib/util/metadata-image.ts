type EntityWithMetadata = {
  metadata?: Record<string, unknown> | null
}

const IMAGE_METADATA_KEYS = [
  "image_url",
  "image",
  "thumbnail_url",
  "thumbnail",
  "banner_image_url",
  "banner_image",
]

export function getMetadataImage(entity?: EntityWithMetadata | null) {
  if (!entity?.metadata) {
    return null
  }

  for (const key of IMAGE_METADATA_KEYS) {
    const value = entity.metadata[key]

    if (typeof value === "string" && value.trim()) {
      return value
    }

    if (
      value &&
      typeof value === "object" &&
      "url" in value &&
      typeof value.url === "string" &&
      value.url.trim()
    ) {
      return value.url
    }
  }

  return null
}
