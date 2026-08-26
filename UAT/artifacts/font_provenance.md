# Font provenance — LAMSEP MVP

- **Claim level:** `UNVERIFIED` for a bundled Apache-2.0 Vietnamese font.
- **Current implementation:** CSS system font stack (`-apple-system`, `Segoe UI`, `Roboto`, `Arial`, sans-serif); no `public/fonts/*` asset is currently bundled.
- **What this proves:** The local browser UAT rendered Vietnamese glyphs and the exported PDF has two A4 pages.
- **What this does not prove:** Stable glyph availability on every target device or an embedded/searchable Vietnamese text layer in the raster PDF.
- **Required before public release:** Add a verified Apache-2.0 font asset, record source URL/license/hash here, and rerun PDF visual/page/glyph checks.
